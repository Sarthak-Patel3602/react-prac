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
      <div className="bg-gray-100">
        <div className="container mx-auto">
          <AppRoutes />
        </div>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
