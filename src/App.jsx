import { useSelector } from "react-redux"
import { Counter } from "./components/counter"
import { TodoList } from "./components/TodoList"
import { ThemeToggle } from "./components/ThemeToggle"
import { ProductList } from "./components/ProductList"
import { ShoppingCart } from "./components/ShoppingCart"
import { Auth } from "./components/Auth"
import { UsersList } from "./components/UsersList"
import { Calculators } from "./components/Calculators"
import { EventManager } from "./components/EventManager"
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
          <h1 className="section-title">3. Toggle Theme</h1>
          <div className="theme-demo-container">
            <p>
              Chế độ hiện tại: <strong>{theme === "light" ? "Sáng" : "Tối"}</strong>
            </p>
            <p>Bạn có thể chuyển đổi chế độ bằng nút ở góc trên bên phải.</p>
          </div>
        </div>

        <div className="app-section">
          <h1 className="section-title">4. Shopping Cart</h1>
          <div className="shop-container">
            <ProductList />
            <ShoppingCart />
          </div>
        </div>

        <div className="app-section">
          <h1 className="section-title">5. Quản lý user đăng nhập</h1>
          <Auth />
        </div>

        <div className="app-section">
          <h1 className="section-title">6. Đồng bộ dữ liệu từ API</h1>
          <UsersList />
        </div>

        <div className="app-section">
          <h1 className="section-title">7. Các công cụ tính toán</h1>
          <Calculators />
        </div>

        <div className="app-section">
          <h1 className="section-title">8. Quản lý sự kiện</h1>
          <EventManager />
        </div>
      </div>
    </div>
  )
}

export default App
