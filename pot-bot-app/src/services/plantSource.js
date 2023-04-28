const apiKey = "sk-vhKW64412e6ecbc88586";
const searchUrl = `https://perenual.com/api/species-list?page=1&key=${apiKey}`;
const detailsUrlTemplate = `https://perenual.com/api/species/details/{{ID}}?key=${apiKey}`;

async function searchPlantByCommonName(commonName) {
  const searchResponse = await fetch(searchUrl);
  const searchResults = await searchResponse.json();
  const plants = searchResults.data;

  // Search for the first plant with a matching common name
  const matchingPlant = plants.find(
    (plant) => plant.common_name.toLowerCase() === commonName.toLowerCase()
  );

  if (matchingPlant) {
    // Fetch the details of the matching plant
    const detailsUrl = detailsUrlTemplate.replace("{{ID}}", matchingPlant.id);
    const detailsResponse = await fetch(detailsUrl);
    const details = await detailsResponse.json();
    return details;
  } else {
    return null;
  }
}

async function fetchPlantDetails(plantId) {
  const detailsUrl = detailsUrlTemplate.replace("{{ID}}", plantId);
  const detailsResponse = await fetch(detailsUrl);
  const details = await detailsResponse.json();
  return details;
}

const plantSource = {
  searchPlantByCommonName,
  fetchPlantDetails,
};

export default plantSource;