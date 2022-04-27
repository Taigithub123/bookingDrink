import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";

import CartProvider from "./contexts/cart";
import AuthProvider from "./contexts/auth";
import axios from "axios";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [user, setUser] = useLocalStorage("user");
  axios.interceptors.request.use((request) => {
    request.headers.common.Authorization = `Bearer ${user?.token}`;
    return request;
  });

  const routing = useRoutes(Themeroutes);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="dark">{routing}</div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;