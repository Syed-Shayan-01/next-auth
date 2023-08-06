import { getSession } from "next-auth/react";

const profile = () => {
  return <div>profile</div>;
};

export default profile;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        parmanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
