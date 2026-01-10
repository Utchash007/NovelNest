import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OvrLayForm = () => {
    const [action, setAction] = useState(0);
    const [sliceoflife, setSliceOfLife] = useState(0);
    const [adventure, setAdventure] = useState(0);
    const [isekai, setIsekai] = useState(0);
    const [fantasy, setFantasy] = useState(0);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        const searchQuery = search === '' ? 'ALL' : search;
        navigate(`/AdvSearchResultLayout/${action}/${adventure}/${isekai}/${fantasy}/${sliceoflife}/${searchQuery}`);
    };
    return (
        <div>
            <div className="overlayForm">
                <form>
                    <label className="checkmark_container">
                        <input type="checkbox" checked={action} onChange={() => setAction(!action)} />
                        <div className="checkmark"></div>
                        <span>Action</span>
                    </label>
                    <label className="checkmark_container">
                        <input type="checkbox" checked={sliceoflife} onChange={() => setSliceOfLife(!sliceoflife)} />
                        <div className="checkmark"></div>
                        <span>Slice of Life</span>
                    </label>
                    <label className="checkmark_container">
                        <input type="checkbox" checked={adventure} onChange={() => setAdventure(!adventure)} />
                        <div className="checkmark"></div>
                        <span>Adventure</span>
                    </label>
                    <label className="checkmark_container">
                        <input type="checkbox" checked={isekai} onChange={() => setIsekai(!isekai)} />
                        <div className="checkmark"></div>
                        <span>Isekai</span>
                    </label>
                    <label className="checkmark_container">
                        <input type="checkbox" checked={fantasy} onChange={() => setFantasy(!fantasy)} />
                        <div className="checkmark"></div>
                        <span>Fantasy</span>
                    </label>
                    <label className="checkmark_textfield">
                        <input type="textfield" placeholder="Search" value={search}  onChange={(e)=>setSearch(e.target.value)}/>
                        </label>
                        <br></br>
                    <button className="ovrButton" onClick={handleSearch}>
                         <span>Search</span>
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default OvrLayForm;