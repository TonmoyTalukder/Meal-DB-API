const searchBtn = document.getElementById("button-search");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if(event.key == 'Enter'){
        searchBtn.click();
    }
});

document.getElementById('error-message').style.display = 'none';
document.getElementById('empty-message').style.display = 'none';
window.onload = function(){ document.getElementById("loading").style.display = "none" }

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);

    // clear data
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';
    document.getElementById('empty-message').style.display = 'none';

    if(searchText == ''){
        console.log("Empty");
        document.getElementById('empty-message').style.display = 'block';
        document.getElementById('search-result').style.display = 'none';

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResultEmpty(data.meals))
        .catch(error => displayError(error))
    } else{
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        .catch(error => displayError(error));
        //document.getElementById('search-result').style.display = 'block';
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(meals == null){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card h-100 mx-auto border border-danger">
                <div class="card-body">
                    <p class="card-text text-center text-danger">Sorry this item is not available!! Search another one please.</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    } else{
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

const displaySearchResultEmpty = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';


        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card h-100 mx-auto border border-danger">
                <div class="card-body">
                    <p class="card-text text-center text-danger">Empty Search! Write something to search!</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    
}

const loadMealDetail = mealId => {
    //console.log(mealId);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMealDetail(data.meals[0]));
}
//loadMealDetail();
const displayMealDetail = meal =>{
    console.log("Printing",meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img width="400px" height="400px" src="${meal.strMealThumb}" class="card-img-top bg-light" alt="...">
        <div class="card-body bg-light">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}</p> <!--.slice(0, 550)-->
            <a href="${meal.strYoutube}" class="btn btn-danger d-flex justify-content-center mx-5">YouTube</a>
        </div>
    `;
    mealDetails.appendChild(div);
}