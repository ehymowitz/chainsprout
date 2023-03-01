import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chainsprout",
  description: "A (very) simplified version of linktree",
};

export default function Home() {
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
      </main>
    </div>
  );
}
