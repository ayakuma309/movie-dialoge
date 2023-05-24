import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile} from "firebase/auth"
import DialogModal from '../common/DialogModal'
import { TextField } from '@mui/material'

const Auth: React.FC = () => {
  const router = useRouter()
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState("");

  //パスワードリセットを押したらモーダルが開く
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");

  //新規登録
  const signUpEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const authUser = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile( authUser.user , {
      displayName: displayName
    });
    router.push("/")
  }
  //ログイン
  const signInEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //auth.signInWithEmailAndPassword(email, password)の一行でログイン処理を行っている。
    await signInWithEmailAndPassword(auth, email, password)
    router.push("/")
  };

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider).catch(() => {
      alert("ログインに失敗しました");
    });
    router.push("/")
  }

   //リセットパスワード(firebase)
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  return (
    <div className='my-0 mt-20 sm:mt-0'>
      <div>
        <h2 className='mt-8 text-center text-3xl font-extrabold text-white'>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
      </div>
      <form className='mx-10 mt-8 space-y-6 sm:mx-0' onSubmit={isLogin ? signInEmail : signUpEmail}>
        <input type='hidden' name='remember' value='true' />
        <div className='-space-y-px rounded-md shadow-sm'>
          {!isLogin && (
            <div>
              <input
              id='username'
              type='username'
              autoComplete='username'
              required
              className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-xs text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              placeholder='username'
              value={displayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDisplayName(e.target.value);
              }}
            />
            </div>
          )}
          <div>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-xs text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              placeholder='email address'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-xs text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              placeholder='Password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='text-sm'>
            <span
              onClick={() => setIsLogin(!isLogin)}
              className='cursor-pointer font-medium text-white hover:text-gray-500'
            >
              {isLogin ? 'アカウント作成はこちら' : 'ログインはこちら'}
            </span>
          </div>
        </div>
        <DialogModal  open={openModal} close={() => setOpenModal(false)} >
          <label>Email</label>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            type="email"
            name="email"
            value={resetEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setResetEmail(e.target.value);
            }}
            fullWidth
          />
          <button
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 my-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            onClick={sendResetEmail}
          >
            変更する
          </button>
        </DialogModal>
        <div>
          <button
            type='submit'
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            disabled={ !email || password.length < 6 }>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-white group-hover:text-indigo-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            {isLogin ? 'ログイン' : 'アカウント作成'}
          </button>
          <button
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 my-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            onClick={signInGoogle}
          >
            SignIn with Google
          </button>
          <div
            onClick={() => setOpenModal(true)}
            className='text-white'
          >
            password change
          </div>
        </div>
      </form>
    </div>
  )
}
export default Auth