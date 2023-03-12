import { InferGetStaticPropsType } from "next";
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

const ProductsPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="products">
      {products.map((product) => (
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

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const products: StoreApiResponse[] = await res.json();

  return {
    props: {
      products,
    },
  };
};
