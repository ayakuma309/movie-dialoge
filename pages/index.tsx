import { NextPage } from "next";
import { useUser } from "../lib/auth";
import Layout from "../components/common/Layout";

const Home: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="セリフから選ぶ映画">
      <div>
        <div>
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
};
export default Home;
