import {React,useState} from 'react'
import { BrowserRouter as Router,Route ,Switch} from "react-router-dom";
export default function CreateNewArticle(){
const [title,setTitle]=useState("");
    return (
        <>
        <input type="text" placeholder="article title here"onChange={(e) => {
        setTitle(e.target.value)}}/>
        <input type="textarea" placeholder="article description here"/>
        <button>Create New Article</button>
        </>
        // const newArt=()=>{
        // axios.post("http://localhost:5000/articles",{

        
    )
        }