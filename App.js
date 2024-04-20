import Routes from "./src/routes/routes";
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext.js';
import { FavProvider } from './context/FavContext.js';
import { ThemeContext, ThemeProvider } from './ThemeContext'; // Importe o ThemeProvider ajustado


export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </FavProvider>
      </CartProvider>
    </ThemeProvider>
  );
}