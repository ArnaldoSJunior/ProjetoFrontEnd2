import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/layout';
import Home from './pages/home';
import Cargos from './pages/cargo';
import Funcionarios from './pages/funcionario';
import Departamentos from './pages/departamento';
import Beneficios from './pages/beneficio';
import HistoricoSalarios from './pages/historicoSalario';
import Pontos from './pages/ponto';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Layout><Home/></Layout>} />
       <Route path="/funcionario" element={<Layout><Funcionarios/></Layout>} />
       <Route path="/cargo" element={<Layout><Cargos/></Layout>} />
       <Route path="/departamento" element={<Layout><Departamentos/></Layout>} />
       <Route path="/beneficio" element={<Layout><Beneficios/></Layout>} />
       <Route path="/historicoSalario" element={<Layout><HistoricoSalarios/></Layout>} />
       <Route path="/ponto" element={<Layout><Pontos/></Layout>} />
      
    </Routes>
    </>
  );
}

export default App;
