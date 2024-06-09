import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    fetch('http://localhost:8080/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        nome: nome,
        senha: senha
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Adicione aqui qualquer lógica que você queira ao receber a resposta
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}



function MyForm() {
  const [idUsuario, setIdUsuario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    fetch('http://localhost:8080/add-gasto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        usuario_id: parseInt(idUsuario), 
        descricao: descricao,
        categoria: categoria,
        valor: parseFloat(valor),
        data_gasto: data
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Adicione aqui qualquer lógica que você queira ao receber a resposta
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        id do usuario:
        <input
          type="number"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
        descricao:
        <input
          type="descricao" // Altere o type para password para ocultar a senha
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        categoria:
        <input
          type="categoria" // Altere o type para password para ocultar a senha
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        valor:
        <input
          type="number" // Altere o type para password para ocultar a senha
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        data:
        <input
          type="data" // Altere o type para password para ocultar a senha
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

function AreaChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const usuarioId = 1; // ID do usuário específico

    fetch(`http://localhost:8080/api/gastos/${usuarioId}`)
      .then(response => response.json())
      .then(data => {
        const labels = data.map(gasto => gasto.data_gasto); // Assumindo que os dados possuem a propriedade `data_gasto`
        const values = data.map(gasto => gasto.valor); // Assumindo que os dados possuem a propriedade `valor`

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Gastos',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 8,
            pointRadius: 8,
            pointHoverRadius: 12,
            fill: false,
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

function GastoTable() {
  const [gastos, setGastos] = useState([]);
  const usuarioId = 1; // ID do usuário específico

  useEffect(() => {
    fetch(`http://localhost:8080/api/gastos/${usuarioId}`)
      .then(response => response.json())
      .then(data => setGastos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario ID</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Data Gasto</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map(gasto => (
          <tr key={gasto.id}>
            <td>{gasto.id}</td>
            <td>{gasto.usuario_id}</td>
            <td>{gasto.descricao}</td>
            <td>{gasto.categoria}</td>
            <td>{gasto.valor}</td>
            <td>{gasto.data_gasto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GastoPieChart() {
  const [gastos, setGastos] = useState([]);
  const usuarioId = 1; // ID do usuário específico

  useEffect(() => {
    fetch(`http://localhost:8080/api/gastos/${usuarioId}`)
      .then(response => response.json())
      .then(data => setGastos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const categorias = gastos.reduce((acc, gasto) => {
    const { categoria, valor } = gasto;
    acc[categoria] = acc[categoria] ? acc[categoria] + valor : valor;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categorias),
    datasets: [{
      data: Object.values(categorias),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
    }]
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header></header>
      <MyForm />
      <AreaChart />
      <GastoTable/>
      <GastoPieChart/>
    </div>
  );
}

export default App;
