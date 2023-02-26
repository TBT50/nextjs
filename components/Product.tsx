import Link from "next/link";

export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <li>
      <article>
        <h2>{data.title}</h2>
        <img src={data.thumbnailUrl} alt={data.thumbnailAlt} loading="lazy" />
        <p>{data.description}</p>
      </article>
    </li>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <li>
      <article>
        <Link href={`/products/${data.id}`}>
          <h2>{data.title}</h2>
          <img src={data.thumbnailUrl} alt={data.thumbnailAlt} loading="lazy" />
        </Link>
      </article>
    </li>
  );
};
