import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // This function is when the users scrolls to the bottom of the list and needs more data to be fetched
  const refetch = () => fetchData();

  // Return the data, isLoading, and refetch function as props to the component
  return { data, isLoading, refetch };
  // console.log(data)
};

export default useAppwrite;
