import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

type UserState = User | null; // null の場合はログインしていない状態
const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
      //DB保存する
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid); // ユーザー情報を取得
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            id: uuid(),
            displayName: user.displayName,
          });
        }
      }
    });
    return unsubscribe;
  }, [setUser]);

  return isLoading;
};

//useUser() はその UserState を他のコンポーネントで呼び出すための関数
export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
