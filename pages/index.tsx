import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-2xl text-green-500">Hi</h1>
      <p className="text-white">welcome {user?.name}</p>
      <button
        onClick={() => signOut()}
        className="bg-white w-full transition hover:opacity-20"
      >
        logout
      </button>
    </>
  );
}
