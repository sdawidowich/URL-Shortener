"use client"

import { useContext } from "react";
import { AuthContext } from "~/components/auth/AuthProvider";
import { Shorten_Form } from "~/components/layout/Shorten_Form";

export default function HomePage() {
    const user = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <Shorten_Form user={user} />
            <div className="flex-1 w-full"></div>
        </div>
    );
}