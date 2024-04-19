import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Routes, Link, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import PracticeItemsList from './components/practiceItemsList.component';
import AddPracticeItem from "./components/add-practiceItem.component";
import PracticeItem from "./components/practiceItem.component";

class App extends Component {
  render () {
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/practiceItems"} className="navbar-brand nav-link">
            Groovemeister
          </Link>
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
            <Route path="/" element={<PracticeItemsList />} />
            <Route path="/practiceItems" element={<PracticeItemsList />} />
            <Route path="/add" element={<AddPracticeItem />} />
            {/* Use the 'withRouter' class because we need to accept the ID parameter */}
            <Route path="/practiceItems/:id" element={<PracticeItem />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;