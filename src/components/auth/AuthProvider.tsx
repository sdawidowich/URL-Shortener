"use client"

import { type User } from "lucia";
import { createContext, useEffect, useState } from "react";
import { type ChildElement } from "~/types";

export const AuthContext = createContext({id: "", github_id: 0, username: ""});
export const HostnameContext = createContext("");

export function AuthProvider({user, children}: {user: User, children: ChildElement}) {
    const [origin, setOrigin] = useState("");
    
    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);
    
    return(
        <HostnameContext.Provider value={origin}>
            <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
        </HostnameContext.Provider>
    )
}