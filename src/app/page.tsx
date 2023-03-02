"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleGoToPage = (e: FormEvent<HTMLFormElement>) => {
    router.push(url);
    e.preventDefault();
  };

  return (
    <div>
      <main>
        <div className="py-10 italic">
          <p>--------------------------------------------------</p>
          <h1>----Wecome To Chainsprout-------------------------</h1>
          <p>--------------------------------------------------</p>
          <p>--------------------------------------------------</p>
          <p>----------------Enter a username to see a page----</p>
          <p>--------------------------------------------------</p>
        </div>
        <form onSubmit={(e) => handleGoToPage(e)}>
          <input
            className="border-2"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <input type="submit" value="Go To Page" />
        </form>
      </main>
    </div>
  );
}
