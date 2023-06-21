import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='mt-4 pb-2 w-100 header'>
        <Link className='text-decoration-none' to="/">
            <h5 className='ms-4'><i class="fa-solid fa-angle-left"></i> Home</h5>
        </Link>
    </div>
  )
}
