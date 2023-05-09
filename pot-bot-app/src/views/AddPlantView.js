import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import plantSource from '../services/plantSource';
import { ThreeDots } from 'react-loader-spinner'
import '../styling/AddPlant.css';
import speciesData from "../services/species_data.json";
import elephant from "../styling/images/elefant.jpg";

/*TODO:Flytta konstanter till presenter från app */
const {searchPlants, fetchPlantDetails} = plantSource;


export default function AddPlantView({ addPlantToPersonalList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedPlantId, setExpandedPlantId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setIsSearchMade] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const observer = useRef();
  const loaderRef = useRef();

  const localSearchPlants = (searchTerm) => {
    return speciesData.filter((plant) => {
      return (
        plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name.some((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (plant.other_name &&
          plant.other_name.some((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    });
  };

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
    const result = localSearchPlants(searchTerm);
    console.log("Search Results:", result);
    if (result && result.length > 0) {
      setSearchResults(result);
      setIsSearchMade(true); // Set isSearchMade to true when search is made
      setIsLoading(true);
    } else {
      setSearchResults([]);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const results = await searchPlants(searchTerm, nextPage);
    setCurrentPage(nextPage);
    const plantDetails = await Promise.all(
      results.map((plant) => fetchPlantDetails(plant.id))
    );
    setSearchResults([...searchResults, ...plantDetails]);
    setIsFetchingMore(false);
  };

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !isFetchingMore) {
        setIsFetchingMore(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isFetchingMore) {
      handleLoadMore();
    }
  }, [isFetchingMore]);

  useEffect(() => {
    if (observer.current && searchResults.length > 0) {
      observer.current.observe(document.querySelector(".plant-card:last-child"));
    }
  }, [searchResults]);

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
        {searchResults.map((plant, index) => (
          <div
            className="plant-card"
            key={plant.id}
            onClick={() => handlePlantClick(plant.id)}
          >
            <div key={plant.id}>
              <img
                src={
                  plant.default_image
                    ? plant.default_image.regular_url
                    : elephant
                }
                alt={plant.common_name}
                width="100"
                height="100"
              />
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
            {index === searchResults.length - 1 && !isLoading && (
              <div className="load-more" ref={loaderRef}>
                Load More
              </div>
            )}
            {isLoading && (
              <div className="loading">
                <ThreeDots type="ThreeDots" color="#2BAD60" height={40} width={40} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
