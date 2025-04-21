import { useSelector } from "react-redux"
import { Counter } from "./components/counter"
import { TodoList } from "./components/TodoList"
import { ThemeToggle } from "./components/ThemeToggle"
import { ProductList } from "./components/ProductList"
import { ShoppingCart } from "./components/ShoppingCart"
import { selectTheme } from "./features/theme/themeSlice"
import "./App.css"

function App() {
  const theme = useSelector(selectTheme)

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      <div className="app-sections">
        <div className="app-section">
          <h1 className="section-title">1. Counter App</h1>
          <Counter />
        </div>

        <div className="app-section">
          <h1 className="section-title">2. To-do List</h1>
          <TodoList />
        </div>

        <div className="app-section">
          <h1 className="section-title">4. Shopping Cart</h1>
          <div className="shop-container">
            <ProductList />
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
