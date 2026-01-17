"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
            <div className="bg-background/80 backdrop-blur-md rounded-full px-8 py-4 border border-border shadow-sm flex items-center gap-12">
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
                    AI<span className="text-primary">.AGENCY</span>
                </Link>

                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/services" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Services
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/work" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Work
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/ai-demo" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    AI Demo
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Login
                </Link>
            </div>
        </div>
    );
}
