import "./globals.css";

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
