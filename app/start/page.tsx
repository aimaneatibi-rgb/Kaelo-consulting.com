import type { Metadata } from "next";
import Nav from "../components/Nav";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  title: "Start de audit",
  description:
    "Zeven korte vragen. Je krijgt direct een eerste analyse van waar tijd verloren gaat — daarna komen wij langs.",
};

export default function StartPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[100svh] px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <StartForm />
      </main>
    </>
  );
}
