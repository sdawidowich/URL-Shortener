import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google"

import Image from "next/image";
import Link from "next/link";
import { NavLink } from "~/components/layout/NavLink";
 
const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "URL Shortener",
    description: "Shorten urls with this one simple trick!",
    icons: [{ rel: "icon", url: "/favicon-128.png" }],
};

export default function RootLayout({children, }: { children: React.ReactNode; }) {
    return (
        <html lang="en" className={`${fontSans.variable}`}>
            <body className="flex flex-col h-screen">
                <header className="flex-0 flex flex-row flex-wrap items-center justify-between p-4 mb-8 border-b border-input bg-background">
                    <div className="flex flex-row items-center">
                        <Link className="flex flex-row items-center" href="/">
                            <Image src="/favicon-128.png" alt="Link Icon" width={32} height={32} />
                            <h1 className="pl-2 font-semibold text-xl w-full align-middle">URL Shortener</h1>
                        </Link>
                    </div>
                    <nav className="flex-1 flex flex-row items-center justify-end">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/myurls">My URLs</NavLink>
                    </nav>
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
