import Layout from "@/components/common/Layout";
import { useUser } from "../../../lib/auth";
import MyProfile from "@/components/myPage/MyProfile";

export default function UserPage() {
  const user = useUser();
  return (
    <Layout title="マイページ">
      <div>
        <div>
          {user ? (
            <div>
              <MyProfile />
            </div>
          ) : (
            <p className="my-24" style={{ textAlign: 'center', height: '500px'}}>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
