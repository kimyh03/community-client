import { useState } from "react";

const useButton = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onClick = (event) => {
    const {
      target: { value: item }
    } = event;
    setValue(item);
  };

  return { value, onClick };
};

export default useButton;
