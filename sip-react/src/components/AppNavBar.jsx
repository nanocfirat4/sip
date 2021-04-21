
import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import keycloak from '../keycloak'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function AppNavBar({ setHide }) {
    return (
        <Navbar bg='dark' expand='lg' variant='dark' >
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/stats'>
                        <Nav.Link>Statistics</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Navbar.Text>
                    <Button
                        variant='dark'
                        onClick={() =>
                            keycloak.logout()
                        }
                    >
                        Logout
                    </Button>
                    {setHide ?
                            <ArrowBackIosIcon
                                color='secondary'
                                style={{ margin: "5px" }}
                                onClick={() => setHide(true)}
                            >
                            </ArrowBackIosIcon>
                        :
                        null}

                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default AppNavBar