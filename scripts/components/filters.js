
//récupération de la fonction
import getDatas from "../manageDatas.js";

//creation de la du filtre
async  function createFilterFunction(){

	/*****récupération de la liste du résultat de recherche du localstorage **/
		// Récupération de listRicepsFilter la chaîne JSON du localStorage
		let listRicepsFilterJSON = localStorage.getItem("listRicepsFilter");
	
		// Convertion de la chaîne listRicepsFilterJSON en liste JavaScript
		let listRicepsFilter = JSON.parse(listRicepsFilterJSON);
	
		console.log("***listRicepsFilter dans filters");
		console.log(listRicepsFilter);
	

	//récupération des données 
	
	let listAllData;
	let ustencilsListFilter;
	let ingredientsListFilter;
	let applianceListFilter;


	try {
        
		//car getDatas retourne responseData qui est une liste
		let responseData = await getDatas;
		
		//je converti ensuite la réponse pendant un certain temps en json
		let responseDataJson = await responseData;

		//récupération des listes utiles
		listAllData = responseDataJson[2];
		ustencilsListFilter = responseDataJson[3];
		ingredientsListFilter = responseDataJson[4];
		applianceListFilter = responseDataJson[5];
	
	} catch (error) {

		console.error("Erreur dans la requête :", error);
	}

	console.log("*** listAllData");
	console.log(listAllData);
	console.log("*** ustencilsListFilter");
	console.log(ustencilsListFilter);
	console.log("*** ingredientsListFilter");
	console.log(ingredientsListFilter);
	console.log("*** applianceListFilter");
	console.log(applianceListFilter);

	//let listFilters = [ "ingredients", "appareils", "ustensiles" ];
    
	

	/********************* gestion des filtres ******************************* */

	//récupération du container de la containerFilter
	// const filtersContainer = document.querySelector(".filters__container");btnArrow
	const btnArrow = document.querySelector(".btnArrow");

	const createFilterItemFunction =(listTitleFiltersCurrent) => {

		let  filter = `
            
		<div class="filterForm">

            <div class="filters__container--filter">

                <button class="recettesBtn" >
            
                    <span class="titleBtnMain ${listTitleFiltersCurrent}" > ${listTitleFiltersCurrent} </span>
                    <span class="arrow arrowDown" > <i class="fa-solid fa-chevron-down"></i> </span>
                    <span class="arrow arrowUp" style="display: none;" > <i class="fa-solid fa-chevron-up"></i> </span>
                
                </button>

				<!--
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
				-->

            </div>

			</div>

        `;

		//filtersContainer.innerHTML += filter;btnArrow

		btnArrow.innerHTML += filter;
		// const listeUlContainer = document.querySelector(".listeUlContainer");
		// listeUlContainer.innerHTML = filter;
	};
	//createFilterItemFunction();

	//liste des titres des boutons
	let listTitleFilters =[ "Ingredients", "Appareils", "Ustensiles" ];
	
	

	//fonction d'itération du filtre
	const iterationFilter = () => {

		for(let i=0; i< listTitleFilters.length; i++){

			let listTitleFiltersCurrent = listTitleFilters[i];
			
			
			createFilterItemFunction(listTitleFiltersCurrent);

		}



	};
	//iterationFilter();


	//insersion des nouvelles classes dans les boutons
	const listBtnRecette = document.getElementsByClassName("recettesBtn");
	console.log(listBtnRecette);

	for(let b=0; b<listBtnRecette.length; b++){

		let listBtnRecetteCurrent = listBtnRecette[b];

		//récupération de la valeur du premier enfant
		let firstChildBtn = listBtnRecetteCurrent.firstElementChild.textContent;

		for(let i=0; i< listTitleFilters.length; i++){

			let listTitleFiltersCurrent = listTitleFilters[i];
			
			if(firstChildBtn.trim() === listTitleFiltersCurrent){

				listBtnRecetteCurrent.classList.add(listTitleFiltersCurrent);
			}
			
			
		}
		
	}

	

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
	//keywordsTagFunction();


    
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
	//keywordsTagFilterFunction();


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
