import { NextPage } from "next";
import { useUser } from "../lib/auth";
import Layout from "../components/common/Layout";
import AllDialogue from "@/components/dialogue/AllDialogue";
import Auth from "@/components/login/Auth";
import Link from "next/link";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Home: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="セリフから選ぶ映画">
      <div className="movie-dialogue">
        <div>
          {user !== null ? (
            <>
              <div className="flex items-center justify-center">
                <Link href="/search">
                  <button className="btn btn-primary">
                    <AddCircleIcon />
                  </button>
                </Link>
              </div>
              <AllDialogue />
            </>
          ) : (
            <>
              <Auth />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
