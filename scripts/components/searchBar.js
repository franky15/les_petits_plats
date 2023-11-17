


//creation de la searchBar
export const searchBarFunction = () => {

	//récupération du container de la searchBarContainer
	const searchBarContainer = document.querySelector(".searchBarContainer");

	let  searchBar = `
   
   <input  class="searchBarContainer__input inputSearch" type="text" placeholder="Rechercher une recette, un ingredient...">
   <span class="searchBarContainer__delete"> <i class="fa-solid fa-x btnDelete"></i> </span>
   <button class="searchBarContainer__button"><i class="fa-solid fa-magnifying-glass"></i></button>

   `;

    
	searchBarContainer.innerHTML = searchBar;

	

	return searchBar;
	
};
searchBarFunction();
