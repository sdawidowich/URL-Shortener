import { Shorten_Form } from "~/components/layout/Shorten_Form";

export default async function HomePage() {

    return (
      <main className="flex flex-col items-center px-4">
        <Shorten_Form />
      </main>
    );
}