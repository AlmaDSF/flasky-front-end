import "./NewBikeForm.css";
import PropTypes from "prop-types";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  size: 420,
  type: "Gnarly",
  price: 66,
  name: "Hella",
};

const NewBikeForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    //OPTIONAL- type conversion from strings to ints below; works without it.
    let datafield = e.target.value;
    if(e.target.name==="size" || e.target.name==="price"){
      datafield = parseInt(datafield);
    }
    const newFormData = {
      ...formData,
      [e.target.name]: datafield,
    };
    //console.log(newFormData);
    setFormData(newFormData);
  };

  const handleNewBikeSubmit = (e) =>{
    e.preventDefault();
    //formData contains the new Bike info that we want to create
    props.addBikeCallbackFunc(formData);
  }

  return (
    <form onSubmit={handleNewBikeSubmit}>
      <label htmlFor="size">Bike Size</label>
      <input
        type="number"
        id="size"
        name="size"
        value={formData.size}
        onChange={handleChange}
      />

      <label htmlFor="name">Bike Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="type">Bike Type</label>
      <input
        type="text"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />

      <label htmlFor="price">Bike Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
    
      <input type="submit" value="Add bike"/>
    </form>
  );
};
NewBikeForm.propTypes = {
  addBikeCallbackFunc: PropTypes.func.isRequired
};
export default NewBikeForm;
