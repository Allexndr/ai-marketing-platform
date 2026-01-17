import { NextResponse } from 'next/server';

const HF_API_KEY = "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";
// Using SDXL for high quality generation/editing
const MODEL_ID = "stabilityai/stable-diffusion-xl-base-1.0";
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

export async function POST(req: Request) {
    try {
        const { prompt, image } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Prepare inputs. If image is provided, we might need a different endpoint or model that supports img2img.
        // The standard Inference API for SDXL is text-to-image. 
        // For VTON, we ideally need a specialized space or model. 
        // For this demo, we will use Text-to-Image if no image, or simulate "style transfer" if we can.
        // However, simplest robust demo is T2I with prompt.
        // Let's stick to generating amazing marketing assets for now.

        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            throw new Error(`HF API Error: ${response.statusText}`);
        }

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:${blob.type};base64,${base64}`;

        return NextResponse.json({ result: dataUrl });
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate" }, { status: 500 });
    }
}
