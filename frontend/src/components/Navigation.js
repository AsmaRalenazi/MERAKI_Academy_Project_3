import React from "react";
import { Link, Route } from "react-router-dom";


export default function Navigation () {
  return (
    <div className="Navigation" style={{ display: "flex", gap: "16px" }}>
      
      <Link to="/login"> login </Link>
      <Link to="/register"> Register </Link>
      <Link to="/Dashboard" >Dashboard</Link>
      <Link to="/NewArticle">NewArticle</Link> 
 
    </div>
  );
};
