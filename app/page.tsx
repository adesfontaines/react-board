import Image from 'next/image'
import Toolbar from './components/toolbar'
import NavigationBar from './components/navigationBar'
import DrawingZone from './components/drawingZone'
import WhiteboardList from './components/whiteboardList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar></NavigationBar>
      <WhiteboardList></WhiteboardList>
    </main>
  )
}
