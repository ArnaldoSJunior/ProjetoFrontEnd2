import axios from 'axios';
import { useState, useEffect} from 'react';

function Cargos() {
  const [cargo, setCargo] = useState(null);
  const [cargos, setCargos] = useState([]);
  

  function listarCargos() {
    axios.get("http://localhost:5078/Cargos")
      .then(
        (resposta) => {
        console.log(resposta.data);
        setCargos(resposta.data);
      });
  }

  useEffect(() => {
    listarCargos();
  }, []);
    
  function excluir(id) {
    axios.delete("http://localhost:5078/Cargos/" + id)
      .then(() => {
        listarCargos();
      });
  }

  function Linha(index, cargo) {
    return (
      <tr key={index}>
        <td>{cargo.id}</td>
        <td>{cargo.nome}</td>
        <td>{cargo.descricao}</td>
        <td>{cargo.salarioBase}</td>
        <td>{cargo.departamento}</td>
        <td>
          <button onClick={() => {excluir(cargo.id);}}>Excluir</button>
          <button onClick={() => {editar(cargo);}}>Editar</button>
        </td>
      </tr>
    );
  }

  function Linhas(cargos) {
    const linhas = [];
        for(let i = 0; i < cargos.length; i++){
            const cargo = cargos[i];
            linhas[i] = Linha(i, cargo);
        }
        return linhas;
  }

  function cancelar() {
    setCargo(null);
  }

  function aoDigitar(e) {
    const { name, value } = e.target;
    setCargo({
      ...cargo,
      [name]: value
    });
  }

  function editar(cargo) {
    setCargo({
      id : cargo.id,
      nome: cargo.nome,
      descricao: cargo.descricao,
      salarioBase: cargo.salarioBase,
      departamento: cargo.departamento
    });
    
    
  }

  function salvar() {

    if (cargo.id) {
      axios.put("http://localhost:5078/Cargos/" + cargo.id, cargo)
        .then(
          listarCargos()
        );
  
    } else {
      axios.post("http://localhost:5078/Cargos", cargo)
        .then(
          listarCargos()
        );
    }
    cancelar();
  }

  function Formulario() {
    return (
      <form>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={cargo.nome}
          onChange={aoDigitar}
        />

        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={cargo.descricao}
          onChange={aoDigitar}
        />

        <label htmlFor="salarioBase">Salário Base</label>
        <input
          type="number"
          id="salarioBase"
          name="salarioBase"
          value={cargo.salarioBase}
          onChange={aoDigitar}
        />

        <label htmlFor="departamento">Departamento</label>
        <input
          type="text"
          id="departamento"
          name="departamento"
          value={cargo.departamento}
          onChange={aoDigitar}
        />

        <button type="button" onClick={salvar}>Salvar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    );
  }

  function novoCargo() {
    setCargo({
      nome: "",
      descricao: "",
      salarioBase: 0,
      departamento: "",
    })
   
  }

  function Tabela(cargos) {
    return (
      <>
        <button onClick={() => {novoCargo();}}>Novo Cargo</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Salário Base</th>
              <th>Departamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Linhas(cargos)}
          </tbody>
        </table>
      </>
    );
  }

  function conteudoPrincipal() {
    if(cargo == null){
      return Tabela(cargos);
    }else{
      return Formulario();
    }
  }

  return (
    <div>
      <h1>Cadastro de Cargos</h1>
      {conteudoPrincipal()}
    </div>
  );
}

export default Cargos;
