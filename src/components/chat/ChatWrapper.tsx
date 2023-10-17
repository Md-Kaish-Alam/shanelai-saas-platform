"use client"

import Messages from "./Messages"
import ChatInput from "./ChatInput"
import { trpc } from "@/app/_trpc/client"
import { ChevronLeft, XCircle } from "lucide-react";
import ChatLoader from "./ChatLoader";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "@/app/contexts/ChatContext";

interface ChatWrapperProps {
    fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {


    const { data, isLoading } = trpc.getFileUploadStatus.useQuery({
        fileId,
    }, {
        refetchInterval: (data) => data?.status === 'SUCCESS' || data?.status === 'FAILED' ? false : 500
    })

    if (isLoading) return (
        <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <ChatLoader heading="Loading..." message='We are preparing your PDF.' />
            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === 'PROCESSING') return (
        <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <ChatLoader heading="Processing PDF..." message='This would not take long.' />
            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === 'FAILED') return (
        <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <div className="flex-1 flex justify-center items-center flex-col mb-28">
                <div className="flex flex-col items-center gap-2">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <h3 className="font-semibold text-xl ">Too many pages in PDF...</h3>
                    <p className="text-zinc-500 text-sm">
                        Your <Link href='/pricing' className="font-medium">Free</Link>{" "} Plan supports up to 5 pages per PDF.
                    </p>
                    <Link href='/dashboard' className={buttonVariants({ variant: "secondary", className: "mt-4" })}>
                        <ChevronLeft className="h-4 w-4 mr-1.5" />Back
                    </Link>
                </div>
            </div>
            <ChatInput isDisabled />
        </div>
    )

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 justify-between flex flex-col mb-20">
                    <Messages fileId={fileId} />
                </div>
                <ChatInput isDisabled={false} />
            </div>
        </ChatContextProvider>
    )
}

export default ChatWrapper