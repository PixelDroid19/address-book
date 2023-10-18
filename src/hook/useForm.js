import { useState } from "react";

const useForm = ({ initialState } = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { values, handleInputChange, setValues };
};

export default useForm;
