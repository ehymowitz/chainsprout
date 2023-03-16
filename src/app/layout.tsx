import "../globals.css";

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
      <body className="text-center py-10 font-mono text-sm bg-gray-100">
        {children}
      </body>
    </html>
  );
}
