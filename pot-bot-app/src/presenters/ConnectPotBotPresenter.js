import React, {useEffect, useState} from "react";
import {connectPotBot, db, useAuth} from "../firebaseModel";
import ConnectPotBotView from "../views/ConnectPotBotView";
import {useLocation} from "react-router-dom";
import {onChildChanged, ref} from "firebase/database";

export default function ConnectPotBotPresenter() {
  const {user} = useAuth()
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productID, setProductID] = useState('');
  let {state} = useLocation()

  useEffect(() => {
    if (loading === true && productID) {
      connectPotBot(productID, {uid: user.uid, plant: state.plantName}).then(() => {
        connectionListener(user, state.plantName)
      })
    }
  }, [user, productID, state, loading])

  function connectButtonHandler() {
    setLoading(true)
  }

  function connectionListener(user, plantName) {
    const dbRef = ref(db, `user/${user.uid}/plants/${plantName}`)
    return onChildChanged(dbRef, (snapshot) => {
      console.log(snapshot.val())
      setConnected(true)
    }, {
      onlyOnce: true
    })
  }

  return (
    <div>
      {!connected && !loading && <ConnectPotBotView loading={loading} productID={productID} setProductID={setProductID}
                                                    handleSubmit={connectButtonHandler}/>}
      {loading && connected && <ConnectPotBotView loading={loading}/>}

    </div>
  )

}
