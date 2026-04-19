'use client'

import dynamic from 'next/dynamic'

const Dither = dynamic(() => import('./Dither'), {
  ssr: false,
})

export default function DitherWrapper(props: any) {
  return <Dither {...props} />
}
