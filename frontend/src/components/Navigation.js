import React from "react";
import { Link, Route } from "react-router-dom";


export default function Navigation ({setToken}) {
  console.log(setToken)
  return (<>
    <div className="Navigation" style={{ display: "flex", gap: "16px" }}>
      
     {!setToken? <Link to="/login"> login </Link>:null}
     {!setToken? <Link to="/register"> Register </Link>:null}
     {setToken? <Link to="/Dashboard" >Dashboard</Link>:null}
     {setToken?  <Link to="/CreateNewArticle">CreateNewArticle</Link>:null}
    

      
      
    </div>
 </>
  );
};
