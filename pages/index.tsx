import { NextPage } from "next";
import { useUser, logout } from "../lib/auth";
import Link from "next/link";
import Layout from "./components/common/Layout";

const Home: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="セリフから選ぶ映画">
      <div className="container mx-auto flex flex-col items-center sm:max-w-7xl">
        <div className="mt-24">
          {user !== null ? (
            <>
              <h2>ログインしている</h2>
            </>
          ) : (
            <>
              <h2>ログインしていない</h2>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default Home;
