import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar className="justify-content-center" color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
                <NavbarBrand tag={Link} to="/blog">Blog</NavbarBrand>
                <NavbarBrand tag={Link} to="/about">About</NavbarBrand>
            </Navbar>
        );
    }
}

export default withRouter(Header);