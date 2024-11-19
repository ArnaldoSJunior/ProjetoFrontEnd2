import { NavLink } from "react-router-dom";

function Nav(){
    return(
        <nav>
            <ul>
            <li><NavLink to="/">Home</NavLink></li> 
                <li><NavLink to="/funcionario">Funcionarios</NavLink></li>
                <li><NavLink to="/cargo">Cargos</NavLink></li>
                <li><NavLink to="/departamento">Departamentos</NavLink></li>
                <li><NavLink to="/beneficio">Beneficios</NavLink></li>
                <li><NavLink to="/historicoSalario">Histórico Salários</NavLink></li>
                <li><NavLink to="/ponto">Ponto</NavLink></li>

                
        
            </ul>
        </nav>
    )
}
export default Nav;