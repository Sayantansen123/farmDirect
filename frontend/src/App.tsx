import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import FarmerDashboard from "./components/FarmerDashboard";
import UserDashboard from "./components/UserDashboard";
import ProfilePage from "./components/ProfilePage";
import CheckoutPage from "./components/CheckoutPage";
import { User, CartItem, Product } from "./types";
import { Route, Routes } from "react-router-dom";
import { Leaf } from "lucide-react";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log(currentPage);
    setInterval(() => {
      setLoading(false);
    }, 4000);
  });

  useEffect(() => {
    // Load sample products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Organic Tomatoes",
        price: 3.99,
        category: "Vegetables",
        description: "Fresh organic tomatoes grown without pesticides",
        farmerId: "farmer1",
        farmerName: "Green Valley Farm",
        image:
          "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        id: "2",
        name: "Fresh Apples",
        price: 2.49,
        category: "Fruits",
        description: "Crispy red apples straight from the orchard",
        farmerId: "farmer2",
        farmerName: "Sunny Orchards",
        image:
          "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        id: "3",
        name: "Organic Carrots",
        price: 1.99,
        category: "Vegetables",
        description: "Sweet organic carrots perfect for cooking",
        farmerId: "farmer1",
        farmerName: "Green Valley Farm",
        image:
          "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ];
    setProducts(sampleProducts);
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-green-200 flex justify-center items-center relative">
          {/* Spinning green circle */}
          <div className="absolute w-28 h-28 rounded-full border-4 border-green-500 animate-spin-slow"></div>

          {/* Leaf with spring rotation */}
          <Leaf className=" w-14 h-14  text-green-800 animate-spring-spin" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={<LandingPage onNavigate={setCurrentPage} />}
            />
            <Route
              path="/login"
              element={
                <LoginPage onNavigate={setCurrentPage} onLogin={setUser} />
              }
            />
            <Route
              path="/farmer-dashboard"
              element={
                <FarmerDashboard
                  user={user}
                  products={products}
                  onNavigate={setCurrentPage}
                  onAddProduct={addProduct}
                />
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <UserDashboard
                  user={user}
                  products={products}
                  cart={cart}
                  onNavigate={setCurrentPage}
                  onAddToCart={addToCart}
                  onUpdateCart={updateCartQuantity}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  user={user}
                  onNavigate={setCurrentPage}
                  onUpdateUser={setUser}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  user={user}
                  cart={cart}
                  onNavigate={setCurrentPage}
                  onClearCart={() => setCart([])}
                />
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
