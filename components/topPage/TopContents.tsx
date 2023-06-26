import Link from 'next/link'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

const TopContents: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = () => {
    setIsLoading(true);
  };
  return (
  <div className="relative h-screen overflow-hidden text-white">
    <div className="container relative flex items-center px-6 mx-auto md:px-12">
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="font-extrabold leading-tight text-cente text-4xl sm:text-8xl">
          セリフの映画館
        </h1>
        <p className="mt-4 text-center font-bold font-mono">
          いつもとは違った方法で映画を選びませんか?
        </p>
        <div className='flex justify-between'>
          {isLoading ? (
            <div className="container mx-auto flex justify-center pb-10 pt-4">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <Link href="/dialogueIndex">
              <button
                className="block px-4 py-3 mt-10 text-lg font-bold rounded-md ml-1 border"
                onClick={handleClick}
              >
                のぞいてみる
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}
export default TopContents
