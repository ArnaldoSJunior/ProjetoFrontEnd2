import axios from 'axios';
import { useState, useEffect} from 'react';

function Beneficios(){


    const [beneficio, setBeneficio] = useState(null);
    const [beneficios, setBeneficios] = useState([]);
    
  
    function listarBeneficios() {
      axios.get("http://localhost:5078/Beneficios")
        .then(
          (resposta) => {
          console.log(resposta.data);
          setBeneficios(resposta.data);
        });
    }
  
    useEffect(() => {
      listarBeneficios();
    }, []);
      
    function excluir(id) {
      axios.delete("http://localhost:5078/Beneficios/" + id)
        .then(() => {
          listarBeneficios();
        });
    }
  
    function Linha(index, beneficio) {
      return (
        <tr key={index}>
          <td>{beneficio.id}</td>
          <td>{beneficio.nomeBeneficio}</td>
          <td>{beneficio.descricao}</td>
          <td>{beneficio.valor}</td>
          <td>
            <button onClick={() => {excluir(beneficio.id);}}>Excluir</button>
            <button onClick={() => {editar(beneficio);}}>Editar</button>
          </td>
        </tr>
      );
    }
  
    function Linhas(beneficios) {
      const linhas = [];
          for(let i = 0; i < beneficios.length; i++){
              const beneficio = beneficios[i];
              linhas[i] = Linha(i, beneficio);
          }
          return linhas;
    }
  
    function cancelar() {
      setBeneficio(null);
    }
  
    function aoDigitar(e) {
      const { name, value } = e.target;
      setBeneficio({
        ...beneficio,
        [name]: value
      });
    }
  
    function editar(beneficio) {
      setBeneficio({
        id : beneficio.id,
        nomeBeneficio: beneficio.nomeBeneficio,
        descricao: beneficio.descricao,
        valor: beneficio.valor
        
      });
      
      
    }
  
    function salvar() {
  
      if (beneficio.id) {
        axios.put("http://localhost:5078/Beneficios/" + beneficio.id, beneficio)
          .then(
            listarBeneficios()
          );
    
      } else {
        axios.post("http://localhost:5078/Beneficios", beneficio)
          .then(
            listarBeneficios()
          );
      }
      cancelar();
    }
  
    function Formulario() {
      return (
        <form>
          <label htmlFor="nomeBeneficio">Nome benefício</label>
          <input
            type="text"
            id="nomeBeneficio"
            name="nomeBeneficio"
            value={beneficio.nomeBeneficio}
            onChange={aoDigitar}
          />
  
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={beneficio.descricao}
            onChange={aoDigitar}
          />
  
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={beneficio.valor}
            onChange={aoDigitar}
          />
  
    
  
          <button type="button" onClick={salvar}>Salvar</button>
          <button type="button" onClick={cancelar}>Cancelar</button>
        </form>
      );
    }
  
    function novoBeneficio() {
      setBeneficio({
        nomeBeneficio: "",
        descricao: "",
        valor: 0,
        
      })
     
    }
  
    function Tabela(beneficios) {
      return (
        <>
          <button onClick={() => {novoBeneficio();}}>Novo Benefício</button>
          <table>
           {listarBeneficios()}
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
              {Linhas(beneficios)}
          </table>
        </>
      );
    }
  
    function conteudoPrincipal() {
      if(beneficio == null){
        return Tabela(beneficios);
      }else{
        return Formulario();
      }
    }
  
    return (
      <div>
        <h1>Cadastro de Benefícios</h1>
        {conteudoPrincipal()}
      </div>
    );













}
export default Beneficios;