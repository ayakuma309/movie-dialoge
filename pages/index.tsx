import { NextPage } from "next";
import { useUser } from "../lib/auth";
import Layout from "../components/common/Layout";
import AllDialogue from "@/components/dialogue/AllDialogue";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="セリフから選ぶ映画">
      <div className="movie-dialogue">
        <div>
          {user !== null ? (
            <>
              <Link href="/search">検索</Link>
              <AllDialogue />
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
};
export default Home;
