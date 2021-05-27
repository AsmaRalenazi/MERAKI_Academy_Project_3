import {React,  useState } from 'react';
import axios from "axios"

export default function Register() {
  const [user,setUser]=useState([])
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("")
const [age,setAge]=useState("")
const [email,setEmail]=useState("")
const [country,setCountry]=useState("")
const [password,setPassword]=useState("")
const [successfully,setSuccessfully]=useState(false)
const [unsuccessfully,setUnsuccessfully]=useState(false)




const newUser=()=>{
axios.post("http://localhost:5000/users",{
  firstName:firstName,
  lastName:lastName,
  age:age,
  email:email,
  country:country,
  password:password
})
.then((res)=>{
  console.log(res.data);
  if(!res.data.errors){
    setSuccessfully(true)
    setUnsuccessfully(false)
  }else{
    setSuccessfully(false)
    setUnsuccessfully(true)
  }
})
.catch((err)=>{
console.log(err);
});
};
    return (
      <div className="Register">
      <p>Register :</p>
        <input type="text" placeholder="firstName here" onChange={(e) => {
        setFirstName(e.target.value)}}/>
        <input type="text" placeholder="lastName here"  onChange={(e) => {
        setLastName(e.target.value)}}/>
        <input type="Number" placeholder="age here"  onChange={(e) => {
        setAge(e.target.value)}}/>
        <input type="text" placeholder="country here"  onChange={(e) => {
        setCountry(e.target.value)}}/>
        <input type="text" placeholder="email here"  onChange={(e) => {
        setEmail(e.target.value)}}/>
        <input type="password" placeholder="password here" onChange={(e) => {
        setPassword(e.target.value)}}/>
        <button onClick={newUser}>Register</button>
        {successfully?(<div className="massageSuccessful"> The user has been created successfully</div>):null}
        {unsuccessfully?(<div className="massageError">Error happened while creating a new article, please try again</div>):null}
      </div>

    )
        }
  