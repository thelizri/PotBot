// pot-bot-app\src\presenters\AddPlantPresenter.js

import { useAuth } from '../firebaseModel';
import AddPlantView from '../views/AddPlantView';

export default function AddPlantPresenter({ addPlantToPersonalList }) {
  const { user } = useAuth();
  const plant = '';

  // add function for scrolling plants or carousel images of plants
  // add function for text search for a plant
  return (
    <div className='addPlant'>
      <AddPlantView addPlantToPersonalList={addPlantToPersonalList} />

      {/* add functions here */}
    </div>
  );
}
