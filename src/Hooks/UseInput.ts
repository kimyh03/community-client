import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    const {
      target: { value: v }
    } = event;
    setValue(v);
  };

  return { value, onChange };
};

export default useInput;
