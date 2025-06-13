document.addEventListener('DOMContentLoaded', function () {
  loadFunction(); // Show all meals initially

  document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    const inputValue = document.getElementById('input').value.trim();
    fetchMeal(inputValue); // Search meals based on user input
  });
});

// Load meals initially
async function loadFunction() {
  fetchMeal(""); 
}

// Fetch meals 
async function fetchMeal(query) {
  const result = document.getElementById("insertHere");
  const noMealMsg = document.getElementById("noMeal");
  result.innerHTML = "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const response = await fetch(url);
  const data = await response.json();

  const meals = data.meals;
  if (!meals) {
    noMealMsg.classList.remove("hidden");
    return;
  }

  noMealMsg.classList.add("hidden");

  meals.forEach(meal => {
    result.innerHTML += `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded h-[200px] w-full object-cover" />
        <div class="p-3 relative">
          <h2 class="font-bold text-gray-800 mb-2 h-4">${meal.strMeal}</h2>
          <p class="text-gray-600 text-xs h-20">${meal.strInstructions.slice(0, 100)}...</p>
          <button 
            class="btn bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold py-2 px-3 rounded mt-2" 
            onclick="loadMealDetails('${meal.idMeal}')">
            View Recipe
          </button>
        </div>
      </div>`;
  });
}




