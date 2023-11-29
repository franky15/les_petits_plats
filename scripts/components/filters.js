
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


	//liste des titres des boutons
	let listTitleFilters =[ "Ingredients", "Appareils", "Ustensiles" ];

	/********************* gestion des filtres ******************************* */

	//récupération du container de la containerFilter
	// const filtersContainer = document.querySelector(".filters__container");btnArrow
	const btnArrow = document.querySelector(".btnArrow");

	const createFilterItemFunction =(listTitleFiltersCurrent) => {

		let  filter = `
            
		<div class="filterForm">

            <div class="filters__container--filter">

				<div class="btnContainer" >

					<button class="recettesBtn" >
				
						<span class="titleBtnMain ${listTitleFiltersCurrent}" > ${listTitleFiltersCurrent} </span>
						<span class="arrow arrowDown${listTitleFiltersCurrent} arrowDown"  style="display: block;" > <i class="fa-solid fa-chevron-down"></i> </span>
						<span class="arrow arrowUp${listTitleFiltersCurrent} arrowUp" style="display: none;" > <i class="fa-solid fa-chevron-up"></i> </span>
					
					</button>

				</div>
				
				<div  class="listeUlContainer filterForm2" id="${listTitleFiltersCurrent}" style="display: none;">

					<div class="optionBar"  >  
						
							<input  class="optionBar__input ${"input"+listTitleFiltersCurrent}" type="text" >
							<span class="optionBar__delete"> <i class="fa-solid fa-x btnDelete"></i> </span>
							<span class="optionBar__icon"> <i class="fa-solid fa-magnifying-glass"></i> </span>

					</div>
					<ul    class="listeUlContainer filterForm2Container" id="${listTitleFiltersCurrent+"Container"}" >
							
						<!--
						<li class="optionBar"  >  
						
							<input placeHolder=${ "value2" } class="optionBar__input ${"Ingredients"} " type="text" >
							<span class="optionBar__delete"> <i class="fa-solid fa-x btnDelete"></i> </span>
							<span class="optionBar__icon"> <i class="fa-solid fa-magnifying-glass"></i> </span>

						</li>
						-->
			
						
					
					</ul>

				</div>
				

            </div>

		</div>

        `;

		//filtersContainer.innerHTML += filter;btnArrow

		btnArrow.innerHTML += filter;
		// const listeUlContainer = document.querySelector(".listeUlContainer");
		// listeUlContainer.innerHTML = filter;
	};
	//createFilterItemFunction();

	// //liste des titres des boutons
	// let listTitleFilters =[ "Ingredients", "Appareils", "Ustensiles" ];
	
	

	//fonction d'itération du filtre
	const iterationFilter = () => {

		for(let i=0; i< listTitleFilters.length; i++){

			let listTitleFiltersCurrent = listTitleFilters[i];
			
			
			createFilterItemFunction(listTitleFiltersCurrent);

		}



	};
	iterationFilter();

	//const listeUlContainer = document.getElementsByClassName("listeUlContainer")
	//console.log(listeUlContainer)



	//insersion des nouvelles classes dans les boutons
	const listBtnRecette = document.getElementsByClassName("recettesBtn");
	// console.log(listBtnRecette);

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



	/////////////////////////////////////
	//const listBtnRecette = document.getElementsByClassName("recettesBtn");
		
	//récupération des filtres
	const filterForm2 = document.getElementsByClassName("filterForm2");
	// console.log(filterForm2); 

	//récupération des filtres
	const listArrowDown = document.getElementsByClassName("arrowDown");

	const listArrowUp = document.getElementsByClassName("arrowUp");

	//console.log(listArrowDown);

	//liste des valeurs des arrows
	let listArrowDownFilters = [ "arrowDownIngredients", "arrowDownAppareils", "arrowDownUstensiles" ];
	let listArrowUpFilters = [ "arrowUpIngredients", "arrowUpAppareils", "arrowUpUstensiles" ];

	//gestion de l'affichage des filtres en cas de non utilisation du champ de recherche
	///fonction de creation des filtres de recettes lorsqu'on est à l'état initial et le champ de recherche est vide 
	function createFilterInitFunction(){
		
		//ajout des class dans 
		for(let f=0; f<filterForm2.length; f++){

			let filterFormCureent = filterForm2[f];
			let valueIdFiltre = filterFormCureent.id;

			// console.log("***filterFormCureent")
			// console.log(filterFormCureent)

			/////////////////
			/*
			//récupération de la propriété display des filtres
			let styleBtn =  window.getComputedStyle(filterFormCureent);

			const valeurDisplay = styleBtn.getPropertyValue("display");

			console.log(valeurDisplay)
			*/
			/////////////////

			for(let i=0; i< listBtnRecette.length; i++){

				let listBtnRecetteCurrent = listBtnRecette[i];
				
				//récupération de la deuxième class
				let valueSecondClass = listBtnRecetteCurrent.classList[1];

				//récupération de id de l'élément en cours
				let classBtn = document.querySelector(`${"."+valueSecondClass}`);

				// console.log("***classBtn")
				// console.log(classBtn)

				

				if( valueSecondClass.trim() === valueIdFiltre){

					////////////////////////////////

					classBtn.addEventListener("click", ()=>{

						/*
						filterFormCureent.style.display = "block";

						
						//récupération et gestion de arrow correspondant au bouton
						let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
						
						arrowUp.style.display = "none";

						//récupération et gestion de arrow correspondant au bouton
						const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
						arrowDown.style.display = "block";*/


						/////////////////
						//récupération de la propriété display des filtres
						let valueIdFiltreElement = document.querySelector(`${"#"+valueIdFiltre}`);
					
						let stylefilter =  window.getComputedStyle(valueIdFiltreElement);

						const valeurStyleFilterDisplay = stylefilter.getPropertyValue("display");

						if(valeurStyleFilterDisplay === "none"){ //vrai


							console.log("**** bienvenue dans le if du display");

							filterFormCureent.style.display = "block";

							//récupération et gestion de arrow correspondant au bouton
							let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
							
							arrowUp.style.display = "none";

							//récupération et gestion de arrow correspondant au bouton
							const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
							arrowDown.style.display = "block";

						}else{

							console.log("**** bienvenue dans le else du display");

							filterFormCureent.style.display = "none";
							//récupération et gestion de arrow correspondant au bouton
							let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
							
							arrowUp.style.display = "block";

							//récupération et gestion de arrow correspondant au bouton
							const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
							arrowDown.style.display = "none";

						}

						function createLiFunction(liItemValue, ulItem){


							let liItem =`
							
							
								<li class="optionLi ${liItemValue}" style="display: block;" role='option'>  
							
									<button  value= ${liItemValue} id="${"BtnFilter"+liItemValue}">
			
										<span class="${"BtnFilter"+liItemValue}">${liItemValue}</span>
									
									</button>
								
								</li>
							
							`;

							ulItem.innerHTML += liItem;
						}

						//gestion de l'insetion des listes dans les filtres

						for(let l=0; l<listTitleFilters.length; l++){

							let listTitleFiltersCurrent = listTitleFilters[l];

							// console.log("***listTitleFiltersCurrent")
							// console.log(listTitleFiltersCurrent);

							//récupération du ul encours
							let ulItem = document.querySelector(`${"#"+listTitleFiltersCurrent+"Container"}`);

							if(ulItem.id.trim() === "IngredientsContainer"){

								console.log("*** bienvenue dans Ingratients");
									
								for(let i=0; i<ingredientsListFilter.length; i++){
	
	
									let ingredientValue = ingredientsListFilter[i];

									// console.log("***ingredientValue");
									// console.log(ingredientValue);
	
									//création du li 
									createLiFunction(ingredientValue, ulItem);
	
								}
									
	
							}else if(ulItem.id.trim() === "UstensilesContainer"){
	
								console.log("*** bienvenue dans Ustensiles");
	
								for(let i=0; i<ustencilsListFilter.length; i++){
	
	
									let ustensilesValue = ustencilsListFilter[i];
	
									//création du li 
									createLiFunction(ustensilesValue, ulItem);
	
								}
									
	
							}else if(ulItem.id.trim() === "AppareilsContainer"){
	
								console.log("*** bienvenue dans Appareils");
	
								for(let i=0; i<applianceListFilter.length; i++){
	
	
									let applianceValue = applianceListFilter[i];
	
									//création du li 
									createLiFunction(applianceValue, ulItem);
	
								}
									
	
							}

							///////////////////////
							



							////////////////////////

							
							
							

						}
						/////////////////

					});

			

					///////////////////////:
			
				}
				


			}


		}

		



	}
	createFilterInitFunction();


	/////////////////////////////////////

	

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
