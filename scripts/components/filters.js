
//récupération de la fonction
import getDatas from "../manageDatas.js";

//creation de la du filtre
async  function createFilterFunction(){

	//récupération des données 
	let listdatas;

	try {
        
		//car getDatas retourne responseData qui est une liste
		let responseData = await getDatas;
		
		//je converti ensuite la réponse pendant un certain temps en json
		let responseDataJson = await responseData;

		listdatas = responseDataJson;
	
	} catch (error) {

		console.error("Erreur dans la requête :", error);
	}

	console.log(listdatas);

	let listFilters = [ "ingredients", "appareils", "ustensiles" ];
    
	

	/********************* gestion des filtres ******************************* */

	//récupération du container de la containerFilter
	const filtersContainer = document.querySelector(".filters__container");

	const createFilterItemFunction =(listTitleFiltersCurrent) => {

		let  filter = `
            
            <div class="filters__container--filter">

                <button class="recettesBtn" >
            
                    <span class="titleBtnMain ${listTitleFiltersCurrent} " > ${listTitleFiltersCurrent} </span>
                    <span class="arrow arrowDown" > <i class="fa-solid fa-chevron-down"></i> </span>
                    <span class="arrow arrowUp" style="display: none;" > <i class="fa-solid fa-chevron-up"></i> </span>
                
                </button>

                <ul  class="listeUlContainer" id="${listTitleFiltersCurrent}" style="display: block;" >
                        
                    <li class="optionBar"  >  
                    
                        <input value=${ "value" } class="optionBar__input ${"Ingredients"} " type="text" >
                        <span class="optionBar__delete"> <i class="fa-solid fa-x btnDelete"></i> </span>
                        <span class="optionBar__icon"> <i class="fa-solid fa-magnifying-glass"></i> </span>

                    </li>
                    <li class="optionLi ${ "Ingredients" }" style="display: block;" role='option'>  
                    
                        <button  value= ${"Ingredients"} class="${ "Ingredients"+"Btn" }">

                            <span class="${"Ingredients"}">${"Ingredients"}</span>
                        
                        </button>
                        
                    </li>
                    
                   
                </ul>

            </div>

        `;

		filtersContainer.innerHTML += filter;
		// const listeUlContainer = document.querySelector(".listeUlContainer");
		// listeUlContainer.innerHTML = filter;
	};
	//createFilterItemFunction();

	//liste des titres des filtres
	let listTitleFilters =[ "Ingredients", "Appareils", "Ustensiles" ];
	
	

	//fonction d'itération du filtre
	const iterationFilter = () => {

		for(let i=0; i< listTitleFilters.length; i++){

			let listTitleFiltersCurrent = listTitleFilters[i];

			createFilterItemFunction(listTitleFiltersCurrent);

		}



	};
	iterationFilter();

	/********************* gestion des tags ******************************* */
	
	const keywordsTag = document.querySelector(".keywordsTag");
	//fonction de création du tag de la barre de recherche
	const keywordsTagFunction = () => {

		const keywordsTagBtn = `

            <div class="${"keyword"} keywordContainer" >

                <p class="${"keyword"} keywordContainer__btn">

                    ${"keyword text"}
                            
                </p>
                <span class="keywordContainer__delete"> <i class="fa-solid fa-x btnDeleteTagSearch" data-keyWord=${"keyword text"} ></i> </span>
            
            </div>
        
        `;
		keywordsTag.innerHTML= keywordsTagBtn;


	};
	keywordsTagFunction();


    
	const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
	//console.log(keywordsTaglistFilter);
    
	//fonction de création des tags des filtres
	const keywordsTagFilterFunction = () => {

		const keywordsTagFilter = `

            <li class="${"keyword"} keywordContainer" >

                <p   class="${"keyword"} keywordContainer__btn">

                    ${"keyword text des listes"}
                            
                </p>
                <span class="keywordContainer__delete"> <i class="fa-solid fa-circle-xmark btnDeleteTag" data-keyWord=${"keyword text"} ></i> </span>
            
            </li>
            <li class="${"keyword"} keywordContainer" >

                <p   class="${"keyword"} keywordContainer__btn">

                    ${"keyword text des listes"}
                            
                </p>
                <span class="keywordContainer__delete"> <i class="fa-solid fa-circle-xmark btnDeleteTag" data-keyWord=${"keyword text"}></i> </span>
            
            </li>
        
        `;
		keywordsTaglistFilter.innerHTML= keywordsTagFilter;


	};
	keywordsTagFilterFunction();


	//valeurs du premier bouton
	let listNameFilters = [ "ingredients", "appareils", "ustencils"];
	
	/*
	const labelClickData = () => {

		//récupération du label
		const labelRecettes = document.querySelector(".labelRecettes");
        
		//récupération des icon flèche
		const arrowUpp = document.querySelector(".arrowUpp");
		const arrowDown = document.querySelector(".arrowDown");

		labelRecettes.addEventListener( "click", () => {

			arrowUpp.style.display = "block"; // Afficher arrowUpp
			arrowDown.style.display = "none"; // Masquer arrowDown
            
			console.log("click sur le label effectué");

		});
    
	};
	labelClickData();
    */
	
}
createFilterFunction();
