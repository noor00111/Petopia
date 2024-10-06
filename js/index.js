// click viewMore to go main section
const adoptInfo = document.getElementById('adopt-info');
const viewMoreButton = document.getElementById('btn-viewMore');

viewMoreButton.addEventListener('click', function(){
    adoptInfo.scrollIntoView({behavior : 'smooth'});
});