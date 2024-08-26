import { ChildElement } from "~/types";

export function ExternalLink({href, children}: {href: string, children?: ChildElement}) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {children}
        </a>
    );
}