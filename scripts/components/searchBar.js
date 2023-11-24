//import getDatasFunction from "./cardRecette.js";
// import search from "./cardRecette.js";
// import articleCreateFunction from "./cardRecette.js";



//creation de la searchBar
// export const searchBarFunction = () => {
async function searchBarFunction(){

	/*
	try {
			
		let responseData = await getDatasFunction;

	} catch (error) {
			
		console.error("Erreur dans la requête :", error);
	}*/

	//récupération du container de la searchBarContainer
	const searchBarContainer = document.querySelector(".searchBarContainer");

	let  searchBar = `
   
   <input  class="searchBarContainer__input inputSearch" type="text" placeholder="Rechercher une recette, un ingredient...">
   <span class="searchBarContainer__delete"> <i class="fa-solid fa-x btnDelete"></i> </span>
   <button class="searchBarContainer__button"><i class="fa-solid fa-magnifying-glass"></i></button>

   `;

    
	searchBarContainer.innerHTML = searchBar;

	

	return searchBar;
	
}
searchBarFunction();
