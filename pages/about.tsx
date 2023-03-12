import Link from "next/link";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const AboutPage: NextPageWithLayout = () => (
  <div>
    <h1>ABOUT PAGE</h1>
    <Link href="/users">Go to users</Link>
  </div>
);

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <p>ELO</p>
      {page}
    </div>
  );
};
