import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'

interface LayoutProps {
  title: string
  children: ReactNode
}

export default function Layout({ title, children }: LayoutProps): ReactElement {
  return (
    <div className='bg-gray-300'>
      <Head>
        <title className='capitalize'>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main style={{ maxWidth: "85rem" }} className='container mx-auto pt-8 min-h-screen'>
        {children}
      </main>
    </div>
  )
}
