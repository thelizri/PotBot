import {useAuth} from "../firebaseModel";
import AddPlantView from "../views/AddPlantView";

export default function AddPlantPresenter() {
  const {user} = useAuth();
  const plant = '';

  //add function for scrolling plants or carousel images of plants
  //add function for text search for a plant
  return (
    <div className="addPlant">
      <AddPlantView />

      {/*add functions here*/}


    </div>

  );

export default function AddPlantPresenter(){
    return (
        <AddPlantView/>
    )
}
