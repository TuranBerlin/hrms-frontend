import './App.css';
import Dashboard from './layouts/Dashboard';
import Navi from './layouts/Navi';
import Container from '@material-ui/core/Container';

function App() {

  return (
    <div className="App">
      <Navi/>
      <Container>
        <Dashboard/>
      </Container>
    </div>
  );
}

export default App;
