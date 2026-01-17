import { NextResponse } from 'next/server';
import { getWebsiteContentServer } from "@/lib/server-content";

export async function GET() {
    const content = await getWebsiteContentServer();
    return NextResponse.json(content);
}
