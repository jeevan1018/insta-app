import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppStack from './routes/AppStack'
import AuthStack from './routes/AuthStack'
import useAuthStore from './store/authStore'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  return (
    <Router>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </Router>
  )
}

export default App
