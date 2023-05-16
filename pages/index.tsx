import { NextPage } from "next";
import { useUser, login, logout } from "../lib/auth";

const Home: NextPage = () => {
  const user = useUser();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        {user !== null ? (
          <>
            <h2>ログインしている</h2>
            <button onClick={handleLogout}>ログアウト</button>
          </>
        ) : (
          <>
            <h2>ログインしていない</h2>
            <button onClick={handleLogin}>ログイン</button>
          </>
        )}
      </div>
    </main>
  );
}
export default Home;
