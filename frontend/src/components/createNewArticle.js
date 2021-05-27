import React from 'react'
export default function newArticle(){

    return (
        <>
        <input type="text" placeholder="article title here"onChange={(e) => {
        setFirstName(e.target.value)}}/>
        <input type="textarea" placeholder="article description here"/>
        <button>Create New Article</button>
        </>
        // const newArt=()=>{
        // axios.post("http://localhost:5000/articles",{

        
    )
        }