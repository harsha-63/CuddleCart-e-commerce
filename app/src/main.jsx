
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopProvider from './Context/ShopContext.jsx'
import UserProvider from './Context/UserContext.jsx'
import CartProvider from './Context/CartContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'


createRoot(document.getElementById('root')).render(
<ShopProvider>
  <UserProvider>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </UserProvider>
</ShopProvider>

  
)
