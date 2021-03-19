
import { useKeycloak } from '@react-keycloak/web'
import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { courseService } from '../services/CourseService'

function AppNavBar() {
    const { keycloak } = useKeycloak()
    console.log(keycloak)
    courseService.authToken(keycloak.token)

    return (
        <Navbar bg='dark' expand='lg' variant='dark'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    {keycloak?.authenticated &&
                        <LinkContainer to='/courses'>
                            <Nav.Link>Courses</Nav.Link>
                        </LinkContainer>}
                    {keycloak?.authenticated &&
                        <LinkContainer to='/about'>
                            <Nav.Link>Search</Nav.Link>
                        </LinkContainer>}
                </Nav>
                {!keycloak?.authenticated &&
                    <Navbar.Text>
                        <Button
                            variant='dark'
                            onClick={() => keycloak.login()}
                        >Login
                        </Button>
                    </Navbar.Text>}
                {keycloak?.authenticated &&
                    <Navbar.Text>{keycloak?.idTokenParsed?.name}{' '}
                        <Button
                            variant='dark'
                            onClick={() => keycloak.logout()}
                        >Logout
</Button>
                    </Navbar.Text>}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default AppNavBar