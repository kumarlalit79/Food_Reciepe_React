import React, { useState } from "react";
import { useEffect } from "react";
import "./Meal.css";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("Indian");

  const [inputData,setInputData] = useState("")

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();

      console.log(data);

      setMealData(data.meals);
    };
    fetchDataFromApi();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault()

    const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
      );
      const data = await api.json();
      console.log(data)
      setMealData(data.meals);
      setInputData("")
  }

  return (
    <>
      {/* PAGE HEADER */}
      <header className="meal-header">
        <h1 className="meal-logo">🍽️ Meal Explorer</h1>
        <p className="meal-subtitle">Explore delicious meals from around the world</p>
      </header>

      {/* CATEGORY BUTTONS */}
      <div className="text-center mt-4 mb-4">
        <div className="btn-group flex-wrap meal-buttons">
          <button onClick={() => setArea("Indian")} className={`btn btn-lg ${area === "Indian" ? "btn-selected" : "btn-outline-light"}`}>India</button>
          <button onClick={() => setArea("Canadian")} className={`btn btn-lg ${area === "Canadian" ? "btn-selected" : "btn-outline-primary"}`}>Canadian</button>
          <button onClick={() => setArea("American")} className={`btn btn-lg ${area === "American" ? "btn-selected" : "btn-outline-warning"}`}>American</button>
          <button onClick={() => setArea("British")} className={`btn btn-lg ${area === "British" ? "btn-selected" : "btn-outline-danger"}`}>British</button>
          <button onClick={() => setArea("Russian")} className={`btn btn-lg ${area === "Russian" ? "btn-selected" : "btn-outline-success"}`}>Russian</button>
        </div>
      </div>

      <form onSubmit={submitHandler} className="text-center"> 
        <input type="text" className="form-control w-50 mx-auto mb-3" placeholder="Search meal" onChange={(e) => setInputData(e.target.value)} />
      </form>

      {/* SELECTED AREA TITLE */}
      <h2 className="selected-area">Meals from <span>{area}</span></h2>

      {/* MEAL GRID */}
      <div className="meal-container">
        {mealData.map((data) => (
          <div key={data.idMeal} className="meal-card">
            <img
              src={data.strMealThumb}
              alt={data.strMeal}
              className="meal-img"
            />
            <h3 className="meal-title">{data.strMeal}</h3>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="meal-footer">
        Made with ❤️ by Lalit | Powered by TheMealDB
      </footer>
    </>
  );
};

export default Meal;
