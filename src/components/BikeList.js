import Bike from "./Bike";


function BikeList({props}) { 
    return(
        BikeList.map((bike) =>
        <li key={bike.id} =>
        
    )
}


function BikeList(){
const bikesList = [
    {
        id: 1,
        name: "This is some data that we will work to display next class!",
        size: 50,
        price: 100,
        type: "special"
    },
    {
        id: 2,
        name: "This is some data that we will work to display next class!",
        size: 40,
        price: 20,
        type: "duplicate"
    }
];

return(
    bikesList.map((bike) => <Bike/>)
    //returns [<Bike/>, <Bike/>]
);
}
export default BikeList;