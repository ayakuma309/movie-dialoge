import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

type UserState = User | null; // null の場合はログインしていない状態
const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

// ログイン
export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithRedirect(auth, provider);
};
// ログアウト
export const logout = (): Promise<void> => {
  const auth = getAuth();
  const confirmed = window.confirm("ログアウトしてもよろしいですか？");
  if (confirmed) {
    return signOut(auth);
  } else {
    return Promise.resolve(); // ログアウトをキャンセルした場合は Promise を解決する
  }
};
// ユーザー情報取得
export const useAuth = (): boolean => {
	//isLoading は onAuthStateChanged() を実行中か確認するための状態
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth();
		//ユーザ認証を監視し,変更があったときに引数のコールバック関数を実行
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [setUser]);

  return isLoading;
};

//useUser() はその UserState を他のコンポーネントで呼び出すための関数
export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
