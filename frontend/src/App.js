import {React,useState} from 'react';
import './App.css';
import Register from "./components/Register"
import Navigation from "./components/Navigation"
import { BrowserRouter as Router,Route ,Switch} from "react-router-dom";
import Login from "./components/login"
import Dashboard from "./components/Dashboard"
import CreateNewArticle from "./components/CreateNewArticle"

export default function App() {
  const [token, setToken] = useState("")
  return (
    <div className="App">
      <Route  render={()=><Navigation token={token}/>  }/>
      <Switch>
      <Route exact path="/login" render={()=><Login setToken={setToken}/>  }/>
      <Route exact path="/register" component={Register} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/CreateNewArticle" render={()=><CreateNewArticle token={token}/>}/>
      </Switch>
    </div>
  );
}
