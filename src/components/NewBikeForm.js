import "./NewBikeForm.css";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  size: 420,
  type: "Gnarly",
  price: 66,
  name: "Hella",
};

const NewBikeForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    console.log("Handle change called");
    console.log(
      `Target name: ${e.target.name} Target value: ${e.target.value}`
    );
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  return (
    <form>
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
    </form>
  );
};

export default NewBikeForm;
