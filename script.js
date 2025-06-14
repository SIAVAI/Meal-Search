const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const mealsDiv = document.getElementById("meals");
const mealDetailsDiv = document.getElementById("mealDetails");

const showMealDetails = (meal) => {
  mealDetailsDiv.style.display = "block";
  mealDetailsDiv.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <h2>${meal.strMeal}</h2>
    <p><strong>Category:</strong> ${meal.strCategory || "N/A"}</p>
    <p><strong>Area:</strong> ${meal.strArea || "N/A"}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions?.slice(
      0,
      300
    )}...</p>
  `;
};

const searchMeals = async () => {
  const query = searchInput.value.trim();
  mealsDiv.innerHTML = "";
  mealDetailsDiv.style.display = "none";

  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    : ``;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.meals) {
      mealsDiv.innerHTML = "<p>No meal found.</p>";
      return;
    }

    data.meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");
      mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
      `;
      mealDiv.addEventListener("click", () => showMealDetails(meal));
      mealsDiv.appendChild(mealDiv);
    });
  } catch (error) {
    mealsDiv.innerHTML = "<p>Error fetching meals.</p>";
    console.error("Fetch error:", error);
  }
};

searchBtn.addEventListener("click", searchMeals);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeals();
});
