import "~/styles/globals.css";

import { AuthService } from "~/components/auth/AuthService";
import { Header } from "~/components/layout/Header";


export default async function MainLayout({children, }: { children: React.ReactNode; }) {
    return (
        <AuthService>
            <>
                <Header />
                <main className="flex-1">
                    {children}
                </main>
            </>
        </AuthService>
    );
}
