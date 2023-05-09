import {addNewPlant, useAuth} from '../firebaseModel';
import AddPlantView from '../views/AddPlantView';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
//Man bör väl bara kunna lägga till en planta i taget.
/** Gick igenom er kod och modifierade lite och lyckas skriva till db med användare inloggad.
 * Men det behöver struktureras upp lite gällande logik. Nu har jag flyttat allt från App.js
 * TODO:skicka med all data som ska med, typ bild, temp, osv, samt ovan.*/
export default function AddPlantPresenter() {
  const {user} = useAuth();
  const navigate = useNavigate()
  const [addPlant, setPlant] = useState(false)
  const [personalPlantList, setPersonalPlantList] = useState();
  const addPlantToPersonalList = (plant) => {
    setPersonalPlantList(plant);
    setPlant(true)
  };
  console.log(personalPlantList);
  useEffect(() => {
    if (addPlant) {
      addNewPlant(
        user,
        personalPlantList.common_name,
        {
          sunlight: personalPlantList.sunlight,
          watering: personalPlantList.watering,
          temperatur: "10-30",
          imageURL: personalPlantList.default_image
            ? personalPlantList.default_image.regular_url
            : "",
        }
      )
        .then((p) => {
          console.log(p);
          setPersonalPlantList([]);
          setPlant(false);
          navigate("/home");
        })
        .catch((err) => console.error(err.message));
    }
  }, [personalPlantList, user]);


  return (
    <div className='addPlant'>
      <AddPlantView addPlantToPersonalList={addPlantToPersonalList}/>


    </div>
  );
}
