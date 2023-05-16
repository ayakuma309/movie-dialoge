import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup} from "firebase/auth"

import { Button, Grid, InputLabel, TextField } from '@mui/material'
import styles from '../styles/signForm.module.css'
const LoginForm = () => {
  const router = useRouter()
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true);

  //新規登録
  const signUpEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
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

  return (
    <div>
      <form onSubmit={isLogin ? signInEmail : signUpEmail}>
        <div className='d-flex justify-center items-center'>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.currentTarget.value);
            }}
            className='pl-3'
          />
        </div>
        <div className='d-flex justify-end align-middle mt-4'>
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value);
            }}
            className='pl-3'
          />
        </div>
        <Grid container>
          <Grid item xs>
            <span
              className={styles.login_reset}
              // onClick={() => setOpenModal(true)}
            >
              Forgot password ?
            </span>
          </Grid>
          <Grid item>
            <span
              className={styles.login_toggleMode}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create new account ?" : "Back to login"}
            </span>
          </Grid>
        </Grid>
        <Button fullWidth variant="contained" color="primary" className="mt-4" type="submit">
          {isLogin ? "ログイン" : "新規登録"}
        </Button>
      </form>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={signInGoogle}
      >
        SignIn with Google
      </Button>
    </div>
  )
}

export default LoginForm;

