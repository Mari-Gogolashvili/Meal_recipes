const mealInput = document.querySelector("#meal-input"),
      searchBtn = document.querySelector("#search-btn"),
      result = document.querySelector(".search-result"),
      form = document.forms.search,
      searchResultsArray = [];


searchBtn.addEventListener("click", handleSearch);
form.addEventListener("submit", handleSearch);

function handleSearch(event){
  event.preventDefault();
  searchResultsArray.forEach((entry)=> entry.remove());
  const mealName = mealInput.value.trim();
  console.log(mealName);
  
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchResult(data.meals);
    })
    .catch(()=>{
      if (mealName.length === 0) {
          result.innerHTML = `
          <div class= "error">
              <p>4 <i class="fa-regular fa-circle-question"></i> 4</p>
              <p>Page Not Found!</p>
              <p>The input field can't be empty</p>
          </div>
          `;
      } else {
          result.innerHTML = `
          <div class= "error">
              <p>4 <i class="fa-regular fa-circle-question"></i> 4</p>
              <p>Page Not Found!</p>
              <p>Please enter a valid name</p>
          </div>
          `;

      }
  })

}


function searchResult(meals){
  result.innerHTML="";

  meals.forEach((meal) =>{
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card-container">
        <div class="card-image">
          <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="card-content">
          <h1>${meal.strMeal}</h1>
          <button class="view-btn"><a href="#">View recipe <i class="fa-solid fa-arrow-right-long"></i></a></button>
        </div>
      </div>
    `;

    result.appendChild(div);
    searchResultsArray.push(div);


    const viewBtn=div.querySelector(".view-btn");
    viewBtn.addEventListener("click" , () => viewRecipe(meal.idMeal));
  })


}


function viewRecipe(id){    
    window.location.href = `Results/index.html?id=${id}`;
}



