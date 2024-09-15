"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { type ChildElement } from "~/types";

export function NavLink({ href, className, children }: { href: string, className?: string, children?: ChildElement }) {
  const path = usePathname();

    return (
        <Link
            href={href}
            className={cn(className, "text-nowrap rounded-sm px-3 py-1 align-middle hover:bg-secondary/95 hover:text-foreground/80 font-semibold",
                path === href
                ? "text-foreground"
                : "text-foreground/60",
            )}>
            {children}
        </Link>
    );
}