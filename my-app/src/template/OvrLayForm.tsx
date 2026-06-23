import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OvrLayForm: React.FC = () => {
  const [action, setAction] = useState(false);
  const [sliceoflife, setSliceOfLife] = useState(false);
  const [adventure, setAdventure] = useState(false);
  const [isekai, setIsekai] = useState(false);
  const [fantasy, setFantasy] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("action", Number(action).toString());
    params.set("adventure", Number(adventure).toString());
    params.set("isekai", Number(isekai).toString());
    params.set("fantasy", Number(fantasy).toString());
    params.set("slice_of_life", Number(sliceoflife).toString());
    params.set("q", search || "ALL");
    navigate(`/search/advanced?${params.toString()}`);
  };

  return (
    <div>
      <div className="overlayForm">
        <form>
          {[
            { label: "Action", value: action, setter: setAction },
            { label: "Slice of Life", value: sliceoflife, setter: setSliceOfLife },
            { label: "Adventure", value: adventure, setter: setAdventure },
            { label: "Isekai", value: isekai, setter: setIsekai },
            { label: "Fantasy", value: fantasy, setter: setFantasy },
          ].map(({ label, value, setter }) => (
            <label key={label} className="checkmark_container">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setter((prev) => !prev)}
              />
              <div className="checkmark"></div>
              <span>{label}</span>
            </label>
          ))}
          <label className="checkmark_textfield">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <br />
          <button className="ovrButton" type="button" onClick={handleSearch}>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OvrLayForm;
