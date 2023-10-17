import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { pinecone } from "@/lib/pinecode";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

const f = createUploadthing();


export const ourFileRouter = {

    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

        .middleware(async ({ req }) => {

            const { getUser } = getKindeServerSession();
            const user = getUser();

            if (!user || !user.id) throw new Error("Unauthenticated User");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const createdFile = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    // url: `https://uploadthing.prod.s3.us-west-2.amazonaws.com/${file.key}`,
                    url: `https://utfs.io/f/${file.key}`,
                    uploadStatus: 'PROCESSING',
                }
            })

            try {

                const response = await fetch(`https://utfs.io/f/${file.key}`)
                const blob = await response.blob()

                const loader = new PDFLoader(blob)

                const pageLevelDocs = await loader.load();

                const pageAmt = pageLevelDocs.length

                // vetorize and index entire documents
                const pineconeIndex = pinecone.Index("shanelai");

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY
                })

                await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
                    pineconeIndex,
                    // namespace: createdFile.id,
                })

                await db.file.update({
                    data: {
                        uploadStatus: 'SUCCESS',
                    },
                    where: {
                        id: createdFile.id,
                    }
                })

            } catch (error: any) {
                await db.file.update({
                    data: {
                        uploadStatus: 'FAILED',
                    },
                    where: {
                        id: createdFile.id,
                    }
                })

                console.log(error);
            }

        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;