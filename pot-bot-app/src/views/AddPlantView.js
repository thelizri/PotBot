import React, { useState } from "react";
import PlantDetails from '../components/PlantDetails';
import { searchPlantByCommonName } from "../services/plantSource";


export default function AddPlantView(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await searchPlantByCommonName(searchTerm);
    if (result) {
      setSearchResults([result]);
    } else {
      setSearchResults([]);
    }
  };
  


  return (
    <div className="addPlant">
      <h1>Choose your plant to add</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a plant"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
      {searchResults.map((plant) => {
  console.log('Rendering plant:', plant); // Log the plant object
  return (
    <div key={plant.id}>
      <PlantDetails commonName={plant.common_name} />
    </div>
  );
})}
      </div>
    </div>
  );
}
