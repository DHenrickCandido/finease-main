import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": name,
                              "password": password }),
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
      Enter your name:
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
    </label>
    <button type="submit">Enviar</button>
  </form>
  )
}

function AreaChart() {
  return (
    <div class="col-xl-8 col-lg-7">
    <div class="card shadow mb-4">
        <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
            <div class="dropdown no-arrow">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink">
                    <div class="dropdown-header">Dropdown Header:</div>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="chart-area">
                <canvas id="myAreaChart"></canvas>
            </div>
        </div>
    </div>
</div>

  );
}

function App() {
  return (
    <div className="App">
      <header></header>
      <MyForm />
      <AreaChart/>
    </div>
  );
}

export default App;
