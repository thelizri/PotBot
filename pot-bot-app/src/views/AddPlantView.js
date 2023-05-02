import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import PlantDetails from '../components/PlantDetails';
import plantSource from '../services/plantSource';
import '../styling/AddPlant.css'


export default function AddPlantView(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {searchPlantByCommonName} = plantSource.searchPlantByCommonName;
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
      <Link to="/"><button className="back-btn">Back to your plants</button></Link>
      </div>
    </div>
  );
}
