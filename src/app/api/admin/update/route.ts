import { NextResponse } from "next/server";
import { updateWebsiteContentServer, getWebsiteContentServer } from "@/lib/server-content";

const ADMIN_PASSWORD = "admin"; // Weak password for demo purposes

export async function POST(req: Request) {
    try {
        const { password, content } = await req.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        await updateWebsiteContentServer(content);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Admin Update Error:", error);
        return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
    }
}
