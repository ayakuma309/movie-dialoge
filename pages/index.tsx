import { NextPage } from "next";
import { useUser } from "../lib/auth";
import Layout from "../components/common/Layout";
import AllDialogue from "@/components/dialogue/AllDialogue";
import Link from "next/link";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Home: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="Dialogue Cinema">
      <div className="movie-dialogue">
        <div>
          <>
            <div className="flex items-center justify-center">
              {user !== null && (
                <Link href="/search">
                  <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2">
                    <AddCircleIcon />
                  </button>
                </Link>
              )}
            </div>
            <AllDialogue />
          </>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
