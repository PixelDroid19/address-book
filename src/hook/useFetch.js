import React, { useState } from "react";

const useFetch = async ({ endPoint, options } = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  try {
    const res = await fetch(endPoint, options);
    console.log("res", res);
  } catch (error) {
  } finally {
    setIsLoading(false);
  }

  return { isLoading };
};

export default useFetch;
