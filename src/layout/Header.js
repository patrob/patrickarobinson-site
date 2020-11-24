import { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar className="justify-content-center" color="light" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarBrand href="/blog">Blog</NavbarBrand>
                <NavbarBrand href="/about">About</NavbarBrand>
            </Navbar>
        );
    }
}

export default Header;