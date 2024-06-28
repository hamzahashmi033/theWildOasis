import '@/app/_styles/globals.css'
import { Josefin_Sans } from "next/font/google"
import Header from "./_components/Header";
import { ReservationProvider } from './_context/ReservationContext';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: "swap"
})
export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis"
  }
}
export default function RootLayout({ children }) {
  return <html lang="en">
    <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
      <Header />
      <div className='flex-1 px-8 py-12 grid'>
        <main className='max-w-7xl mx-auto w-full'>
          <ReservationProvider>
            {children}
          </ReservationProvider>
        </main>
      </div>
      {/* <footer className="text-primary-100">Copyright by The Wild Oasis</footer> */}
    </body>
  </html>
}