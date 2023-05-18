import React from 'react'
import { NextPage } from 'next'
import Layout from './components/common/Layout'
import Auth from './components/login/Auth'
const LoginForm: NextPage = () => {
  return (
    <Layout title="ログイン">
      <div className='container mx-auto mt-28 mb-12 w-[350px] rounded-xl text-center shadow-xl sm:w-full sm:max-w-lg sm:py-28 sm:px-24 bg-Color'>
        <Auth />
      </div>
    </Layout>
  )
}

export default LoginForm;

