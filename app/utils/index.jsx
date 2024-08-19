import Link from 'next/link'
import React from 'react'
import TransitionLink from './TransitionLink'

function index({data}) {
  return (
    <div>
      <TransitionLink>{data}</TransitionLink>
    </div>
  )
}

export default index
