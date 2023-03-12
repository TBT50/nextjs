import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductListItem } from "../components/Product";

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fetchProducts = async () => {
  const response = await axios.get(
    "https://naszsklep-api.vercel.app/api/products"
  );
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
        <ProductListItem
          key={product.id}
          data={{
            id: product.id,
            title: product.title,
            thumbnailUrl: product.image,
            thumbnailAlt: product.title,
          }}
        />
      ))}
    </ul>
  );
};

export default ProductsCSRPage;
