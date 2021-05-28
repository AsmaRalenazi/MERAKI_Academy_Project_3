import React from "react";
import { Link, Route } from "react-router-dom";


export default function Navigation ({token}) {
  console.log(token)
  return (<>
    <div className="Navigation" style={{ display: "flex", gap: "16px" }}>
      
     {!token? <Link to="/login"> login </Link>:null}
     {!token? <Link to="/register"> Register </Link>:null}
     {token? <Link to="/Dashboard" >Dashboard</Link>:null}
     {token?  <Link to="/CreateNewArticle">CreateNewArticle</Link>:null}
    

      
      
    </div>
 </>
  );
};
