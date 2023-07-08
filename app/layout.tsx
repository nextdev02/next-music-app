import './globals.css'
import { Figtree} from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/provider/SupabaseProvider'
import UserProvider from '@/provider/UserProvider'
import ModalProvider from '@/provider/ModalProvider'
import TosterProvider from '@/provider/TosterProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Music Application',
  description: 'The Best Music App Ever. Listen and Enjoy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TosterProvider />
        <SupabaseProvider>
            <UserProvider>
            <ModalProvider />
                <Sidebar>
                  {children}
                </Sidebar>
            </UserProvider>
        </SupabaseProvider>
            
      </body>
    </html>
  )
}
