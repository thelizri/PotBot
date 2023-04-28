
import React, { useState } from "react";
import PlantDetails from "../components/PlantDetails";
import plantSource from "../services/plantSource";

export default function AddPlantView(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchPlantByCommonName = plantSource.searchPlantByCommonName;
  const fetchPlantDetails = plantSource.fetchPlantDetails;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await searchPlantByCommonName(searchTerm);
    if (result && result.data) {
      const plantDetails = await Promise.all(
        result.data.map((plant) => fetchPlantDetails(plant.id))
      );
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
          <p>{plant.details.watering}</p>
          <p>{plant.details.sunlight}</p>
        </div>
      ))}
    </div>
  ); 
}