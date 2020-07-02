import { useState } from "react";

const useButton = (defaultValue) => {
  const [sortTerm, setSortTerm] = useState(defaultValue);

  const onClick = (event) => {
    const {
      target: { value }
    } = event;
    setSortTerm(value);
  };

  return { sortTerm, onClick };
};

export default useButton;
