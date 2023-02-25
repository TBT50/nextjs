import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../components/Product";

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

const fetchProducts = async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/products");
  const data: StoreApiResponse[] = await response.data;
  return data;
};

const ProductsCSRPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>LOADING...</p>;
  }

  if (!data || isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <ul className="products">
      {data.map((product) => (
        <Product
          key={product.id}
          data={{
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.images,
            category: product.category,
          }}
        />
      ))}
    </ul>
  );
};

export default ProductsCSRPage;
