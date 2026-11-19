import axios from "axios";
import { useEffect, useState } from "react";

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productURL = "https://dummyjson.com/products";
        const response = await axios.get(productURL);
        setProducts(response.data.products);
      } catch (error) {
        console.log("Product fetching error");
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-4 sm:px-6 mt-3 lg:px-8">
        <h1 className="font-bold text-2xl">All Products</h1>
      </div>
      <div className="container mb-9 mx-auto px-4 py-4 sm:px-6 lg:px-8 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain"
            />

            <h2 className="text-lg font-bold mt-3">{product.title}</h2>

            <p className="text-gray-600 mt-2">{product.description}</p>

            <p className="font-semibold mt-2">Price: ${product.price}</p>

            <p>Rating: ⭐ {product.rating}</p>

            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
