import { Shorten_Form } from "~/components/layout/Shorten_Form";

export default async function HomePage() {

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <Shorten_Form />
            <div className="flex-1 w-full"></div>
        </div>
    );
}