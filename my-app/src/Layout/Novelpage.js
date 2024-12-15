import React, { useState } from "react";
import NovelDescription from '../template/NovelDescription';
import NovelCpt from '../template/NovelCpt';

const Novelpage=()=>{
    return(
    <div>
        <NovelDescription/>
        <NovelCpt/>
    </div>
    )
}
export default Novelpage;