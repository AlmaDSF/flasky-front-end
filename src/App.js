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
  useEffect(() => {
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
  }, []);

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

  return (
    <div>
      <Navbar />
      <BikeList
        bikesList={bikesList}
        updatePrice={updatePrice}
        deleteBike={deleteBike}
      />
      <NewBikeForm />
    </div>
  );
}

export default App;
