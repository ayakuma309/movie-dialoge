import { NextPage } from "next";
import Layout from "../components/common/Layout";
import TopContents from "../components/topPage/TopContents";

const Home: NextPage = () => {
  return (
    <Layout title="セリフの映画館">
      <div className='container flex flex-col items-center sm:max-w-7xl'>
        <div>
          <TopContents />
        </div>
      </div>
    </Layout>
  );
}
export default Home;
