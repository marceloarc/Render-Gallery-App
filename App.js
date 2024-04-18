import Routes from "./src/routes/routes";
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext.js';
import { FavProvider } from './context/FavContext.js';
export default function App() {
  return (
    <NavigationContainer>
            <CartProvider>
        <FavProvider>
    <Routes />
    </FavProvider>
    </CartProvider>
    </NavigationContainer>
  );
}

