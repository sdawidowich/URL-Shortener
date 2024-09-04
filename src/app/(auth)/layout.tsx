import "~/styles/globals.css";

export default async function AuthLayout({children, }: { children: React.ReactNode; }) {
    return (
        <main className="flex-1 flex justify-center items-center">
            {children}
        </main>
    );
}
