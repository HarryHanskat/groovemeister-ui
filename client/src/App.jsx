import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Routes, Link, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header.jsx'

class App extends Component {
  render () {
    return(
      <div>
        <Header />
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/practiceItems" className="navbar-brand">
            Groovemeister
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/practiceItems"} className="nav-link">
                Practice Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<PracticeItemsList/>} />
            <Route path="/practiceItems" element={<PracticeItemsList/>} />
            <Route path="/add" element={<AddPracticeItem/>} />
            <Route path="/practiceItems/:id" element={<PracticeItem/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;