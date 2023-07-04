import { NextPage } from "next";
import { useAuth, useUser } from "../lib/auth";

import Layout from "../components/common/Layout";
import AllDialogue from "@/components/dialogue/AllDialogue";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';

type Props = {
  children: JSX.Element;
};

//useAuth() は <RecoilRoot> の子孫コンポーネントでしか使用できないので
//<Auth> コンポーネントを作成し, その中で使用しています
const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? (
    <div className="my-24 mx-auto text-center" style={{  height: '500px' }}>
      loading...
    </div>
    ) : children;
};

const dialogueIndex: NextPage = () => {
  const user = useUser();
  return (
    <Auth>
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
    </Auth>
  );
};
export default dialogueIndex;
