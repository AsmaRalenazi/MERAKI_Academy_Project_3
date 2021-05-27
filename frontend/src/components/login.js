import React,{useState} from "react";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const logUser=()=>{
axios.post("http://localhost:5000/login",{
    email:email,
    password:password
}).then((res)=>{
    console.log(res.data);
}).catch((err)=>{ 
  console.log(err);
  });
}
    return (
<>
<div className="login">
<p>login</p>
<input type="text" placeholder="email here"
onChange={(e)=>setEmail(e.target.value)} />

<input type="Password" placeholder="password here"
onChange={(e)=>setPassword(e.target.value)} />
<button onClick={logUser}>login</button>
</div>
</>
)
}