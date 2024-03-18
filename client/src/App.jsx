import React, { Component } from "react";
import logo from './assets/logo.svg';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    fetch("/api/practiceItems")
      .then((res) => res.json())
      .then((data) => setData(data[0].description));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading...": data}</p>
      </header>
    </div>
  );
}

export default App;
