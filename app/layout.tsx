import './globals.css'
import { Figtree} from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/provider/SupabaseProvider'
import UserProvider from '@/provider/UserProvider'
import ModalProvider from '@/provider/ModalProvider'
import TosterProvider from '@/provider/TosterProvider'
import getSongsByUserId from '@/actions/getSongByUserId'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Music Application',
  description: 'The Best Music App Ever. Listen and Enjoy',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <TosterProvider />
        <SupabaseProvider>
            <UserProvider>
            <ModalProvider />
                <Sidebar songs={userSongs}>
                  {children}
                </Sidebar>
                <Player />
            </UserProvider>
        </SupabaseProvider>
            
      </body>
    </html>
  )
}
