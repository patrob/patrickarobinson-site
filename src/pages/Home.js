import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import banner from '../images/Patrick.jpg';
import code from '../images/Code.jpg';
import leadership from '../images/Patrick_Leadership.jpg';
import sound from '../images/Patrick_Sound.jpg';

class Home extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="text-center">
                        <img className="banner" alt="Patrick A Robinson" src={banner} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="pt-3">Howdy! My name is Patrick, and I'm here to help you! If you have any questions about software development, live music production, or leadership development, then you've come to the right place! Connect with me through any of my social media accounts or send me an email. I can't wait to connect with you!</p>
                    </Col>
                </Row>
                <hr />
                <Row className="pt-2">
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <h2 className="text-center">Software Engineering</h2>
                        <img className="topic-image" alt="code" src={code} />
                        <p>Access to over 10 years of experience developing software using current best practices and agile methodologies.</p>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <h2 className="text-center">Leadership</h2>
                        <img className="topic-image" alt="leadership" src={leadership} />
                        <p>Discover your potential through leadership development, and become who you were meant to be.</p>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <h2 className="text-center">Live Music Production</h2>
                        <img className="topic-image" alt="sound" src={sound} />
                        <p>Audio not up to par for your live event? Need help with lighting, lyrics, and live streaming? We can help!</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
