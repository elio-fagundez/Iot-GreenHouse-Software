import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();


import { cookies } from 'next/headers';

const handleAuth = () => {
    // Buscar token en cookie o header
    let token = '';
    try {
        // Si usas cookies de Next.js
        const cookieStore = cookies();
        token = cookieStore.get('token')?.value || '';
        // Si usas header Authorization (opcional, para SSR/API)
        // token = req.headers.authorization?.replace('Bearer ', '') || token;
        if (!token) throw new Error('Unauthorized');
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (!payload.userId) throw new Error('Unauthorized');
        return { userId: payload.userId };
    } catch {
        throw new Error('Unauthorized');
    }
}

export const ourFileRouter = {
    profileImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;