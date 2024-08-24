"use client"

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { CopyButton } from "./CopyButton";
import { Badge } from "../ui/badge";

export function URL_Card({ shortUrlId, longUrl }: { shortUrlId: string | null; longUrl: string | null}) {
  const [hostname, setHostname] = useState("");

  const shortUrl = hostname + "to/" + shortUrlId;

  useEffect(() => {
    setHostname(window.location.href);
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
              <div className="flex space-x-2">
                <Input value={shortUrl} readOnly />
                <CopyButton label="Copy URL" copyText={shortUrl} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap">
                <Badge variant="outline" className="mr-2">Long URL</Badge>
                <CardDescription>
                    <a href={longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{longUrl}</a>
                </CardDescription>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}