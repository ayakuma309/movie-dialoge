import Layout from "@/components/common/Layout";
import { useUser } from "../../../lib/auth";
import MyProfile from "@/components/myPage/MyProfile";
import { RotatingLines } from "react-loader-spinner";

export default function UserPage() {
  const user = useUser();
  return (
    <Layout title="Profile">
      <div>
        <div>
          {user ? (
            <div>
              <MyProfile />
            </div>
          ) : (
            <div className="my-24 mx-auto" style={{ textAlign: 'center', height: '500px' }}>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
