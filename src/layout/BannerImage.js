import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class BannerImage extends Component {
    render() {
        let { caption, image } = this.props;
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="text-center">
                        <img className="banner" alt="Patrick A Robinson" src={image} />
                    </Col>
                </Row>
                {caption ? <Row>
                    <Col>
                        <p>{caption}</p>
                    </Col>
                </Row> : null}
            </Container>
        );
    }
}

export default BannerImage;