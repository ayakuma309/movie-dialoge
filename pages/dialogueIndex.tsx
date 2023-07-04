import { NextPage } from "next";
import { useUser } from "../lib/auth";

import Layout from "../components/common/Layout";
import AllDialogue from "@/components/dialogue/AllDialogue";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';


const dialogueIndex: NextPage = () => {
  const user = useUser();
  return (
    <Layout title="セリフの映画館">
      <div className="movie-dialogue">
        <div>
          <>
            <div className="flex items-center justify-center">
              {user !== null && (
                <div className="float_btn">
                  <Link href="/search">
                    <AddIcon className="fa-plus"/>
                  </Link>
                </div>
              )}
            </div>
            <AllDialogue />
          </>
        </div>
      </div>
    </Layout>
  );
};
export default dialogueIndex;
