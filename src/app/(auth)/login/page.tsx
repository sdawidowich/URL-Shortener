"use client"
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Login() {
  return (
    <div className="px-3 w-full">
        <Card className="mx-auto min-w-64 w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome</CardTitle>
                <CardDescription>Log in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <form action={() => redirect("/login/github")}>
                        <Button type="submit" className="flex flex-row gap-2 w-full">
                            <Image src="/github-mark-white.svg" alt="GitHub logo" width={16} height={16} className="flex-grow-0" />
                            Sign in with GitHub
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}