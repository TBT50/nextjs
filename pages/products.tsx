import { InferGetStaticPropsType } from "next";
import { Product } from "../components/Product";

const ProductsPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="products">
      {products.map((product) => (
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

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
  const products: StoreApiResponse[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

// export interface StoreApiResponse {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

export interface StoreApiResponse {
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
