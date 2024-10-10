// click viewMore to go main section
const adoptInfo = document.getElementById('pets-info');
const viewMoreButton = document.getElementById('btn-viewMore');
viewMoreButton.addEventListener('click', function () {
    adoptInfo.scrollIntoView({ behavior: 'smooth' });
});

//sorting
const sortData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => {
            data.pets.sort((a, b) => b.price - a.price);
            showPetsCards(data.pets)
        })
        .catch((err) => console.log(err))
}

// countdown
const getCountDown = (btnId, countNum = 3) => {
    const adoptedButton = document.getElementById(`btn-adopt-${btnId}`);
    // console.log(btnId);
    document.getElementById('countModal-section').showModal();
    const counterModal = document.getElementById('countdown-modal-box');
    const countInfo = document.createElement('div');
    countInfo.innerHTML = `
    <img class="mx-auto justify-center" src="./images/congo.png"/>
    <h1 class="font-extrabold text-2xl">Congrates</h1>
    <p class="text-gray-500">Adoption Process is Start For Your Pet</p>
   <div>
    <p id="display-count" class="font-extrabold text-4xl"></p>
   </div>
    `;
    counterModal.append(countInfo);

    const counterInterval = setInterval(() => {
        // console.log(countNum);
        const displayCount = document.getElementById('display-count');
        displayCount.innerHTML = `${countNum}`
        countNum--;

        if (countNum < 0) {
            countInfo.remove();
            clearInterval(counterInterval);
            document.getElementById('countModal-section').close("btn-adopt");
            adoptedButton.disabled = true;
            adoptedButton.innerHTML = `Adopted`;
        }

    }, 1000);

};

// remove active class
const removeActiveButton = () => {
    const categoryButtons = document.getElementsByClassName('btn-pet-category');
    console.log(categoryButtons);
    for (let categoryButton of categoryButtons) {
        categoryButton.classList.remove("btn-active");
        categoryButton.classList.add("bg-white");
    }
};


//create 4 categories
const fetchCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => showCategories(data.categories))
        .catch((err) => console.log(err))
};
fetchCatagories();


//show the categories
const showCategories = (categoriesPet) => {
    const categoriesSection = document.getElementById('categories');
    categoriesPet.forEach((categoriesPetData) => {
        // console.log(categoriesPetData);
        const createCategoriesButton = document.createElement('div');
        createCategoriesButton.innerHTML = `
    
    <button id="btn-('${categoriesPetData.category}')" onclick="petsCategory('${categoriesPetData.category}')" 
    class="btn-pet-category btn m-2 w-80 font-extrabold text-xl bg-white hover:bg-[#0E7A811A]">
    <img class="w-8" src="${categoriesPetData.category_icon}" />
    ${categoriesPetData.category}
    </button>`;

        categoriesSection.append(createCategoriesButton);

    });
}

// create card for all pets
const fetchPetCard = () => {
    /////// spinner //////
    const cardsContainer = document.getElementById('cards-div');
    cardsContainer.classList.remove("grid");
    cardsContainer.innerHTML = `
   <div class="flex items-center justify-center">
   <span id="spinner" class="loading loading-bars loading-lg"></span>
   </div>
   `
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => setTimeout(() => showPetsCards(data.pets), 2000))
        .catch((err) => console.log(err))
};
fetchPetCard();

//show the card for pets
const showPetsCards = (cardsData) => {
    // console.log(cardsData)
    const cardsContainer = document.getElementById('cards-div');
    cardsContainer.innerHTML = "";

    if (cardsData.length === 0) {
        cardsContainer.classList.remove('grid');
        cardsContainer.innerHTML = `
        <div class="min-h-[400px] bg-[#13131308] flex flex-col justify-center items-center">
        <img src="images/error.webp" />
        <h1 class="font-extrabold">No Information Available</h1>
        <p class="text-gray-600">Take a look at the amazing world of birds, where every species has its own distinct beauty and habit. Although comprehensive material is not yet available, this category will soon be updated with fascinating details on different bird species, their habitats, and their unique traits.</p>
        </div> `;
        return;
    } else {
        cardsContainer.classList.add('grid');
    }

    cardsData.forEach((cardInfo) => {
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = cardInfo;
        // console.log(cardInfo)
        const card = document.createElement('div');
        card.innerHTML = `
    <div class="text-left border-2 p-7 text-gray-600">
    <img class="w-full lg:h-[160px] object-cover rounded" src="${image}"/>
    <h1 class="font-bold text-xl text-black mt-4">${pet_name}</h1>

    <div class="flex flex-cols gap-2 ">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/breed-icon.png" />
     <p>Breed: ${breed !== undefined ? `${breed}` : "Not Found any Breed"}</p>
    </div>
    <div class="flex flex-cols gap-2">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/calendar-icon.png"
    <p>Birth: ${date_of_birth !== null ? `${date_of_birth}` : "Not Found Birth Date"}</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
     <p>Gender: ${gender}</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 opacity-65" src="images/dollar-icon.png"
    <p>Price: ${price !== null ? `${price}` : "Not Found Price"}</p>
    </div>
   <div class="mt-2">
   <button onclick="getLikeButton('${image}')" class="btn w-[50px] border-solid border-2 border-indigo-100 bg-white hover:border-3 hover:border-[#0E7A81] hover:bg-white"><img class="w-4" src="images/like.png"/></button>
   <button id="btn-adopt-${petId}" onclick="getCountDown(${petId})" class="btn w-[95px] text-[#0E7A81] ml-2 border-solid border-2 border-indigo-100 bg-white hover:bg-[#0E7A81]  hover:text-white font-bold">Adopt</button>
   <button onclick='detailsCard(${petId})' class="btn w-[95px] text-[#0E7A81] ml-2 border-solid border-2 border-indigo-100 bg-white hover:bg-[#0E7A81] hover:text-white font-bold">Details</button>
   </div>
    </div>`;

        cardsContainer.append(card);
    });
}


// like-button functionality
const getLikeButton = (imgSrc) => {
    // console.log(imgSrc);
    const likePetsContainer = document.getElementById('liked-div');
    const newContainer = document.createElement('div');
    // newContainer.classList.add = "h-[10px]";
    newContainer.innerHTML = `
    <img class="border-2 p-2 rounded" src="${imgSrc}" />
    `;
    likePetsContainer.append(newContainer);
}

////////////get pets by categoryName///////////

// const petsCategory = async (categoryName) =>{
// fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
// .then((res) => res.json())
// .then((data) => showPetsCards(data.data))
// .catch((err) => console.log(err))
// }

const petsCategory = async (name) => {
    const cardsContainer = document.getElementById('cards-div');
    cardsContainer.classList.remove("grid");
    cardsContainer.innerHTML = `
       <div class="flex items-center justify-center">
       <span id="spinner" class="loading loading-bars loading-lg"></span>
       </div>
       `
    const apiURL = `https://openapi.programming-hero.com/api/peddy/category/${name}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    {
        //remove-active-button
        removeActiveButton();
        //active-button
        const btnActive = document.getElementById(`btn-('${name}')`);
        btnActive.classList.add("btn-active");
        btnActive.classList.remove("bg-white");
        // console.log(btnActive);
        setTimeout(() => showPetsCards(data.data), 2000);
        data.data.sort((a, b) => b.price - a.price);
    };
};


// details pet's card
const detailsCard = async (petId) => {
    const apiURL = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    showDetails(data.petData);
}

// show details
const showDetails = (petData) => {
    const detailsModal = document.getElementById('modal-section');
    document.getElementById('myModal').showModal();
    detailsModal.innerHTML = `
<div class="text-left border-2 p-5 text-gray-500">
    <img class="w-full object-cover rounded" src="${petData.image}"/>
    <h1 class="font-bold text-xl text-black mt-4">${petData.pet_name}</h1>

<div class="grid grid-cols-2 gap-1">

    <div class="flex gap-1">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/breed-icon.png" />
     <p>Breed: ${petData.breed !== undefined ? `${petData.breed}` : "Not Found"}</p>
    </div>

    <div class="flex  gap-1">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/calendar-icon.png"
    <p>Birth: ${petData.date_of_birth !== null ? `${petData.date_of_birth}` : "Not Found Birth Date"}</p>
    </div>

    <div class="flex gap-1">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
     <p>Gender: ${petData.gender}</p>
    </div>

    <div class="flex gap-1 ">
    <img class="w-5 h-5 opacity-65" src="images/dollar-icon.png"
    <p>Price: ${petData.price}$</p>
    </div>

    <div class="flex gap-1 mb-3">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
    <p>Vaccinated status: ${petData.vaccinated_status !== null ? `${petData.vaccinated_status}` : "No status found"}</p>
    </div>

</div>
    <hr>
    <h1 class="font-bold my-3 text-black">Details Information</h1
    <p>${petData.pet_details}</p>
    </div>
    `
}
