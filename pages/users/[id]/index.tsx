import Layout from "@/pages/components/common/Layout";
import {  useUser } from "../../../lib/auth";
import MyProfile from "@/pages/components/MyProfile";

export default function UserPage() {
  const user = useUser();
  return (
    <Layout title="マイページ">
      <div className="container mx-auto flex flex-col items-center sm:max-w-7xl">
        <div className="mt-24">
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
  )
}

