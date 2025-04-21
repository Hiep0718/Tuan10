import { useSelector } from "react-redux"
import { TodoList } from "./components/TodoList"
import { ThemeToggle } from "./components/ThemeToggle"
import { selectTheme } from "./features/theme/themeSlice"
import "./App.css"
import { Counter } from "./components/counter"

function App() {
  const theme = useSelector(selectTheme)

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      <Counter/>
      <TodoList />
    </div>
  )
}

export default App
