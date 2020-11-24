import { Header, Footer } from './layout';
import { Home, About, Blog } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container className="my-3">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
