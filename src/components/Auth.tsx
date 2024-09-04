import { redirect } from "next/navigation";
import { ValidateRequest } from "~/lib/auth/auth";
import { type ChildElement } from "~/types";

export async function AuthService({ children }: { children: ChildElement }) {
    const { user } = await ValidateRequest();

    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            {children}
        </>
    )
}