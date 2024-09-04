import "~/styles/globals.css";

import Image from "next/image";
import Link from "next/link";
import { NavLink } from "~/components/layout/NavLink";
import { Logout } from "~/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { AuthService } from "~/components/Auth";


export default async function MainLayout({children, }: { children: React.ReactNode; }) {
    return (
        <AuthService>
            <>
                <header className="flex-0 mb-8 flex flex-row flex-wrap items-center justify-between border-b border-input bg-background p-4">
                    <div className="flex flex-row items-center">
                        <Link className="flex flex-row items-center" href="/">
                        <Image
                            src="/favicon-128.png"
                            alt="Link Icon"
                            width={32}
                            height={32}
                        />
                        <h1 className="w-full pl-2 align-middle text-xl font-semibold">
                            URL Shortener
                        </h1>
                        </Link>
                    </div>
                    <nav className="flex flex-1 flex-row items-center justify-end">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/myurls">My URLs</NavLink>
                    </nav>
                    <div>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                            >
                            <Image
                                src="/avatar_placeholder.jpg"
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0">
                                <form action={Logout} className="w-full">
                                    <button type="submit" className="p-2 w-full text-start">Logout</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </>
        </AuthService>
    );
}
