import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import React, { ReactNode, createContext, useRef, useState } from "react";
import { trpc } from "../_trpc/client";
import { INFINITR_QUERY_LIMIT } from "@/config/infinite-query";

type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => { },
    message: '',
    handleInputChange: () => { },
    isLoading: false,
})

interface ChatContextProviderProps {
    fileId: string,
    children: ReactNode
}

export const ChatContextProvider = ({ fileId, children }: ChatContextProviderProps) => {
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const utils = trpc.useContext();

    const backupMessage = useRef('')

    const { toast } = useToast();

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ message }: { message: string }) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify({
                    fileId,
                    message,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            return response.body
        },
        onMutate: async ({ message }) => {

            // for optimistic opdates messages
            backupMessage.current = message
            setMessage('')

            // step 1
            await utils.getfileMesages.cancel()

            // step 2
            const previousMessages = await utils.getfileMesages.getInfiniteData()

            // step 3
            utils.getfileMesages.setInfiniteData(
                { fileId, limit: INFINITR_QUERY_LIMIT },
                (old) => {
                    if (!old) {
                        return {
                            pages: [],
                            pageParams: []
                        }
                    }

                    let newPages = [...old.pages]

                    let latestPage = newPages[0]!

                    latestPage.messages = [
                        {
                            createdAt: new Date().toISOString(),
                            id: crypto.randomUUID(),
                            text: message,
                            isUserMessage: true
                        },
                        ...latestPage.messages
                    ]

                    newPages[0] = latestPage

                    return {
                        ...old,
                        pages: newPages
                    }
                }
            )

            setIsLoading(true)

            return {
                previousMessages: previousMessages?.pages.flatMap((page) => page.messages) ?? [],
            }
        },
        onSuccess: async (stream) => {
            setIsLoading(false)
            if (!stream) {
                return toast({
                    title: 'There was an error to sending this message',
                    description: 'Please refresh this page nad try again.',
                    variant: 'destructive'
                })
            }
            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false

            // accumulated response
            let accResponse = ''
            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)

                accResponse += chunkValue

                // append chunk to the acutal message
                utils.getfileMesages.setInfiniteData(
                    { fileId, limit: INFINITR_QUERY_LIMIT },
                    (old) => {
                        if (!old) return {
                            pages: [], pageParams: []
                        }

                        let isAiResponseCreated = old.pages.some(
                            (page) => page.messages.some((message) => message.id === 'ai-response')
                        )

                        let updatedPages = old.pages.map((page) => {
                            if (page === old.pages[0]) {
                                let updatedMessages

                                if (!isAiResponseCreated) {
                                    updatedMessages = [
                                        {
                                            createdAt: new Date().toISOString(),
                                            id: 'ai-response',
                                            text: accResponse,
                                            isUserMessage: false
                                        },
                                        ...page.messages
                                    ]
                                } else {
                                    updatedMessages = page.messages.map((message) => {
                                        if (message.id === 'ai-response') {
                                            return {
                                                ...message,
                                                text: accResponse,
                                            }
                                        }

                                        return message
                                    })
                                }

                                return {
                                    ...page,
                                    messages: updatedMessages
                                }
                            }

                            return page
                        })

                        return {
                            ...old,
                            pages: updatedPages
                        }
                    }
                )
            }
        },
        onError: (_, __, context) => {
            setMessage(backupMessage.current)
            utils.getfileMesages.setData(
                { fileId },
                { messages: context?.previousMessages ?? [] },
            )
        },
        onSettled: async () => {
            setIsLoading(false)

            await utils.getfileMesages.invalidate({ fileId })
        },
    })

    const addMessage = () => {
        sendMessage({ message })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    return (
        <ChatContext.Provider value={{
            addMessage,
            message,
            handleInputChange,
            isLoading
        }}>
            {children}
        </ChatContext.Provider>
    )
}