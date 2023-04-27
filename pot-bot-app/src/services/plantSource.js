const apiKey = 'vhKW64412e6ecbc88586';
const searchUrl = `https://perenual.com/api/species/search?query={{QUERY}}&key=${apiKey}`;
const detailsUrlTemplate = `https://perenual.com/api/species/details/{{ID}}?key=${apiKey}`;

async function searchPlantByName(name) {
  const searchResponse = await fetch(searchUrl.replace('{{QUERY}}', name));
  const searchResults = await searchResponse.json();

  if (searchResults.total > 0) {
    return searchResults.data;
  } else {
    return [];
  }
}

async function searchPlantByCommonName(commonName) {
  const searchResponse = await fetch(searchUrl.replace('{{QUERY}}', commonName));
  const searchResults = await searchResponse.json();

  if (searchResults.total > 0) {
    const plantId = searchResults.data[0].id;
    return plantId;
  } else {
    return null;
  }
}

async function fetchPlantDetails(plantId) {
  const detailsUrl = detailsUrlTemplate.replace('{{ID}}', plantId);
  const detailsResponse = await fetch(detailsUrl);
  const details = await detailsResponse.json();
  return details;
}

const plantSource = {
  searchPlantByName,
  searchPlantByCommonName,
  fetchPlantDetails
};

export default plantSource;
