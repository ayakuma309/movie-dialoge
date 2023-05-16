import { NextPage } from "next";
import { useUser, login, logout } from "../lib/auth";
import Link from "next/link";

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
            <p>{user.displayName}</p>
            {user.uid}
          </>
        ) : (
          <>
            <h2>ログインしていない</h2>
            <Link href="/loginForm">ログイン</Link>
          </>
        )}
      </div>
    </main>
  );
}
export default Home;
