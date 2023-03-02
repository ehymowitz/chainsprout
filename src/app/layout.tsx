import "./globals.css";

export const metadata = {
  title: "Chainsprout",
  description: "A (very) simplified version of linktree",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-center p-10 font-mono text-sm tracking-widest">
        {children}
      </body>
    </html>
  );
}
