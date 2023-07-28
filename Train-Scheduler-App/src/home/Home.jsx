import { useState, useEffect } from "react";
import { authorize } from "./home.conroller";
import { Link } from "react-router-dom";

const Home = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        const data = await authorize();
        token = data.access_token;
        localStorage.setItem("token", token);
      }
      const response = await fetch("http://20.244.56.144/train/trains", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();

      if (data.message) {
        localStorage.removeItem("token");
        fetchTrains();
      } else {
        setTrains(data.sort((a, b) => a.price.sleeper - b.price.sleeper));
      }
    };

    fetchTrains();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <h2 className="my-8 text-4xl text-center">Train List</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No.
              </th>
              <th scope="col" className="px-6 py-3">
                Train name
              </th>
              <th scope="col" className="px-6 py-3">
                Train Number
              </th>
              <th scope="col" className="px-6 py-3">
                Departure Time
              </th>
              <th scope="col" className="px-6 py-3">
                Sleeper
              </th>
              <th scope="col" className="px-6 py-3">
                AC
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trains?.map((train, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {train.trainName}
                  </td>
                  <td className="px-6 py-4">{train.trainNumber}</td>
                  <td className="px-6 py-4">
                    {train.departureTime.Hours} : {train.departureTime.Minutes}{" "}
                    : {train.departureTime.Seconds}
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-4">Price : {train.price.sleeper}</span>
                    <span>Seats : {train.seatsAvailable.sleeper}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-4">Price : {train.price.AC}</span>
                    <span>Seats : {train.seatsAvailable.AC}</span>
                  </td>
                  <td>
                    <Link
                      to={`/train-detail/ + ${train.trainNumber}`}
                      className="py-2 px-8 bg-slate-100 rounded shadow text-black"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
