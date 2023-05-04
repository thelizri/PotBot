import React, {useState} from "react";
import {Link} from "react-router-dom";
import plantSource from '../services/plantSource';
import '../styling/AddPlant.css'

/*TODO:Flytta konstanter till presenter från app */
const {searchPlants, fetchPlantDetails} = plantSource;

export default function AddPlantView({addPlantToPersonalList}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedPlantId, setExpandedPlantId] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePlantClick = (plantId) => {
    if (expandedPlantId === plantId) {
      setExpandedPlantId(null);
    } else {
      setExpandedPlantId(plantId);
    }
  };

  const handleAddPlantButtonClick = (plant) => {
    addPlantToPersonalList(plant);
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
      <div className="addPlantDescr">
        <h2>Connect your plant to the PotBot</h2>
        <p>First choose what kind of plant you have and we will calibrate the optimal conditions for it</p>
      </div>
      <form className="plant-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose your plant"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
        <Link to="/home">
          <button className="back-btn">Back to your plants</button>
        </Link>
      </form>

      <div className="search-results-grid">
        {searchResults.map((plant) => (
          <div
            className="plant-card"
            key={plant.id}
            onClick={() => handlePlantClick(plant.id)}
          >
            <div key={plant.id}>
              <img src={plant.default_image.regular_url} alt={plant.common_name} width="100" height="100"/>
              <p>{plant.common_name}</p>
            </div>
            {expandedPlantId === plant.id && (
              <div className="plant-dropdown">
                <button
                  className="add-plant-button"
                  onClick={() => handleAddPlantButtonClick(plant)}
                >
                  Add to my plants
                </button>
              </div>
            )}
            {plant.details && (
              <div>
                {plant.details.watering && <p>Watering: {plant.details.watering}</p>}
                {plant.details.sunlight && <p>Sunlight: {plant.details.sunlight.join(', ')}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
