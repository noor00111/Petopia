// click viewMore to go main section
const adoptInfo = document.getElementById('pets-info');
const viewMoreButton = document.getElementById('btn-viewMore');
viewMoreButton.addEventListener('click', function(){
    adoptInfo.scrollIntoView({behavior : 'smooth'});
});

// countdown
// const getCountDown = (countNum = 3) =>{
//     const counterModal = document.getElementById('countModal');
//     counterModal.showModal();
//     let countDown = setInterval(() => {
//         console.log(countNum);
//         countNum--;
//         if(countNum <= 0){
//             clearInterval(countDown);
//             counterModal.close();
//         }
//     }, 1000);
// };


//create 4 categories
const fetchCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err))
};
fetchCatagories();


//show the categories
const showCategories = (categoriesPet) =>{
    const categoriesSection = document.getElementById('categories');
    categoriesPet.forEach((categoriesPetData) =>{
        // console.log(categoriesPetData);
    const createCategoriesButton = document.createElement('div');
    createCategoriesButton.innerHTML= `
    
    <button  onclick="petsCategory('${categoriesPetData.category}')" class="btn-category btn m-2 w-80 bg-white border border-indigo-200 font-extrabold text-xl">
    <img class="w-8" src="${categoriesPetData.category_icon}" />
    ${categoriesPetData.category}
    </button>`;

    categoriesSection.append(createCategoriesButton);

    });
}

// create card for all pets
const fetchPetCard = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => showPetsCards(data.pets))
    .catch((err) => console.log(err))
};
fetchPetCard();

//show the card for pets
const showPetsCards = (cardsData) =>{
    // console.log(cardsData)
    const cardsContainer = document.getElementById('cards-div');
    cardsContainer.innerHTML = "";

    cardsData.forEach((cardInfo) => {
    const {image, pet_name, breed, date_of_birth, gender, price, petId} = cardInfo;
    // console.log(cardInfo)
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="text-left border-2 p-7 text-gray-600">
    <img class="w-full h-[160px] object-cover rounded" src="${image}"/>
    <h1 class="font-bold text-xl text-black mt-4">${pet_name}</h1>

    <div class="flex flex-cols gap-2 ">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/breed-icon.png" />
     <p>Breed: ${breed !== undefined ? `${breed}` : "Not Found any Breed" }</p>
    </div>
    <div class="flex flex-cols gap-2">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/calendar-icon.png"
    <p>Birth: ${date_of_birth !== null ? `${date_of_birth}` : "Not Found Birth Date" }</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
     <p>Gender: ${gender}</p>
    </div>
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 opacity-65" src="images/dollar-icon.png"
      <p>Price: ${price}$</p>
    </div>
   <div class="mt-2">
   <button class="btn w-[50px] border-solid border-2 border-indigo-100 bg-white hover:border-3 hover:border-[#0E7A81] hover:bg-white"><img class="w-4" src="images/like.png"/></button>
   <button onclick="getCountDown()" class="btn w-[95px] text-[#0E7A81] ml-2 border-solid border-2 border-indigo-100 bg-white hover:bg-[#0E7A81]  hover:text-white font-bold">Adopt</button>
   <button onclick='detailsCard(${petId})' class="btn w-[95px] text-[#0E7A81] ml-2 border-solid border-2 border-indigo-100 bg-white hover:bg-[#0E7A81] hover:text-white font-bold">Details</button>
   </div>
    </div>`;

    cardsContainer.append(card);
    });
}



////////////get pets by category///////////

    // const petsCategory = async (category) =>{
    // fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    // .then((res) => res.json())
    // .then((data) => showPetsCards(data.data))
    // .catch((err) => console.log(err))
    // }
    const petsCategory = async (category) =>{
    const apiURL = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    showPetsCards(data.data);
    
};


// details pet's card
const detailsCard = async (cardId) =>{
    const apiURL = `https://openapi.programming-hero.com/api/peddy/pet/${cardId}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    showDetails(data.petData);
}

// show details
const showDetails = (petData)=>{
    const detailsModal = document.getElementById('modal-section');
    document.getElementById('myModal').showModal();
    detailsModal.innerHTML = `
<div class="text-left border-2 p-7 text-gray-500">
    <img class="w-full h-[160px] object-cover rounded" src="${petData.image}"/>
    <h1 class="font-bold text-xl text-black mt-4">${petData.pet_name}</h1>

<div class="flex flex-cols gap-4">
    <div class="flex flex-cols gap-2 ">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/breed-icon.png" />
     <p>Breed: ${petData.breed !== undefined ? `${petData.breed}` : "Not Found" }</p>
    </div>
    <div class="flex flex-cols gap-2">
    <img class="w-4 h-4 mt-1 opacity-65" src="images/calendar-icon.png"
    <p>Birth: ${petData.date_of_birth !== null ? `${petData.date_of_birth}` : "Not Found Birth Date" }</p>
    </div>
</div>
  <div class="flex flex-cols gap-6 mt-1">
    <div class="flex flex-cols gap-1">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
     <p>Gender: ${petData.gender}</p>
    </div>
    <div class="flex flex-cols gap-1 ">
    <img class="w-5 h-5 opacity-65" src="images/dollar-icon.png"
      <p">Price: ${petData.price}$</p>
    </div>
</div>
     <div class="flex flex-cols gap-1 mb-3">
    <img class="w-5 h-5 mt-1 opacity-65" src="images/gender-icon.png"
    <p>Vaccinated status: ${petData.vaccinated_status !== null ? `${petData.vaccinated_status}` : "No status found" }</p>
    </div>
    <hr>
    <h1 class="font-bold my-3 text-black">Details Information</h1
    <p>${petData.pet_details}</p>
    </div>
    `
}
