import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
    return (
        <div className="mt-3">
            <h1>React - OpenID Connect Example</h1>
            <p>An example app showing how to secure React with Keycloak.</p>
            <p><Link to='/courses'>&gt;&gt; Manage Courses</Link></p>
        </div>
    )
}
export default Home