var plantAPIkey = "sk-vhKW64412e6ecbc88586"

function HTTPresponseACB(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function getPlantbyID(plantID) {
    let stats = ["id", "common_name", "scientific_name", "other_name", "cycle", "watering", "sunlight", "default_image"]
    let default_image = ["image_id", "license", "license_name", "license_url", "original_url", "regular_url", "medium_url", "small_url", "thumbnail"]
  return fetch("https://perenual.com/api/species/details/"+plantID.toString()+"?key="+plantAPIkey, {method: "GET"})
    .then(HTTPresponseACB);
}

export {getPlantbyID};