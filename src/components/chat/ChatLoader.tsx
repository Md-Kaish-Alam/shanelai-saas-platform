import { Loader2 } from "lucide-react"

interface ChatLoaderProps {
    heading: string,
    message: string
}

const ChatLoader = ({ heading, message }: ChatLoaderProps) => {
    return (
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <h3 className="font-semibold text-xl ">{heading}</h3>
                <p className="text-zinc-500 text-sm">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default ChatLoader