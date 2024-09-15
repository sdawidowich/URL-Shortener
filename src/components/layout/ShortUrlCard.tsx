"use client"

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HostnameContext } from "../auth/AuthProvider";
import { type UrlView } from "~/server/db/schema";
import { ExternalLink } from "./ExternalLink";

export function ShortUrlCard({url}: {url: UrlView}) {
    const hostname = useContext(HostnameContext);

    const shortUrl = `${hostname}/to/${url.key}`;

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Shortened URL</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row flex-wrap">
                    <ExternalLink href={shortUrl}>{shortUrl}</ExternalLink>
                </div>
            </CardContent>
        </Card>
    );
}