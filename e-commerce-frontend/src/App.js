import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
import ourproductsbanner from "./Components/Assets/ourproductsbanner.png"; // Import the new banner
import featuredbanner from "./Components/Assets/featuredbanner.png"; // Import the featured banner
import pcbanner from "./Components/Assets/pcbanner.png"; // Import the producers corner banner
import Checkout from "./Pages/Checkout"; // Ensure this is correctly imported

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/our-products" element={<ShopCategory banner={ourproductsbanner} category="our-products" />} />
          <Route path="/featured" element={<ShopCategory banner={featuredbanner} category="featured" />} />
          <Route path="/producers-corners" element={<ShopCategory banner={pcbanner} category="producers-corners" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/checkout" element={<Checkout />} /> {/* Ensure this route exists */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
