import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  console.log(router);
  const { uid } = router.query;
  return <div>User {uid}</div>;
};

export default User;
