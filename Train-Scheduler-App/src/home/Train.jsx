import { useEffect, useState } from "react";
import { authorize } from "./home.conroller";

const Train = () => {
  const [train, setTrain] = useState();

  useEffect(() => {
    const fetchTrains = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        const data = await authorize();
        token = data.access_token;
        localStorage.setItem("token", token);
      }
      const response = await fetch(
        `http://20.244.56.144/train/trains/` + train.trainNumber,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();

      if (data.message) {
        localStorage.removeItem("token");
        fetchTrains();
      } else {
        setTrain(data);
      }
    };

    fetchTrains();
  }, []);
  return <div>{train}</div>;
};

export default Train;
