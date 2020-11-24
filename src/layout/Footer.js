import { Component } from 'react';
import { Navbar } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

class Footer extends Component {
    render() {
        return (
            <Navbar className="footer justify-content-center" color="light" light expand="md">
                <SocialIcon url="http://twitter.com/patrobsatx" style={{ height: 50, width: 50 }} bgColor="#333333" />
                <SocialIcon url="http://facebook.com/patrobsatx" style={{ height: 50, width: 50 }} bgColor="#333333" />
                <SocialIcon url="http://instagram.com/patrobsatx" style={{ height: 50, width: 50 }} bgColor="#333333" />
                <SocialIcon url="http://linkedin.com/in/patrick-robinson-b8b6628" style={{ height: 50, width: 50 }} bgColor="#333333" />
                <SocialIcon url="mailto:patrob@gmail.com" style={{ height: 50, width: 50 }} bgColor="#333333" />
            </Navbar>
        );
    }
}

export default Footer;