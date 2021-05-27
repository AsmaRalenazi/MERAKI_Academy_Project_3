import React from 'react';
import './App.css';
import Register from "./components/Register"
import Navigation from "./components/Navigation"
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from "./components/login"

export default function App() {
  return (
    <div className="App">
      <Navigation/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      
    </div>
  );
}
