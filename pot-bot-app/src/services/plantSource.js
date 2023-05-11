import axios from 'axios';
import { useState } from 'react';
import {get, ref} from "firebase/database";
import {db} from "../firebaseModel";

const API_BASE = 'https://perenual.com/api';
const API_KEY = 'sk-vhKW64412e6ecbc88586';


async function searchPlants(searchTerm) {
  const dbRef = ref(db, "plantsData/species_data_detailed");
  const snapshot = await get(dbRef);
  const plantData = snapshot.val();

  const results = Object.values(plantData).filter(
    (plant) =>
    plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientific_name.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (plant.other_name && plant.other_name.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return results;
}

async function fetchPlantDetails(plantId) {
  const dbRef = ref(db, `plantsData/species_data_detailed/${plantId}`);
  const snapshot = await get(dbRef);
  return snapshot.val();
}

export default { searchPlants, fetchPlantDetails };