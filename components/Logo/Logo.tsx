"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
  
  const router = useRouter();

  return (
    <div className='min-h-20 h-20 flex items-center px-6  dark:border-none cursor-pointer gap-2'
    onClick={() => router.push('/')}
    >
      <Image src='/logos/black.png' width={180} height={30} alt='Logo' priority />
    </div>
  )
}
