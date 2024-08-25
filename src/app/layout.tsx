import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google"

import { cn } from "~/lib/utils"
import Image from "next/image";
import Link from "next/link";
 
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
            <body>
                <header className="flex flex-row flex-wrap items-center justify-between p-4 mb-8 border-b border-input bg-background">
                    <div>
                        <Link className="flex flex-row items-center" href="/">
                            <Image src="/favicon-128.png" alt="Link Icon" width={32} height={32} />
                            <h1 className="pl-4 font-semibold text-xl w-full">URL Shortener</h1>
                        </Link>
                    </div>
                    <nav className="flex-1 flex flex-row items-center justify-end">
                        <Link className="align-middle text-nowrap p-2 bg-background hover:brightness-95 rounded-sm" href="/">Home</Link>
                        <Link className="align-middle text-nowrap p-2" href="/myurls">My URLs</Link>
                    </nav>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
