import NavigationBar from '../components/navigationBar'
import WhiteboardList from '../components/whiteboardList'
import { NextAuthProvider } from '../providers/nextAuthProvider';

export default async function Home() {
  return (
    <NextAuthProvider>
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar lng={'en'}></NavigationBar>
      <WhiteboardList></WhiteboardList>
    </main>
    </NextAuthProvider>
  )
}
