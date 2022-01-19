import { useEffect, useState } from "react";

export const useInfinity = async (url) => {
  const [res, setRes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const controller = new AbortController();
  const { signal } = controller;

  setRes(null);
  setIsPending(true);
  setError(null);

  try {
    const response = await fetch(url, {
      signal,
    });
    if (!response.ok) {
      throw new Error("Could not fetch the data.");
    }

    const result = await response.json();
    setRes(result);
    setIsPending(false);
    setError(null);
  } catch (error) {
    setIsPending(false);
    if (error.name === "AbortError") {
      console.log(error.message);
      setError(error.message);
    } else {
      setError(error.message);
    }
  }

  return { res, isPending, error };
};
