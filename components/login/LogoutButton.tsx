import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    const auth = getAuth();
    const confirmed = window.confirm("ログアウトしてもよろしいですか？");
    if (confirmed) {
      toast.success("ログアウトしました");
      router.push("/");
      await signOut(auth);
    }
  };

  return <button onClick={logout} className="block rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-gray-300">ログアウト</button>;
};

export default LogoutButton;
