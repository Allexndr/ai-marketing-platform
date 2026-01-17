"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Lock, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WebsiteContent } from "@/lib/content";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [content, setContent] = useState<WebsiteContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/content");
            if (res.ok) {
                const data = await res.json();
                setContent(data);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to load content.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin") {
            setIsAuthenticated(true);
            fetchContent();
        } else {
            alert("Invalid password");
        }
    };

    const handleUpdate = async () => {
        if (!content) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: "admin", content }),
            });
            if (res.ok) {
                alert("Website updated successfully!");
            } else {
                alert("Failed to update.");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating.");
        } finally {
            setSaving(false);
        }
    };

    const updateHero = (field: keyof WebsiteContent['hero'], value: string) => {
        if (!content) return;
        setContent({ ...content, hero: { ...content.hero, [field]: value } });
    };

    const updatePortfolio = (index: number, field: keyof WebsiteContent['portfolio'][0], value: string) => {
        if (!content) return;
        const newPortfolio = [...content.portfolio];
        newPortfolio[index] = { ...newPortfolio[index], [field]: value };
        setContent({ ...content, portfolio: newPortfolio });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] -z-10" />
                <Link href="/" className="absolute top-8 left-8 text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Site
                </Link>

                <Card className="w-full max-w-md p-8 glass-card border-none shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold font-outfit">Admin Access</h1>
                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-background/50 h-12"
                                    placeholder="Enter access code"
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg">Login</Button>
                        </form>
                    </div>
                </Card>
            </div>
        );
    }

    if (loading || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8 pb-32">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-card/80 backdrop-blur-md p-6 rounded-2xl border border-border sticky top-4 z-50 shadow-xl">
                    <h1 className="text-3xl font-bold font-outfit flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        Dashboard
                    </h1>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => window.open('/', '_blank')}>View Site</Button>
                        <Button onClick={handleUpdate} disabled={saving} className="min-w-[120px]">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Hero Edit */}
                <div className="grid gap-8">
                    <Card className="p-6 space-y-4 glass-card border-none">
                        <h2 className="text-xl font-bold border-b border-border/50 pb-2">Hero Section</h2>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={content.hero.title} onChange={(e) => updateHero('title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle</Label>
                                <Textarea value={content.hero.subtitle} onChange={(e) => updateHero('subtitle', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CTA Text</Label>
                                <Input value={content.hero.cta} onChange={(e) => updateHero('cta', e.target.value)} />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4 glass-card border-none">
                        <h2 className="text-xl font-bold border-b border-border/50 pb-2">About Section</h2>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={content.about?.title || ""}
                                    onChange={(e) => {
                                        if (!content.about) return;
                                        setContent({ ...content, about: { ...content.about, title: e.target.value } });
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={content.about?.description || ""}
                                    onChange={(e) => {
                                        if (!content.about) return;
                                        setContent({ ...content, about: { ...content.about, description: e.target.value } });
                                    }}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4 glass-card border-none">
                        <h2 className="text-xl font-bold border-b border-border/50 pb-2">Portfolio (URLs)</h2>
                        <div className="grid gap-6">
                            {content.portfolio.map((item, idx) => (
                                <div key={item.id} className="grid md:grid-cols-2 gap-4 p-4 border border-border/50 rounded-lg bg-background/30">
                                    <div className="space-y-2">
                                        <Label>Project Title #{idx + 1}</Label>
                                        <Input
                                            value={item.title}
                                            onChange={(e) => updatePortfolio(idx, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image URL</Label>
                                        <Input
                                            value={item.image}
                                            onChange={(e) => updatePortfolio(idx, 'image', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2 relative h-32 w-full rounded-md overflow-hidden border border-border/30 bg-muted/20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt="Preview" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
