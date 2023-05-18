import Layout from '@/components/common/Layout';
import { getAuth } from 'firebase/auth';
import React from 'react'

const editProfile = () => {
  const auth = getAuth()
  return (
    <Layout title='プロフィール編集'>

    </Layout>
  )
}

export default editProfile;
