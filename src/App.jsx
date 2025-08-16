import { Outlet } from 'react-router-dom'
import styles from './App.module.css'
import NewChatPage from './components/NewChatPage/NewChatPage'
import Sidebar from './components/Sidebar/Sidebar'
import TextField from './components/TextField/TextField'

const App = () => {
  return (
    <main id={styles.app}>
     <Sidebar/>
     <Outlet/>
    </main>
  )
}

export default App
