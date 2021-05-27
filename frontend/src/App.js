import React from 'react';
import './App.css';
import Register from "./components/Register"
import Navigation from "./components/Navigation"
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from "./components/login"
import Dashboard from "./components/Dashboard"
import NewArticle from "./components/NewArticle"


export default function App(token) {
  return (
    <div className="App">
      <Navigation/>
      
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/NewArticle" component={NewArticle} />
      
    </div>
  );
}
