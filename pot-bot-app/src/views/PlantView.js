import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import addPlantIcon from "../styling/images/plus-pot.png";
import elephant from "../styling/images/elefant.jpg";

export default function PlantView({ user, plants, Plant }) {
  const [speciesData, setSpeciesData] = useState([]);

  useEffect(() => {
    async function fetchSpeciesData() {
      const response = await import("../services/species_data.json");
      setSpeciesData(response.default);
    }
    fetchSpeciesData();
  }, []);
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function renderPlants({ plants, Plant }) {
    let meas = "measureData";
    let array = [];
    {
      Object.keys(plants).map((name) => {
        const plantData = plants[name];
        const { default_image, plantRecommendedVitals, species_id } = plantData;
  
        // Find the species with the same species_id as the current plant
        const species = speciesData.find((item) => item.id === parseInt(species_id));
  
        let imageURL;
        if (plantRecommendedVitals) {
          imageURL = isValidUrl(plantRecommendedVitals.imageURL)
            ? plantRecommendedVitals.imageURL
            : default_image && isValidUrl(default_image.regular_url)
            ? default_image.regular_url
            : elephant;
        } else {
          imageURL = elephant;
        }
        console.log("Plant data:", plantData);
        console.log("Image URL:", imageURL);
        console.log(
          "Default Image:",
          default_image ? default_image.regular_url : ""
        );
        return array.push(
          <Plant
            className={name}
            key={name}
            data={plantData[meas]}
            name={name}
            imageURL={imageURL}
            defaultImage={default_image ? default_image.regular_url : ""}
            watering={species ? species.watering.toLowerCase() : "none"}
          sunlight={
            species
              ? species.sunlight
                  .map((s) => s.toLowerCase())
                  .join(", ")
              : "unknown"
          }
        />
      );
    });
  }
  return array;
}

  return (
    <div>
      <h2>Your plants</h2>
      {plants && user && (
        <div className="plant-data">{renderPlants({ plants, Plant })}</div>
      )}

      {
        <div className={"addPlant"}>
          <Link to="/addNewPlant">{<img src={addPlantIcon} />}</Link>
        </div>
      }
    </div>
  );
}
