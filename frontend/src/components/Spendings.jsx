import axios from "axios";
import React, { useState } from "react";
import "../css/spendings.css";

function Spendings() {
  //! STATES

  let [totalSpent, setTotalSpent] = useState(0);
  let [categorySpent, setCategorySpent] = useState([]);
  let [period, setPeriod] = useState("");

  //! FUNCTION TO GET API DATA
  let getSummary = async (period) => {
    try {
      setPeriod(period);

      let { data } = await axios.get(`http://localhost:3000/api/spendings`, {
        params: { period: period },
      });
      console.log(data);
      setTotalSpent(data.data.totalSpent);
      setCategorySpent(data.data.categorizedData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="summary-view">
        <div className="head">
          <h1>Summary view</h1>
          <h2>Total Spent Rs. {totalSpent}</h2>
        </div>

        <div className="spendings">
          <div className="btns">
            <button
              onClick={() => {
                getSummary("daily");
              }}
            >
              Daily
            </button>
            <button
              onClick={() => {
                getSummary("weekly");
              }}
            >
              Weekly
            </button>
            <button
              onClick={() => {
                getSummary("monthly");
              }}
            >
              Monthly
            </button>
          </div>
          <div className="category-spent">
            <h3>Spendings by category</h3>
            <ul type="none">
              {categorySpent.map(({ _id, categorizedSpent }) => {
                return (
                  <li key={_id}>
                    <h4>{_id}</h4> : {categorizedSpent}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Spendings;
