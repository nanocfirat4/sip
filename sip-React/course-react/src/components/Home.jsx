import React from 'react'
import { Link } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
function Home () {
const { keycloak } = useKeycloak()
return (
<div className="mt-3">
<h1>React - OpenID Connect Example</h1>
<p>An example app showing how to secure React with Keycloak.</p>
{keycloak?.authenticated &&
<p><Link to='/courses'>&gt;&gt; Manage Courses</Link></p>}
</div>
)
}
export default Home