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
    //function för att extrahera den data vi behöver
    if (addPlant) {
      addNewPlant(user, personalPlantList.common_name, {
        image: personalPlantList.default_image.original_url,
        sunlight: personalPlantList.sunlight,
        watering: personalPlantList.watering,
        temperature: '15'
      }).then((p) => {
        console.log(p)
        setPersonalPlantList([])
        setPlant(false)
        navigate("/home")

      }).catch(err => console.error(err.message))
    }
  }, [personalPlantList, user]);


  return (
    <div className='addPlant'>
      <AddPlantView addPlantToPersonalList={addPlantToPersonalList}/>


    </div>
  );
}
