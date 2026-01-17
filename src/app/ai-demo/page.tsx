"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";

export default function AIDemoPage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            if (data.result) {
                setResult(data.result);
            } else {
                alert("Failed to generate image.");
            }
        } catch (err) {
            console.error(err);
            alert("Error generating image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-6">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-4">
                        AI <span className="text-primary">Studio</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Generate professional marketing assets in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <Card className="p-6 glass-card border-none">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="prompt">Describe your vision</Label>
                                <div className="relative">
                                    <Input
                                        id="prompt"
                                        placeholder="E.g., A futuristic neon sneaker on a podium..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="pr-10 h-12 bg-background/50 border-input focus:ring-primary"
                                    />
                                    <Sparkles className="absolute right-3 top-3 text-primary w-5 h-5" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Be descriptive for best results.
                                </p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleGenerate}
                                    disabled={loading || !prompt}
                                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Generate Asset"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Result Preview */}
                    <Card className="p-6 glass-card border-none min-h-[400px] flex items-center justify-center relative overflow-hidden">
                        {result ? (
                            <div className="relative w-full h-full min-h-[350px] rounded-lg overflow-hidden animate-in fade-in duration-500">
                                <Image
                                    src={result}
                                    alt="Generated Result"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                {loading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="animate-pulse">Creating masterpiece...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <Sparkles className="w-12 h-12 mb-2" />
                                        <p>Result will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
