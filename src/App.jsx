import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppStack from './routes/AppStack'
import AuthStack from './routes/AuthStack'
import useAuthStore from './store/authStore'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  return (
    <ThemeProvider>
      <Router>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </Router>
    </ThemeProvider>
  )
}

export default App
