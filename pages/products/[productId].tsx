import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ProductDetails } from "../../components/Product";
import { serialize } from "next-mdx-remote/serialize";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <p>Something went wrong!</p>;
  }

  return (
    <ProductDetails
      data={{
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnailUrl: data.image,
        thumbnailAlt: data.title,
        rating: data.rating.rate,
        longDescription: data.longDescription,
      }}
    />
  );
};

export default ProductIdPage;

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
  longDescription: string;
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: "true",
    };
  }
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params?.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.longDescription),
      },
    },
  };
};
