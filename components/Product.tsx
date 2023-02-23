interface ProductProps {
  data: {
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
  };
}

export const Product = ({ data }: ProductProps) => {
  return (
    <li>
      <article>
        <h2>{data.title}</h2>
        <img src={data.images[0]} alt="" loading="lazy" />
        <p>
          Price: <strong>{data.price}</strong>
        </p>
        <p>{data.description}</p>
      </article>
    </li>
  );
};
