import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { MarkdownResult } from "../utils";

export const ReactMarkdownContent = ({
  children,
}: {
  children: MarkdownResult;
}) => {
  return (
    <MDXRemote
      {...children}
      components={{
        p: "div",
        a: ({ href, ...props }) => {
          if (typeof href === "undefined") {
            return <a {...props}></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    />
  );
};
