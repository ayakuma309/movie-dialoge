import React from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

const SeoSetting = () => {
  return (
    <div>
      <Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
        <link rel="icon" href="/favicon.ico" />
			</Head>
			<DefaultSeo
				defaultTitle="Dialogue cinema"
				description="映画の宝さがし"
				openGraph={{
					type: "website",
					title: "Dialogue cinema",
					description: "映画の宝さがし",
					site_name: "Dialogue cinema",
					url: "https://movie-dialoge.vercel.app/",
					images: [
            {
              url: "https://movie-dialoge.vercel.app/ogp.png",
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
					],
				}}
				twitter={{
					handle: '@movie-dialogue',
					site: '@movie-dialogue',
					cardType: "summary_large_image",
				}}
			/>
    </div>
  )
}

export default SeoSetting
