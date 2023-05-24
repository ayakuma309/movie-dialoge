import Layout from "@/components/common/Layout";
import { useUser } from "../../../lib/auth";
import MyProfile from "@/components/MyProfile";

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
            <p>ロード中…</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
