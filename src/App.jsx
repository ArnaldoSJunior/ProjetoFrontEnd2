import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/layout';
import Home from './pages/home';
import Cargos from './pages/cargo';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Layout><Home/></Layout>} />
       <Route path="/cargo" element={<Layout><Cargos/></Layout>} />
      
    </Routes>
    </>
  );
}

export default App;
