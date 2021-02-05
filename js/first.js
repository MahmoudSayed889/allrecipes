


let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");


async function getRecipes(recipe)
{
    let apiRecipes = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${recipe}`);
    allRecipes = await apiRecipes.json();
    allRecipes = allRecipes.recipes;
    displayRecipes()
}

function displayRecipes()
{
    let cartoona = ``;

    for ( let i=0 ; i<allRecipes.length ; i++ )
    {
        cartoona += `
        <div class=" col-md-4 ">
            <div class="recipe " onclick="getRecipeDetails( '${allRecipes[i].recipe_id}' )">
                <img class="w-100 " src="${ allRecipes[i].image_url }" alt="">
                <h3 class="color-mine font-weight-bolder pt-2">${ allRecipes[i].title }</h3>
                <p>${ allRecipes[i].publisher }</p>
            </div>
        </div>
        `;
    }
    document.getElementById("recipesRow").innerHTML = cartoona;
}


async function getRecipeDetails(id)
{
    let apiRecipes = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiRecipes.json();
    recipeDetails = recipeDetails.recipe;
    displayRecipeDetails()
}


function displayRecipeDetails()
{
    let cartoona = `
            <div class="recipeDetials">
              <h2 class="color-mine font-weight-bolder py-2">${recipeDetails.title}</h2>
              <img class="w-100" src="${ recipeDetails.image_url }" alt="">
              <p>${ recipeDetails.publisher }</p>
              <ul class="fa-ul py-3">`;

              for (let x of recipeDetails.ingredients)
              {
                cartoona += `<li><i class="fas fa-utensil-spoon"></i> ${x}</li>`;
              }

              cartoona += `</ul>
            </div>`;
    
    document.getElementById("recipeDetails").innerHTML = cartoona;
}


searchBtn.addEventListener("click" , function()
{
    getRecipes(searchInput.value);
})