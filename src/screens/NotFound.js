
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex-grow">404 Page not found</h1>
        <p>This page could not be found, <Link to='/'>click here</Link> to return home.</p>
      </div>
    )
}