"use client";
import { handleUrlCharacters } from "@/utils/utilFunctions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleGoToPage = (e: FormEvent<HTMLFormElement>) => {
    router.push(handleUrlCharacters(url));
    e.preventDefault();
  };

  return (
    <main>
      <div className="mb-10 italic w-128 m-auto">
        <p>--------------------------------------------------</p>
        <h1>--- wecome to chainsprout ------------------------</h1>
        <p>--------------------------------------------------</p>
        <p>--------------------------------------------------</p>
        <p>--------------- enter a username to see a page ---</p>
        <p>--------------------------------------------------</p>
      </div>
      <form onSubmit={(e) => handleGoToPage(e)} className="m-auto w-96">
        <input
          className="border-2"
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <input
          type="submit"
          value="go to page"
          className="ml-3 px-3 border hover:italic hover:cursor-pointer"
        />
      </form>
    </main>
  );
}
