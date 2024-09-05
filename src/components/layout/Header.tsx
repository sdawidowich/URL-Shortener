import Image from "next/image"
import Link from "next/link"
import { NavLink } from "./NavLink"
import { Profile } from "./Profile"

export function Header() {
    return (
        <header className="flex-0 mb-8 flex flex-row flex-wrap items-center justify-between border-b border-input bg-background p-4 gap-2">
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
            <Profile />
        </header>
    )
}