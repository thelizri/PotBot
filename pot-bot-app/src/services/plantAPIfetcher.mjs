import fs from "fs";
import fetch from "node-fetch";

const API_KEY = "sk-MV5g643fcb2a3c98d558";
const totalPages = 337;
const speciesList = [];

const fetchSpecies = async (page) => {
  try {
    const response = await fetch(
      `https://perenual.com/api/species-list?page=${page}&key=sk-MV5g643fcb2a3c98d558`
    );

    if (response.ok) {
      const data = await response.json();
      speciesList.push(...data.data);
      console.log(`Fetched page ${page} of ${totalPages}`);
    } else {
      console.error(`Error fetching page ${page}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error fetching page ${page}: ${error.message}`);
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAllSpecies = async () => {
  const delayBetweenRequests = 100; // 100 milliseconds

  for (let page = 1; page <= totalPages; page++) {
    await fetchSpecies(page);
    await delay(delayBetweenRequests);
  }

  fs.writeFileSync("species_data.json", JSON.stringify(speciesList));
  console.log("All species data saved to species_data.json");
};


fetchAllSpecies();