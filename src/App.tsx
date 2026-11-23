import { useLocation } from "react-router";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";
  return (
    <>
      {!hideLayout && <Header />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
