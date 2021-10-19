import { useState, useCallback } from "react";
import MySpinner from "../components/MySpinner";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState({ message: "" });

  const sendRequest = useCallback(async (cb, ...params) => {
    setLoading(true);
    setRequestError({ message: "" });
    try {
      const result = await cb(...params);
      setData(result.data);
    } catch (e) {
      setRequestError(e.response.data || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    loading,
    requestError,
    data,
    MySpinner,
    sendRequest,
  };
};

export default useFetch;
