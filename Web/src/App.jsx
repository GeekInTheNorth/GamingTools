import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Heat from './pages/Heat';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heat" element={<Heat />} />
      </Routes>
    </>
  );
}

export default App;
