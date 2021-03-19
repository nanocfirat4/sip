
import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import keycloak from '../keycloak'

function AppNavBar() {
    return (
        <Navbar bg='dark' expand='lg' variant='dark'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                        <LinkContainer to='/courses'>
                            <Nav.Link>Courses</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                            <Nav.Link>Search</Nav.Link>
                        </LinkContainer>
                </Nav>
                    <Navbar.Text>
                        <Button
                            variant='dark'
                            onClick={() =>
                                keycloak.logout()
                            }
                        >Logout
                        </Button>
                    </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default AppNavBar