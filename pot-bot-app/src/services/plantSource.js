import { get, ref } from "firebase/database";
import { db } from "../firebaseModel";

const API_BASE = "https://perenual.com/api";
const API_KEY = "sk-vhKW64412e6ecbc88586";

export const searchPlants = async (searchTerm) => {
  const dbRef = ref(db, "plantsData/species_data_detailed");
  const snapshot = await get(dbRef);
  const plantData = snapshot.val();

  const results = Object.values(plantData).filter(
    (plant) =>
      plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientific_name.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (plant.other_name && plant.other_name.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const capitalizedResults = results.map((plant) => {
    return {
      ...plant,
      common_name: plant.common_name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    };
  });

  return capitalizedResults;
};

export const fetchPlantDetails = async (plantId) => {
  const dbRef = ref(db, `plantsData/species_data_detailed/${plantId - 1}`);
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export default { searchPlants, fetchPlantDetails };
