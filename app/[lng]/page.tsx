import NavigationBar from '../components/navigationBar'
import WhiteboardList from '../components/whiteboardList'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar></NavigationBar>
      <WhiteboardList></WhiteboardList>
    </main>
  )
}
