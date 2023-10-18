import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`

  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "ShanelAI | Just Chat with your PDFs...",
  description = "ShanelAI is the open source software to make chatting with your PDFs easy.",
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,

}: {
  title?: string,
  description?: string,
  image?: string,
  icons?: string,
  noIndex?: boolean,
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@alamkaishg1511"
    },
    icons,
    metadataBase: new URL('https://shanelai-saas-platform.vercel.app/'),
    themeColor: '#fff',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}