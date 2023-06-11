import React, { useEffect, useState } from "react";
import { useUser } from "../../lib/auth";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { NextPage } from "next";
import MyPostMovie from "./MyPostMovie";
import FavoriteMovie from "./FavoriteMovie";

const MyProfile: NextPage = () => {
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const avatarSrc = user.photoURL || "/user.png"; // user.photoURL が null の場合にデフォルトの画像を表示

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
