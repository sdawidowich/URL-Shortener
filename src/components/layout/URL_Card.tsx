"use client"

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from "../ui/card";
import { CopyButton } from "./CopyButton";
import { Badge } from "../ui/badge";
import { ExternalLink } from "./ExternalLink";

export function URL_Card({ shortUrlId, longUrl }: { shortUrlId: string | null; longUrl: string | null}) {
  const [origin, setOrigin] = useState("");

  const shortUrl = `${origin}/to/${shortUrlId}`;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      {shortUrlId && longUrl && (
        <div className="w-full pt-8">
          <Card>
            <CardHeader>
              <CardTitle>Shortened URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row flex-wrap">
                <div className="flex-1 basis-2/3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mr-2 mb-1">
                  <ExternalLink href={shortUrl}>{shortUrl}</ExternalLink>
                </div>
                <CopyButton label="Copy URL" copyText={shortUrl} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap">
              <Badge variant="outline" className="mr-2">
                Long URL
              </Badge>
              <CardDescription>
                <ExternalLink href={longUrl}>{longUrl}</ExternalLink>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}