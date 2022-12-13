import "./Bike.css";

function Bike(){
    const myBike = {
        id: 1,
        name: "My bike to be rendered",
        size: 50,
        price: 100,
        type: "special"
    };

    return(
        <div>
            <h2 className="bike__name">{myBike.name}</h2>
            <ul>
                <li>{myBike.id}</li>
                <li>{myBike.size}</li>
                <li>{myBike.price}</li>
                <li>{myBike.type}</li>
            </ul>
            
        </div>
    );
}

export default Bike;