import './App.css'
import './index.css'
import Nav from './components/Nav';
import CompilerComponent from './components/CompilerComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import WebEditorComponent from './components/WebEditorComponent';

function App() {

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<CompilerComponent />} />
          <Route path='/web-editor' element={<WebEditorComponent />} />
        </Routes>
      </Router>

    </>
  );
}
export default App
