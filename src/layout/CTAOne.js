import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class CTAOne extends Component {

    renderCTA(cta) {
        return (
            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                <h2 className="text-center">{cta.title}</h2>
                <img className="topic-image" alt={cta.title} src={cta.image} />
                <p>{cta.caption}</p>
            </Col>
        );
    }

    render() {
        let { ctas } = this.props;
        return (
            <Container>
                <Row className="pt-2">
                    {ctas.map((cta) => this.renderCTA(cta))}
                </Row>
            </Container>
        );
    }
}

export default CTAOne;
