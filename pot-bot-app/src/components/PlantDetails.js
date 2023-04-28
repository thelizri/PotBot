import React, { useState, useEffect } from 'react';
import plantSource from '../services/plantSource';

const PlantDetails = ({ commonName }) => {
  const [plantDetails, setPlantDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const plantId = await plantSource.searchPlantByCommonName(commonName);
      if (plantId) {
        const details = await plantSource.fetchPlantDetails(plantId);
        setPlantDetails(details);
      } else {
        setPlantDetails(null);
      }
    })();
  }, [commonName]);

  return (
    <div>
      {plantDetails ? (
        <pre>{JSON.stringify(plantDetails, null, 2)}</pre>
      ) : (
        <p>No plant found with common name: {commonName}</p>
      )}
    </div>
  );
};

export default PlantDetails;
