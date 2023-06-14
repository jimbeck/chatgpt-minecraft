import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-600 flex flex-col justify-center items-center py-16">{children}</body>
    </html>
  )
}
