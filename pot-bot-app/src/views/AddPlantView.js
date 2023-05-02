import React, { useState } from "react";
import PlantDetails from "../components/PlantDetails";
import plantSource from "../services/plantSource";

const { searchPlants, fetchPlantDetails } = plantSource;

export default function AddPlantView(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await searchPlants(searchTerm);
    console.log("Search Results:", result);
    if (result && result.length > 0) {
      const plantDetails = await Promise.all(
        result.map((plant) => fetchPlantDetails(plant.id))
      );
      console.log("Plant Details:", plantDetails);
      setSearchResults(plantDetails);
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
      {searchResults.map((plant) => (
        <div key={plant.id}>
          <img src={plant.image_url} alt={plant.common_name} />
          <p>{plant.common_name}</p>
          {plant.details && (
  <div>
    {plant.details.watering && <p>Watering: {plant.details.watering}</p>}
    {plant.details.sunlight && <p>Sunlight: {plant.details.sunlight.join(', ')}</p>}
  </div>
)}

        </div>
      ))}
    </div>
  ); 
}