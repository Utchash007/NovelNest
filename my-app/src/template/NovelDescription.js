import React, { useState } from "react";

const NovelDescription =({id,image, title, description, status, rating})=>{
    return (
<div>    
    <div class="novel_container">
    <div class="novel-header">
        <img src={image} alt="Cover Image"/>
        <div class="novel-info">
            <h1>{title}</h1>
            <div class="rating">
                <span class="rating-count">Rating: {rating}</span>
            </div>
            <p class="status">Status: <span>{status === 0 ? 'Ongoing' : 'Completed'}</span></p>
            <p class="author">Author: <span>Author Name</span></p> 
        </div>
    </div>
    <div class="novel-description">
        <h2>Synopsis</h2>
        <p>{description} </p>
    </div>
 </div>
</div>
    )
}

export default NovelDescription