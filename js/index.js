// click viewMore to go main section
const adoptInfo = document.getElementById('adopt-info');
const viewMoreButton = document.getElementById('btn-viewMore');
viewMoreButton.addEventListener('click', function(){
    adoptInfo.scrollIntoView({behavior : 'smooth'});
});

//create 4 categories
const fetchCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err))
};

//show the categories
const showCategories = (categoriesPet) =>{
    const categoriesSection = document.getElementById('categories');
    categoriesPet.forEach((categoriesPetData) =>{
        // console.log(categoriesPetData);
    const createCategoriesButton = document.createElement('div');
    createCategoriesButton.innerHTML= `
    
    <button class="btn-category btn m-2 w-80 bg-white border border-indigo-200 font-extrabold text-xl">
    <img class="w-8" src="${categoriesPetData.category_icon}" />
    ${categoriesPetData.category}
    </button>`;
    categoriesSection.append(createCategoriesButton);

    });
}
fetchCatagories();

// create card for all pets
const fetchPetCard = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => showPetsCards(data.pets))
    .catch((err) => console.log(err))
};

//show the card for pets
const showPetsCards = (cardsData) =>{
    const cardsContainer = document.getElementById('cards-div');
    cardsData.forEach((cardInfo) => {
    const {image, pet_name, breed, date_of_birth, gender, price, pet_details} = cardInfo;
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="text-left border-2 p-7 text-gray-600">
    <img class="w-full h-[160px] object-cover rounded" src="${image}"/>
    <h1 class="font-bold text-xl text-black mt-4">${pet_name}</h1>

    <div class="flex flex-cols gap-2 ">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/breed-icon.png" />
    <p>Breed: ${breed}</p>
    </div>
    <div class="flex flex-cols gap-2">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/calendar-icon.png"
    <p>Birth: ${date_of_birth}</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
     <p>Gender: ${gender}</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 opacity-65" src="images/dollar-icon.png"
      <p>Price: ${price}$</p>
    </div>
    </div>`;

    cardsContainer.append(card);
    });
}

fetchPetCard();