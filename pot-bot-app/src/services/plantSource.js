import axios from 'axios';
import { useState } from 'react';


const API_BASE = 'https://perenual.com/api';
const API_KEY = 'sk-vhKW64412e6ecbc88586';

const searchPlants = async (searchTerm, page = 1) => {
  console.log('searchPlants called with:', searchTerm);
  try {
    const response = await axios.get(`${API_BASE}/species-list?key=${API_KEY}&page=${page}`);
    const plants = response.data.data;

    const filteredPlants = plants.filter(plant => {
      return (
        plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (plant.other_name && plant.other_name.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    });

    return filteredPlants;
  } catch (error) {
    console.error('Error searching for plants:', error);
    return [];
  }
};

const fetchPlantDetails = async (plantId) => {
  try {
    const response = await axios.get(`${API_BASE}/species/details/${plantId}?key=${API_KEY}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching plant details:', error);
    return null;
  }
};

export default { searchPlants, fetchPlantDetails };