import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import BikeList from "./components/BikeList.js";
import axios from "axios";
import NewBikeForm from "./components/NewBikeForm";

// const INITIAL_BIKES = [
//   {
//     id: 1,
//     name: "Cool Bike",
//     size: 50,
//     price: 100,
//     type: "special",
//   },
//   {
//     id: 2,
//     name: "BikeMatic 3000",
//     size: 40,
//     price: 20,
//     type: "duplicate",
//   },
//   {
//     id: 3,
//     name: "My new bike!!",
//     size: 80,
//     price: 100,
//     type: "unique",
//   },
// ];

function App() {
  const [bikesList, setBikesList] = useState([]);

  const URL = "http://localhost:5000/bike";

  const fetchAllBikes = () =>{
    axios
      .get(URL)
      .then((res) => {
        //console.log(res);
        const bikesAPIResCopy = res.data.map((bike) => {
          return {
            ...bike,
          };
        });
        setBikesList(bikesAPIResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(fetchAllBikes, []); // initial get request

  // const initialCopy = INITIAL_BIKES.map((bike) => {
  //   return { ...bike };
  // });

  const updatePrice = (bikeId, updatedPrice) => {
    console.log("updatePrice called");
    const newBikesList = [];
    axios
      .patch(`${URL}/${bikeId}/${updatedPrice}`)
      .then((res) => {
        for (const bike of bikesList) {
          if (bike.id !== bikeId) {
            newBikesList.push(bike);
          } else {
            const newBike = {
              ...bike,
              price: updatedPrice,
            };
            newBikesList.push(newBike);
          }
        }
        setBikesList(newBikesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBike = (bikeId) => {
    console.log("deleteBike Called");
    axios
      .delete(`${URL}/${bikeId}`)
      .then(() => {
        const newBikesList = [];
        for (const bike of bikesList) {
          if (bike.id !== bikeId) {
            newBikesList.push(bike);
          }
        }
        setBikesList(newBikesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBike = (newBikeInfo) => {
    axios.post(URL, newBikeInfo)
    .then((response)=>{
      //fetchAllBikes();  //<- This helper function will make a .get() call to fetch all bikes and update the state variable to display them
      const newBikes = [...bikesList];
      const newBikeJSON={
        ...newBikeInfo,
        "id": response.data.id
      }
      newBikes.push(newBikeJSON);
      setBikesList(newBikes); //this method does not require a .get request; we are pushing the bike data to the bikes list and using the setter to trigger a rerender.
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  return (
    <div>
      <Navbar />
      <BikeList
        bikesList={bikesList}
        updatePrice={updatePrice}
        deleteBike={deleteBike}
      />
      <NewBikeForm addBikeCallbackFunc={addBike}/>
    </div>
  );
}

export default App;
