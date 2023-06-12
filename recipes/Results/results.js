const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const Mealid=params.id;
console.log(Mealid);
// const recipeResult = document.querySelector(".recipe-search-result");
const first=document.querySelector(".first");
const second=document.querySelector(".second");
const third=document.querySelector(".third")

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Mealid}`)
  .then((response)=> response.json())
  .then((data) =>{
    console.log(data);
    const firstDiv = document.createElement('div');
    firstDiv.innerHTML=`
                    <div class="image">
                        <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
                    </div>
                    <div class="content">
                        <div class="title">
                            <p>Name: ${data.meals[0].strMeal}</p>
                            <p>Category: ${data.meals[0].strCategory}</p>
                            <p>Country: ${data.meals[0].strArea}</p>
                        </div>
                        <div class="video-button">
                            <button> <span></span> Watch Video Instruction </button>
                        </div>
                    </div>
    `;

    const ingredientList = document.createElement('ul');

    for(let i=1 ; i<21 ; i++){
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[0][`strMeasure${i}`];

        if(ingredient && measure !=='' || ingredient && measure !== null){
            const li = document.createElement("li");
            li.innerHTML=`<span>${ingredient}:</span>${measure}</span>`;
            ingredientList.appendChild(li);
        }
    }


    const instruction = document.createElement('div');
    instruction.innerHTML=`
        <div class="meal-instruction">
            <p>${data.meals[0].strInstructions}</p>
        </div>
   `;
    firstDiv.classList.add("first-container");
    first.appendChild(firstDiv);
    second.appendChild(ingredientList);
    third.appendChild(instruction);



    const videoBtn = firstDiv.querySelector(".video-button");
    videoBtn.addEventListener("click" , ()=>{
        window.open(data.meals[0].strYoutube, "_blank");
    }
    );

})


