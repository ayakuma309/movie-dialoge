import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../../lib/auth";
import { deleteUser, getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import MyPostMovie from "./MyPostMovie";
import FavoriteMovie from "./FavoriteMovie";
import { Avatar } from "@mui/material";

const MyProfile: NextPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('post'); // デフォルトは投稿一覧

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  // リダイレクト中は何も表示しない
  if (!user) {
    return null;
  }

  //タブ
  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };
  const avatarSrc = user.photoURL || "/user.png"; // user.photoURL が null の場合にデフォルトの画像を表示

  //退会処理
  const onClickDeleteUser = async () => {
    if(window.confirm("本当に退会しますか?")) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try{
          // Firebase Authenticationからユーザーを削除
          await deleteUser(currentUser);

          //ユーザードキュメントを削除
          const userRef = doc(db, 'users', currentUser.uid);
          await deleteDoc(userRef);

          // ユーザーが投稿した映画を削除
          const moviesQuerySnapshot = await getDocs(query(collection(db, 'movies'), where('user_id', '==', currentUser.uid)));
          moviesQuerySnapshot.forEach(async (movieDoc) => {
            const movieRef = doc(db, 'movies', movieDoc.id);
            console.log(movieRef);
            await deleteDoc(movieRef);
          });

          router.push('/');
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  return (
    <main title="Profile-Page">
      <section className="relative py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative flex w-full min-w-0 flex-col break-words rounded-lg  shadow-xl">
            <div className="px-6">
              <div className="mt-3 text-center sm:mt-1">
                <Avatar
                  src={avatarSrc}
                  className="mx-auto"
                  sx={{ width: 100, height: 100 }}
                />
                <h3 className="text-white mb-2 text-4xl font-semibold leading-normal">
                  <p>{user.displayName}</p>
                </h3>
                <div>
                  <Link href={`/users/${user?.uid}/edit`}>
                    <button
                      className="rounded bg-gray-500 text-white px-4 py-4 text-xs font-bold hover:bg-white hover:text-gray-600"
                      type="button"
                    >
                      マイページ編集
                    </button>
                  </Link>
                  <button
                    className="rounded bg-gray-500 text-white px-4 py-4 text-xs font-bold hover:bg-white hover:text-gray-600"
                    type="button"
                    onClick={onClickDeleteUser}
                  >
                    退会する
                  </button>
                </div>
              </div>
              <div className="container mx-auto flex flex-col flex-wrap px-5 py-2">
                <div className="mx-auto mb-10 flex flex-wrap">
                  <a
                    className={`inline-flex w-1/2 items-center justify-center rounded-t border-b-2 px-4 py-3 leading-none tracking-wider border-gray-500 hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 sm:w-auto sm:justify-start ${
                      activeTab === 'post' ? 'border-gray-500 bg-gray-100 text-gray-500' : ''
                    }`}
                    onClick={() => handleTabClick('post')}
                  >
                    <p className="w-auto whitespace-nowrap px-4 text-sm">投稿一覧</p>
                  </a>
                  <a
                    className={`inline-flex w-1/2 items-center justify-center rounded-t border-b-2 px-4 py-3 leading-none tracking-wider border-gray-500 hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 sm:w-auto sm:justify-start ${
                      activeTab === 'favorite' ? 'border-gray-500 bg-gray-100 text-gray-500' : ''
                    }`}
                    onClick={() => handleTabClick('favorite')}
                  >
                    <p className="w-auto whitespace-nowrap px-4 text-sm">お気に入りの投稿</p>
                  </a>
                </div>
                <div>
                  {activeTab === 'post' && <MyPostMovie />}
                  {activeTab === 'favorite' && <FavoriteMovie />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyProfile;
