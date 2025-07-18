import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";
import "./HomePage.css";


export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [saerchParams] = useSearchParams();
  const search = saerchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      {/* <link rel="icon" type="image/svg+xml" href="public/images/home-favicon.png" /> */}

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
