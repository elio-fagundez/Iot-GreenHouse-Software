import Logo from '@/components/Logo/Logo'
import React from 'react'

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col justify-center text-white h-full items-center bg-slate-900'>
      <div className="flex my-12">
        <Logo />
      </div>
      {children}
    </div>
  )
}
