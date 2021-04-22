
import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import keycloak from '../keycloak'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Tooltip, withStyles } from '@material-ui/core';


const InfoTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#d3d3d3',
        color: 'rgba(0, 0, 0, 0.87)',
        border: "1px solid gray",
        maxWidth: 420,
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);


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

                </Navbar.Text>
            </Navbar.Collapse>
            {setHide ?

                <InfoTooltip
                    title="Hide Navbar"
                >
                    <Button
                        variant='dark'
                        onClick={() =>
                            setHide()
                        }
                    >
                        <ArrowBackIosIcon
                            color='secondary'
                        />
                    </Button>
                </InfoTooltip>
            :
                null}
        </Navbar>
    )
}
export default AppNavBar