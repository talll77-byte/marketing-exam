import './globals.css'

export const metadata = {
  title: 'Marketing Navigator',
  description: 'The Architect AI System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
