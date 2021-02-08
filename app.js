let mealList = document.getElementById('meal');
// getMealList api
const getMealList = () => {
    const inputValue = document.getElementById('inputValue').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => displayMeal(data))
}

// getMealList itame
const displayMeal = (meals) => {
    let html = "";
    if (meals.meals) {
        meals.meals.forEach(meal => {
            html += `
                     <div onclick="displayRecipeItems(${meal.idMeal})" class="col-md-3 ">
                      <div class="meal-item"  >
                          <div class="meal-img">
                              <img class="img-fluid" src="${meal.strMealThumb}" alt="burger"  >
                          </div>
                          <div class="meal-name">
                              <h5>${meal.strMeal}</h5>
                          </div>
                      </div>
                     </div>
                 `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry! we don't find any item's";
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
};

const displayRecipeItems = (event) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealInfo(data))
}

const mealInfo = (meal) => {
    let displayInfo = `
             
             <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="...">
             <div class="card-body">
               <h5 class="card-title">${meal.meals[0].strMeal}</h5>
               <p>Ingredients</p>
                <ul>
                    <li>${meal.meals[0].strIngredient1}</li>
                    <li>${meal.meals[0].strIngredient2}</li>
                    <li>${meal.meals[0].strIngredient3}</li>
                    <li>${meal.meals[0].strIngredient4}</li>
                    <li>${meal.meals[0].strIngredient5}</li>
                    <li>${meal.meals[0].strIngredient6}</li>
                </ul>
             </div>
          
            `

    document.getElementById('meal-details').innerHTML = displayInfo;
}



