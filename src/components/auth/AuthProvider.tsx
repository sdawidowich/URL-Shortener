"use client"

import { type User } from "lucia";
import { createContext } from "react";
import { type ChildElement } from "~/types";

export const AuthContext = createContext({id: "", github_id: 0, username: ""});

export function AuthProvider({user, children}: {user: User, children: ChildElement}) {
    
    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}