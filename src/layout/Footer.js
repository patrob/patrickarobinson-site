import { Component } from 'react';
import { Navbar, Container, Row, Col } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

class Footer extends Component {
    render() {
        let iconStyle = {height: 50, width: 50};
        return (
            <Navbar className="footer align-middle" color="light" light expand="md">
                <Container className="justify-content-center">
                    <Row className="text-center">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <SocialIcon className="mx-2" url="http://twitter.com/realPatRobinson" style={iconStyle} bgColor="#333333" />
                            <SocialIcon className="mx-2" url="http://facebook.com/patrobsatx" style={iconStyle} bgColor="#333333" />
                            <SocialIcon className="mx-2" url="http://instagram.com/patrobsatx" style={iconStyle} bgColor="#333333" />
                            <SocialIcon className="mx-2" url="http://linkedin.com/in/patrick-robinson-b8b6628" style={iconStyle} bgColor="#333333" />
                            <SocialIcon className="mx-2" url="mailto:me@patrickarobinson.com" style={iconStyle} bgColor="#333333" />
                        </Col>
                    </Row>
                </Container>
                
            </Navbar>
        );
    }
}

export default Footer;