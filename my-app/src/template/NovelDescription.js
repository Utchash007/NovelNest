import React, { useState } from "react";

const NovelDescription =()=>{
    return (
<div>    
    <div class="novel_container">
    <div class="novel-header">
        <img src="/Assets/img1.jpeg" alt="Cover Image"/>
        <div class="novel-info">
            <h1>Novel Name</h1>
            <div class="rating">
                <span class="rating-count">Rating: 4.5</span>
            </div>
            <p class="status">Status: <span>Ongoing</span></p>
            <p class="author">Author: <span>Author Name</span></p> 
        </div>
    </div>
    <div class="novel-description">
        <h2>Synopsis</h2>
        <p>This is a sample synopsis. </p>
    </div>
 </div>
</div>
    )
}

export default NovelDescription