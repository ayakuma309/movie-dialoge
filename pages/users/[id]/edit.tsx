import Layout from '@/components/common/Layout';
import { TextField } from '@mui/material';
import { getAuth, updatePassword} from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react'

const editProfile = () => {
  const auth = getAuth()
  const user = auth.currentUser;
  //パスワード変更を押したらモーダルが開く
  const [resetPassword, setResetPassword] = useState("");

  //パスワード変更(firebase)
  const sendResetPassword = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newPassword = resetPassword;

    if (user !== null) {
      try {
        await updatePassword(user, newPassword);
        setResetPassword("");
      } catch (err: any) {
        alert(err.message);
      }
    }
  };


  return (
    <Layout title='Edit Profile'>
      <div className='flex flex-col items-center justify-center'>
        <h2
          className='text-2xl font-bold text-white my-3'
        >パスワード変更</h2>
        <TextField
          type="password"
          name="password"
          value={resetPassword}
          className='bg-white text-black mb-3 rounded-md'
          placeholder='パスワードを入力してください'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setResetPassword(e.target.value);
          }}
          fullWidth
        />
        <button
          className='group relative flex w-full justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 my-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={sendResetPassword}
        >
          変更する
        </button>
      </div>
      <Link href={'/users/[user.id]'}>
        <button
          className='text-white'
        >マイページに戻る</button>
      </Link>
    </Layout>
  )
}

export default editProfile;
