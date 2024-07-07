import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google"

import { cn } from "~/lib/utils"
 
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
            <body>{children}</body>
        </html>
    );
}
