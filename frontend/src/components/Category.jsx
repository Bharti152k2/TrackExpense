import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../css/category.css";

function Category() {
  //! STATES
  let [expenses, setExpenses] = useState([]);
  let [category, setCategory] = useState("");
  let navigateToUpdateExpenses = useNavigate();
  console.log(expenses);
  //! TO GET INPUT FIELD VALUE
  let getCategory = ({ target: { value } }) => {
    setCategory(value);
  };
  console.log(category);
  //! TO GET EXPENSE DATA
  let getExpenses = async (filterCategory = "") => {
    try {
      let { data } = await axios.get(
        `http://localhost:3000/api/getfilteredexpense`,
        {
          params: { category: filterCategory },
        }
      );
      setExpenses(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses(category);
  }, [category]);

  //! TO UPDATE AND DELETE EXPENSE

  let updateProduct = (id) => {
    navigateToUpdateExpenses(`/updatecategory/${id}`);
  };

  let deleteProduct = async (id) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/deleteexpense/${id}`);
      getExpenses();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="category-data">
      <input
        type="text"
        placeholder="Search Category"
        value={category}
        onChange={getCategory}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.data?.map(
            ({ date, amount, category, description, _id }, index) => {
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{category}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  <td>{amount}</td>
                  <td>{description}</td>
                  <td>
                    <button
                      className="edtbtn"
                      onClick={() => {
                        updateProduct(_id);
                      }}
                    >
                      <MdEdit />
                    </button>
                  </td>

                  <td>
                    <button
                      className="dltbtn"
                      onClick={() => {
                        deleteProduct(_id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </section>
  );
}

export default Category;
