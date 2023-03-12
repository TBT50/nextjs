import Link from "next/link";
import Image from "next/image";
import { ReactMarkdownContent } from "./ReactMarkdownContent";
import { MarkdownResult } from "../utils";

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult;
}

interface ProductProps {
  data: Product;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <li>
      <article>
        <h2>{data.title}</h2>
        <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
        <p>{data.description}</p>
        <div className="prose lg:prose-xl">
          <ReactMarkdownContent>{data.longDescription}</ReactMarkdownContent>
        </div>
      </article>
    </li>
  );
};

type ProductListItem = Pick<
  Product,
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
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            loading="lazy"
            width={300}
            height={400}
          />
          <h2>{data.title}</h2>
        </Link>
      </article>
    </li>
  );
};
