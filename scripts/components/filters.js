
//récupération de la fonction
import getDatas from "../manageDatas.js";
//import articleCreateFunction from "./cardRecette.js";
import { getDatasFunction } from "./cardRecette.js";


//creation de la du filtre
export async  function createFilterFunction(listRicepsFilterJSON){

	
	// console.log("****listRicepsFilterJSON dans filters")
	// console.log(listRicepsFilterJSON)

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

	/********************* gestion des de la list issue de la barre de recherche principale ******************************* */
	if(listRicepsFilterJSON){

		//constitution des listes pour les filtres
		let titreListFilter = listRicepsFilterJSON.map( item => item.name);
		ingredientsListFilter = listRicepsFilterJSON.map( item => item.ingredients[0].ingredient);
		applianceListFilter = listRicepsFilterJSON.map( item => item.appliance);
		let ustencils = listAllData.map( item => item.ustensils );
		//let descriptionListFilter = listRicepsFilterJSON.map( item => item.description);

		//fonction de suppression des parenthèses
		const parenthese =(chaine) => chaine.replace(/[()]/g, "")

		//suppresssion des doublons
		ingredientsListFilter = [...new Set(ingredientsListFilter)];
		applianceListFilter = [...new Set(applianceListFilter)];
		//descriptionListFilter = [...new Set(descriptionListFilter)];
		ustencils = [...new Set(ustencils)];



		let ustencilsList=[];
	
		//fusion de l'ensemble de listes en une seule grosse liste
		for(let u=0; u<ustencils.length; u++){

			let ustencilsCurrent = ustencils[u];
			ustencilsList.push(ustencilsCurrent);
		
		}

		ustencilsListFilter = [].concat(...ustencilsList);

		//retrait des doublons après la fusion des données
		ustencilsListFilter = [...new Set(ustencilsListFilter)];


	}
	// Fonction de comparaison avec prise en compte des accents
	const comparerChaines = (a, b) => a.localeCompare(b, "fr", { sensitivity: "base" });

	ustencilsListFilter = ustencilsListFilter.sort(comparerChaines);
	ingredientsListFilter = ingredientsListFilter.sort(comparerChaines);
	applianceListFilter = applianceListFilter.sort(comparerChaines);

	////////////////////////////


	//supression des parenthèses

	let ingredientsListFilterTransform = [];

	for(let l=0; l<ingredientsListFilter.length; l++){

		let ingredientsCurrent = ingredientsListFilter[l];
		
		if(ingredientsCurrent.includes( "(") ){

	
			ingredientsCurrent=ingredientsCurrent.replace(/[()]/g, "");
		}

		ingredientsListFilterTransform.push(ingredientsCurrent);
		
	}

	ingredientsListFilter = ingredientsListFilterTransform;

	//////////////////////////////

	/*
	console.log("*** listAllData");
	console.log(listAllData);
	console.log("*** ustencilsListFilter");
	console.log(ustencilsListFilter);
	console.log("*** ingredientsListFilter");
	console.log(ingredientsListFilter);
	console.log("*** applianceListFilter");
	console.log(applianceListFilter);*/

	// Stockage dans le localStorage
	localStorage.setItem("ingredientsListFilter", JSON.stringify(ingredientsListFilter));
	localStorage.setItem("applianceListFilter", JSON.stringify(applianceListFilter));
	localStorage.setItem("ustencilsListFilter", JSON.stringify(ustencilsListFilter));

	

	//liste des recettes
	let listRecepsResultSearchBarMain =[];
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
							<span class="optionBar__delete"> <i class="fa-solid fa-x btnDelete ${"btnDelete"+listTitleFiltersCurrent}" style="display: none;"></i> </span>
							<span class="optionBar__icon"> <i class="fa-solid fa-magnifying-glass"></i> </span>

					</div>
					<ul    class="listeUlContainer filterForm2Container" id="${listTitleFiltersCurrent+"Container"}" >
							
			
					</ul>

				</div>
				

            </div>

		</div>

        `;

		btnArrow.innerHTML += filter;
		
	};
	
	//fonction d'itération du filtre
	const iterationFilter = () => {

		btnArrow.innerHTML= "";

		for(let i=0; i< listTitleFilters.length; i++){

			let listTitleFiltersCurrent = listTitleFilters[i];
			
			
			createFilterItemFunction(listTitleFiltersCurrent);

		}



	};
	iterationFilter();

	//insersion des nouvelles classes dans les boutons
	const listBtnRecette = document.getElementsByClassName("recettesBtn");


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
	
	//récupération des filtres
	const filterForm2 = document.getElementsByClassName("filterForm2");
	
	//récupération des filtres
	const listArrowDown = document.getElementsByClassName("arrowDown");

	const listArrowUp = document.getElementsByClassName("arrowUp");

	
	//liste des valeurs des arrows
	let listArrowDownFilters = [ "arrowDownIngredients", "arrowDownAppareils", "arrowDownUstensiles" ];
	let listArrowUpFilters = [ "arrowUpIngredients", "arrowUpAppareils", "arrowUpUstensiles" ];

	//gestion de l'affichage des filtres en cas de non utilisation du champ de recherche
	///fonction de creation des filtres de recettes lorsqu'on est à l'état initial et le champ de recherche est vide 
	function createFilterInitFunction(){
		
		//ajout des class dans 
		for(let a=0; a<filterForm2.length; a++){ //f

			let filterFormCureent = filterForm2[a];
			let valueIdFiltre = filterFormCureent.id;

			for(let i=0; i< listBtnRecette.length; i++){

				let listBtnRecetteCurrent = listBtnRecette[i];
				
				//récupération de la deuxième class
				let valueSecondClass = listBtnRecetteCurrent.classList[1];

				//récupération de id de l'élément en cours
				let classBtn = document.querySelector(`${"."+valueSecondClass}`);

				
				//récupération des searchbar desfiltres 
				//let input = document.querySelector(`${".input"+listTitleFiltersCurrent}`);
				let inputIngredients = document.querySelector(".inputIngredients");
				let inputAppareils = document.querySelector(".inputAppareils");
				let inputUstensiles = document.querySelector(".inputUstensiles");

				//récupération du ul encours
				let ingredientsContainer = document.querySelector("#IngredientsContainer");
				let appareilsContainer = document.querySelector("#AppareilsContainer");
				let ustensilesContainer = document.querySelector("#UstensilesContainer");


				

				////////////////////////////

				if( valueSecondClass.trim() === valueIdFiltre){

					
					classBtn.addEventListener("click", ()=>{

						/////////////////
						//récupération de la propriété display des filtres
						let valueIdFiltreElement = document.querySelector(`${"#"+valueIdFiltre}`);
					
						let stylefilter =  window.getComputedStyle(valueIdFiltreElement);

						const valeurStyleFilterDisplay = stylefilter.getPropertyValue("display");



						function ShowDisplayFilterFunction(){

						
							if(valeurStyleFilterDisplay === "none"){ //vrai



								filterFormCureent.style.display = "block";

								//récupération et gestion de arrow correspondant au bouton
								let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
								
								arrowUp.style.display = "none";

								//récupération et gestion de arrow correspondant au bouton
								const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
								arrowDown.style.display = "block";


								//stockage de la liste dans le localstorage
								localStorage.setItem("classBtnValue", JSON.stringify(classBtn.classList[1]));


							}else{


								filterFormCureent.style.display = "none";
								//récupération et gestion de arrow correspondant au bouton
								let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
								
								arrowUp.style.display = "block";

								//récupération et gestion de arrow correspondant au bouton
								const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
								arrowDown.style.display = "none";
								

							}
						}
						ShowDisplayFilterFunction();

						

						
						
					});


				}
				
			}


		}

	}
	createFilterInitFunction();




	/////////////////////////////////////////////////

	/*********gestion et creation des li des filtres ***/

	function createLiFunction(liItemValue, ulItem, differentClassFilter){

		//parenthese

		/*
		let liItemValueTransform = liItemValue;

		if(liItemValue.includes( "(") ){

			console.log("***liItemValue")

			console.log(liItemValue.replace(/[()]/g, ""))

			liItemValueTransform = liItemValue.replace(/[()]/g, "");
		}*/
		


		let liItem =`
							
							
			<li  class="optionLi ${liItemValue}" style="display: block;" >  
		
				<button   class="btnFilter ${"btnFilter"+liItemValue.replace(/\s+/g, "")} ${differentClassFilter}" id="${"btnFilter"+liItemValue.replace(/\s+/g, "")}">

					<span >${liItemValue}</span>
				
				</button>
			
			</li>
		
		`;

		ulItem.innerHTML += liItem;

				
	}

	///////////////////////

	//***gestion de l'intéraction des valeurs dans  les filtres

	let valInputFilter;

	//gestion de la value de la searchbar des filtres
	const listInputFilterValue = [ "inputIngredients", "inputAppareils", "inputUstensiles" ];

	//récupération de tous les inputs
	let listInputFilterElement = document.getElementsByClassName("optionBar__input");

	//boucle de la liste du tableau de valeurs
	for(let l=0; l<listInputFilterValue.length; l++){

		let InputlistValueCurrent = listInputFilterValue[l];
							

		//boucle de la liste des inputs des filtres
		for(let s=0; s<listInputFilterElement.length; s++){

			let inputFilterElementCurrent = listInputFilterElement[s];
								
			let inputFilterElementValueCurrent = listInputFilterElement[s].classList[1];

			if(InputlistValueCurrent === inputFilterElementValueCurrent.trim()){

				inputFilterElementCurrent.addEventListener("input", (e)=>{

					valInputFilter = e.target.value;

				
					inputFilterElementCurrent.setAttribute("value" , `${valInputFilter}`);


					setListDataFilterFunction(valInputFilter);

					////////////////////////////////////////////

					//gestion de l'affichage de la croix dans le filtre
					function deleteValueSearchBarFilterFunction(){

						let listInputSearchBarFilter = ["btnDeleteIngredients", "btnDeleteAppareils", "btnDeleteUstensiles"];
				
						//récupération de tous les inputs des filtres
						const inputsearchBarFilter = document.getElementsByClassName("btnDelete");
				
						for(let i=0; i<inputsearchBarFilter.length; i++){
				
							let inputsearchBarFilterClass = inputsearchBarFilter[i].classList[3];
								
				
							let elementDeleteCurrent = inputsearchBarFilter[i];


							//récupération des valeurs dans les classes
							let valueClassbtenXDelete = `${inputsearchBarFilterClass}`.substring(9,`${inputsearchBarFilterClass}`.length);
							let valueClassbtenInput = `${inputFilterElementCurrent.classList[1]}`.substring(5,`${inputFilterElementCurrent.classList[1]}`.length);
							//let valueClassbtenInput = `${inputFilterElementCurrent}`.substring(5,`${inputFilterElementCurrent}`.length);
								
							if(valueClassbtenInput === valueClassbtenXDelete && valInputFilter){
				
								elementDeleteCurrent.style.display = "block";
									
				
							}else{

								elementDeleteCurrent.style.display = "none";
							}
						}
						
					}
					deleteValueSearchBarFilterFunction();
					/////////////////////////////////////////////////////////////
				});

				

			}
		}

							

	}

	////////////////////////
						
	function setListDataFilterFunction(valInputFilter){

							
		//récupération des searchbar desfiltres 
		//let input = document.querySelector(`${".input"+listTitleFiltersCurrent}`);
		let inputIngredients = document.querySelector(".inputIngredients");
		let inputAppareils = document.querySelector(".inputAppareils");
		let inputUstensiles = document.querySelector(".inputUstensiles");

		//récupération du ul encours
		let ingredientsContainer = document.querySelector("#IngredientsContainer");
		let appareilsContainer = document.querySelector("#AppareilsContainer");
		let ustensilesContainer = document.querySelector("#UstensilesContainer");
							
							
		///////////////////////////////////
		//gestion  de l'état innitial des filtres avec un input null
		function initStateFilterFunction(){

			if(!inputIngredients.value){

								
				for(let i=0; i<ingredientsListFilter.length; i++){
		
		
					let ingredientValue = ingredientsListFilter[i];
	
					const differentClassFilter = "tagIngredients";
					//création du li 
					createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);
		
				}
			}
										
		
			if(!inputUstensiles.value){
		
				
				for(let i=0; i<ustencilsListFilter.length; i++){
		
		
					let ustensilesValue = ustencilsListFilter[i];
		
					const differentClassFilter = "tagUstensiles";
					//création du li 
					createLiFunction(ustensilesValue, ustensilesContainer, differentClassFilter);
		
				}
			}
										
		
			if(!inputAppareils.value){
		
				for(let i=0; i<applianceListFilter.length; i++){
		
		
					let applianceValue = applianceListFilter[i];
		
					const differentClassFilter = "tagAppareils";
					//création du li 
					createLiFunction(applianceValue, appareilsContainer, differentClassFilter);
		
				}
										
		
			}

		}
		initStateFilterFunction();
							

							
		//////////////////////////////////
		//gestion des evennements de la recherche dans les filtres
		function evenSearchBarFilterFunction(){

			inputIngredients.addEventListener("input", (e)=>{

				let val = e.target.value;
				
				// suppression de tous les éléments existants dans l'élément ou enfants
				ingredientsContainer.innerHTML = "";
	
				inputIngredients.setAttribute("value" , `${val}`);
	
				let inputIngredientsList = ingredientsListFilter.filter( item => item.toUpperCase().includes(`${val.toUpperCase()}`));
									
				//stockage de la liste dans le localstorage
				localStorage.setItem("inputIngredientsList", JSON.stringify(val));
	
				const differentClassFilter = "tagIngredients";

				for(let i=0; i< inputIngredientsList.length; i++){  
	
	
					let ingredientValue = inputIngredientsList[i];
	
					//création du li 
					createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);

		
				}

				////////////////////////////////////////////

				/********************* 	//gestion de la suppresion du contenu de la search bar des filtres ******************************* */

				function deleteSearchBarFilter(){

					
					let listInputSearchBarFilter = ["btnDeleteIngredients", "btnDeleteAppareils", "btnDeleteUstensiles"];

					//récupération de toutes les croix des filtres
					const inputsearchBarFilter = document.getElementsByClassName("btnDelete");

					for(let s=0; s<listInputSearchBarFilter.length; s++){


						let listInputSearchBarFilterValue = listInputSearchBarFilter[s];


						for(let i=0; i<inputsearchBarFilter.length; i++){

							let inputsearchBarFilterClass = inputsearchBarFilter[i].classList[3];
				

							let elementDeleteCurrent = inputsearchBarFilter[i];

							if(inputsearchBarFilterClass === listInputSearchBarFilterValue){

								elementDeleteCurrent.addEventListener("click", ()=>{


									inputIngredients.value = "";
									inputIngredients.removeAttribute("value");

									//masquage de la croix 
									elementDeleteCurrent.style.display="none";
									
									// suppression de tous les éléments existants dans l'élément ou enfants
									ingredientsContainer.innerHTML = "";
									
									for(let i=0; i< ingredientsListFilter.length; i++){ 
	
	
										let ingredientValue = ingredientsListFilter[i];
							
										//création du li 
										createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);
								
									}
										


								});


							}
						}
					}
				}
				deleteSearchBarFilter();
				
				btnFilterChoiceFunction();
			
	
	
			});
	
	
	
			inputAppareils.addEventListener("input", (e)=>{
	
				let val = e.target.value;
				
				inputAppareils.setAttribute("value" , `${val}`);
	
				// suppression de tous les éléments existants dans l'élément ou enfants
				appareilsContainer.innerHTML = "";
	
				let inputAppareilsList = applianceListFilter.filter( item => item.toUpperCase().includes(`${val.toUpperCase()}`));
									
				//stockage de la liste dans le localstorage
				localStorage.setItem("inputAppareilsList", JSON.stringify(val));
									
				const differentClassFilter = "tagAppareils";

				for(let i=0; i< inputAppareilsList.length; i++){ 
	
	
					let AppareilsValue = inputAppareilsList[i];
	
					//création du li 
					createLiFunction(AppareilsValue, appareilsContainer, differentClassFilter);
		
				}

				////////////////////////////////////////////

				/********************* 	//gestion de la suppresion du contenu de la search bar des filtres ******************************* */

				function deleteSearchBarFilter(){

					let listInputSearchBarFilter = ["btnDeleteIngredients", "btnDeleteAppareils", "btnDeleteUstensiles"];

					//récupération de toutes les croix des filtres
					const inputsearchBarFilter = document.getElementsByClassName("btnDelete");

					for(let s=0; s<listInputSearchBarFilter.length; s++){


						let listInputSearchBarFilterValue = listInputSearchBarFilter[s];


						for(let i=0; i<inputsearchBarFilter.length; i++){

							let inputsearchBarFilterClass = inputsearchBarFilter[i].classList[3];
				

							let elementDeleteCurrent = inputsearchBarFilter[i];

							if(inputsearchBarFilterClass === listInputSearchBarFilterValue){

								elementDeleteCurrent.addEventListener("click", ()=>{

						

									elementDeleteCurrent.style.display="none";
									
											
									inputAppareils.value = "";
									inputAppareils.removeAttribute("value");
									

									// suppression de tous les éléments existants dans l'élément ou enfants
									appareilsContainer.innerHTML = "";
									
									for(let i=0; i< applianceListFilter.length; i++){ 
	
	
										let AppareilsValue = applianceListFilter[i];
							
										//création du li 
										createLiFunction(AppareilsValue, appareilsContainer, differentClassFilter);
								
									}
										


								});


							}
						}
					}
				}
				deleteSearchBarFilter();

				btnFilterChoiceFunction();

				////////////////////////////////////////////
	
	
			});
	
			inputUstensiles.addEventListener("input", (e)=>{
	
				let val = e.target.value;
				

				inputUstensiles.setAttribute("value" , `${val}`);
	
				// suppression de tous les éléments existants dans l'élément ou enfants
				ustensilesContainer.innerHTML = "";
	
				let inputUstensilesList = ustencilsListFilter.filter( item => item.toUpperCase().includes(`${val.toUpperCase()}`));
									
				//stockage de la liste dans le localstorage
				localStorage.setItem("inputUstensilesList", JSON.stringify(val));
									
				const differentClassFilter = "tagUstensiles";

				for(let i=0; i< inputUstensilesList.length; i++){ 
	
	
					let UstensilesValue = inputUstensilesList[i];
	
					//création du li 
					createLiFunction(UstensilesValue, ustensilesContainer, differentClassFilter);
		
				}

				//////////////////////
				btnFilterChoiceFunction();
				//////////////////////

				////////////////////////////////////////////

				/********************* 	//gestion de la suppresion du contenu de la search bar des filtres ******************************* */

				function deleteSearchBarFilter(inputFilterElementCurrent, valInputFilter){

				
					let listInputSearchBarFilter = ["btnDeleteIngredients", "btnDeleteAppareils", "btnDeleteUstensiles"];

					//récupération de toutes les croix des filtres
					const inputsearchBarFilter = document.getElementsByClassName("btnDelete");

					for(let s=0; s<listInputSearchBarFilter.length; s++){


						let listInputSearchBarFilterValue = listInputSearchBarFilter[s];


						for(let i=0; i<inputsearchBarFilter.length; i++){

							let inputsearchBarFilterClass = inputsearchBarFilter[i].classList[3];
				

							let elementDeleteCurrent = inputsearchBarFilter[i];

							if(inputsearchBarFilterClass === listInputSearchBarFilterValue){

								elementDeleteCurrent.addEventListener("click", ()=>{

									//masquage de la croix 
									elementDeleteCurrent.style.display="none";
									
									inputUstensiles.value = "";
									inputUstensiles.removeAttribute("value");
									

									// suppression de tous les éléments existants dans l'élément ou enfants
									ustensilesContainer.innerHTML = "";
									
									for(let i=0; i< ustencilsListFilter.length; i++){ 
	
	
										let ustensilValue = ustencilsListFilter[i];
							
										//création du li 
										createLiFunction(ustensilValue, ustensilesContainer, differentClassFilter);
								
									}
										


								});


							}
						}
					}
				}
				deleteSearchBarFilter();
		
	
	
			});

		}
		evenSearchBarFilterFunction();

		//gestion des evennements au click sur  un choix de li ou 
							
		//récupération de tous les boutons ou li des filtres
		let BtnFilter = document.getElementsByClassName("btnFilter");
		
		let listChoiceAppareils = [];
		let listChoiceIngredients = [];
		let listChoiceUstensils = [];

		
		//gestion des filtres lorsqu'on choisit un élément de la list
		function btnFilterChoiceFunction(listChoiceAppareils2,listChoiceIngredients2, listChoiceUstensils2 ){


			// Récupérer toutes les clés du localStorage   
			const keysLocalstorage = Object.keys(localStorage);


			if(keysLocalstorage.length === 0){


				listChoiceAppareils = [];
				listChoiceIngredients = [];
				listChoiceUstensils = [];

			}

			//fonction de mise à jour de la liste du filtre ingredient
			function ingredientsChoiceFunction(){

				//if(keysLocalstorage.length !==0 ){

				if(listChoiceAppareils.length !==0 ){   

					

					let listAppareilsConcat = [];


					const differentClassFilter = "tagIngredients";
						
					for(let i=0; i< listChoiceAppareils.length; i++){ 
					
						ingredientsContainer.innerHTML= "";
							
						let ingredientsValue2List = listChoiceAppareils[i].ingredients;
									
						for(let ig=0; ig<ingredientsValue2List.length; ig++){


							let ingredientsValue2 = ingredientsValue2List[ig].ingredient;

							listAppareilsConcat.push(ingredientsValue2);

							

						}
			
					}

					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];

		
						
					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						//création du li 
						createLiFunction(listIngredientsConcatCurrent, ingredientsContainer, differentClassFilter);

					}


					/////////////////////////:::

					const btnTagIngredientsListLi = document.getElementsByClassName("tagIngredients");

					for(let b=0; b<btnTagIngredientsListLi.length; b++){


						let btnTaIngredientsLi = btnTagIngredientsListLi[b];
						let tagIngredientsLiId = btnTagIngredientsListLi[b].id;

								
						btnTaIngredientsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

							
				
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagIngredientsLiId.substring(9,tagIngredientsLiId.length);
				
						


							//////////////////////////////

							localStorage.setItem( "valClassBtnIngredientsLi", btnTaIngredientsLi.textContent);

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
													
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceAppareils.length; l++){

								let listappareilObject = listChoiceAppareils[l].ingredients;
								let objectAppareil = listChoiceAppareils[l];
									
								for(let j=0; j<listappareilObject.length; j++ ){

									let listappareilObjectCurrent = listappareilObject[j].ingredient;
								
									if(listappareilObjectCurrent ){
			
										if(valClassBtnLi.replace(/\s+/g, "").toUpperCase() === listappareilObjectCurrent.replace(/\s+/g, "").toUpperCase() ){
					
											
					
											listChoiceIngredients=[];
											listChoiceIngredients.push(objectAppareil);
					
											
											//stockage de la valeur du li ou du btn dans le localstorage
											localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceIngredients));
														
											applianceChoiceFunction();
											ustensilsChoiceFunction();

											//exécution de la fonction des tags
											showTagFunction();
										}
																	
									}

								
								}

						
							}

							//////////////////////////
								
							//fermeture de la list

							
							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpIngredients = document.querySelector(".arrowUpIngredients");
							arrowUpIngredients.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownIngredients = document.querySelector(".arrowDownIngredients");
							arrowDownIngredients.style.display = "block";


							//masquage du ul
							const containerIngredients = document.querySelector("#Ingredients");
							containerIngredients.style.display = "none";


							//////////////////////////
			
				
						});

					}


				}else  if(listChoiceUstensils.length !== 0  ){

					

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					// let listUstensilsConcat = [...new Set(listChoiceUstensils)];
					let listValIngredientsConcat =[];

					const differentClassFilter = "tagIngredients";
					ingredientsContainer.innerHTML= "";



					for(let i=0; i< listChoiceUstensils.length; i++){ 
					
					
						let listIngredients = listChoiceUstensils[i].ingredients;
						let objectIngredients = listChoiceUstensils[i];
								
						for(let l=0; l<listIngredients.length; l++){

							let ingredientsValue = listIngredients[l].ingredient;

							//stockage des ingredients pour éliminer les doublons
							listValIngredientsConcat.push(ingredientsValue);

		
						}

							
								
					}

					//retrait des doublons 
					let listValIngredientsConcat2 = [...new Set(listValIngredientsConcat)];


					for(let l=0; l<listValIngredientsConcat2.length; l++){

						let listIngredientsConcatCurrent = listValIngredientsConcat2[l];

						//création du li 
						createLiFunction(listIngredientsConcatCurrent, ingredientsContainer, differentClassFilter);

					}


					/////////////////////////:::

					const btnTagIngredientsListLi = document.getElementsByClassName("tagIngredients");

					for(let b=0; b<btnTagIngredientsListLi.length; b++){


						let btnTagIngredientsLi = btnTagIngredientsListLi[b];
						let tagIngredientsLiId = btnTagIngredientsListLi[b].id;

								
						btnTagIngredientsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

						
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagIngredientsLiId.substring(9,tagIngredientsLiId.length);

							//stockage de la valeur du li ou du btn dans le localstorage
							//localStorage.setItem( "valClassBtnIngredientsLi", JSON.stringify(valClassBtnLi));
							localStorage.setItem( "valClassBtnIngredientsLi", btnTagIngredientsLi.textContent);

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
								

							for(let l=0; l<listChoiceUstensils.length; l++){

								let listChoiceIngredientsCurrent = listChoiceUstensils[l].ingredients;
								let objectIngredientsCurrent = listChoiceUstensils[l];
				
											
								for(let u=0; u<listChoiceIngredientsCurrent.length; u++){

									let  ingredientsValueCurrent = listChoiceIngredientsCurrent[u].ingredient;

									if(ingredientsValueCurrent ){
			
										if(valClassBtnLi.toUpperCase() === ingredientsValueCurrent.replace(/\s+/g, "").toUpperCase() ){
				
											
				
											listChoiceIngredients.push(objectIngredientsCurrent);
				
										
											//stockage de la valeur du li ou du btn dans le localstorage
											localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
													
											ustensilsChoiceFunction();
											applianceChoiceFunction();

											//exécution de la fonction des tags
											showTagFunction();
										}
																
									}

								}
									
							}

							//////////////////////////
								
							//fermeture de la list

							
							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpIngredients = document.querySelector(".arrowUpIngredients");
							arrowUpIngredients.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownIngredients = document.querySelector(".arrowDownIngredients");
							arrowDownIngredients.style.display = "block";


							//masquage du ul
							const containerIngredients = document.querySelector("#Ingredients");
							containerIngredients.style.display = "none";


							//////////////////////////
			


				
						});

					}

					//}

				


				} else{  //état initial des valeurs du filtre

					

					/////////////////////////////
					
					const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
					const ulTagIngredients = document.querySelector(".ulTagIngredients");
					const ulTagAppareils = document.querySelector(".ulTagAppareils");
					const ulTagUstensils = document.querySelector(".ulTagUstensils");

					//ulTagIngredients.innerHTML="";

					/////////////////////////////

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagIngredients"){


							btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

								

								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
					
								

								//stockage de la valeur du li ou du btn dans le localstorage
								//localStorage.setItem( "valClassBtnIngredientsLi", JSON.stringify(valClassBtnLi));
								localStorage.setItem( "valClassBtnIngredientsLi", btnCurrent.textContent); //btnCurrent.textContent

								//récupération des valeurs selectionnées du localstorage
								const valChoiceFilter = localStorage.getItem(differentClassFilter);

								//récupération des recettes qui correspondent à la sélection du filtre
										
								let listValFilterTest = ["ingredients", "ustensils" ];

								for(let l=0; l<listAllData.length; l++){

										
									let objectAllDataCurrent = listAllData[l];

									for(let t=0; t<listValFilterTest.length; t++){

										let  valFilterTestCurrent = listValFilterTest[t];

													
										for(let o=0; o<objectAllDataCurrent[valFilterTestCurrent].length; o++){

											let valObjectIngredients = objectAllDataCurrent[valFilterTestCurrent][o].ingredient;

					
											if(valObjectIngredients){

										
												if(valClassBtnLi.toUpperCase() === valObjectIngredients.replace(/\s+/g, "").toUpperCase() ){

													listChoiceIngredients.push(objectAllDataCurrent);

									
													//stockage de la valeur du li ou du btn dans le localstorage
													localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));
													localStorage.setItem( "listChoice", JSON.stringify(listChoiceIngredients));

												}

											}

										}

									}

								}

								
								applianceChoiceFunction();
								ustensilsChoiceFunction();

								//exécution de la fonction des tags
								showTagFunction();

								//////////////////////////
							
								//fermeture de la list

						
								//masquage de la fleche du haut arrowDownIngredients
								let arrowUpIngredients = document.querySelector(".arrowUpIngredients");
								arrowUpIngredients.style.display = "none";

								//affichage de la fleche du bas arrowDownIngredients
								let arrowDownIngredients = document.querySelector(".arrowDownIngredients");
								arrowDownIngredients.style.display = "block";


								//masquage du ul
								const containerIngredients = document.querySelector("#Ingredients");
								containerIngredients.style.display = "none";


								//////////////////////////
		
							});


						}

					}

				}

			}
			ingredientsChoiceFunction();
				

			//fonction de mise à jour de la liste du filtre appareils
			function applianceChoiceFunction(){

				//fonction de retour à l'état initial des filtres
				
				//vérification si on est sur le bon filtres
				
				//if(keysLocalstorage.length !==0 ){

				if(listChoiceIngredients.length !== 0  ){  //&& keysLocalstorage.length !==0

			
					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";


					for(let i=0; i< listChoiceIngredients.length; i++){ 
					
					
						let appareilsValue2 = listChoiceIngredients[i].appliance;
									
						listAppareilsConcat.push(appareilsValue2);

						
								
					}

					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];


					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						//création du li 
						createLiFunction(listIngredientsConcatCurrent, appareilsContainer, differentClassFilter);

					}


					/////////////////////////:::

					const btnTagAppareilsListLi = document.getElementsByClassName("tagAppareils");

					for(let b=0; b<btnTagAppareilsListLi.length; b++){


						let btnTagAppareilsLi = btnTagAppareilsListLi[b];
						let tagAppareilsLiId = btnTagAppareilsListLi[b].id;

								
						btnTagAppareilsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

			
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagAppareilsLiId.substring(9,tagAppareilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
														
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( "valClassBtnAppareilsLi", btnTagAppareilsLi.textContent);
				

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
													
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceIngredients.length; l++){

								let objectAllDataCurrent = listChoiceIngredients[l];
				
														
								if(objectAllDataCurrent.appliance ){
			
									if(valClassBtnLi.toUpperCase() === objectAllDataCurrent.appliance.replace(/\s+/g, "").toUpperCase() ){
			
										//listChoiceAppareils=[];
										listChoiceAppareils.push(objectAllDataCurrent);
			
									
										//stockage de la valeur du li ou du btn dans le localstorage
										localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
										localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
												
										ingredientsChoiceFunction();
										ustensilsChoiceFunction();

										//exécution de la fonction des tags
										showTagFunction();
											
									}
															
								}
							}

							
							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpAppareils = document.querySelector(".arrowUpAppareils");
							arrowUpAppareils.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownAppareils = document.querySelector(".arrowDownAppareils");
							arrowDownAppareils.style.display = "block";


							//masquage du ul
							const containerAppareils = document.querySelector("#Appareils");
							containerAppareils.style.display = "none";

								
							//////////////////////////
			
				
						});

					}


				}else if(listChoiceUstensils.length !== 0  ){  //&& keysLocalstorage.length !==0

					

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";



					for(let i=0; i< listChoiceUstensils.length; i++){ 
					
						//appareilsContainer.innerHTML= "";

						let appareilsValue2 = listChoiceUstensils[i].appliance;
									
						listAppareilsConcat.push(appareilsValue2);

						
					}

						
					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];


					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						//création du li 
						createLiFunction(listIngredientsConcatCurrent, appareilsContainer, differentClassFilter);

					}


					/////////////////////////:::

					let btnTagAUstensilsListLi = document.getElementsByClassName("tagAppareils");  //tagUstensiles

					for(let b=0; b<btnTagAUstensilsListLi.length; b++){


						let btnTagUstensilsLi = btnTagAUstensilsListLi[b];
						let tagUstensilsLiId = btnTagAUstensilsListLi[b].id;

				
						btnTagUstensilsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

							
				
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
														
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( "valClassBtnAppareilsLi", btnTagUstensilsLi.textContent);
				

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
													
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceUstensils.length; l++){

								let listChoiceUstensilsCurrent = listChoiceUstensils[l];
								let appareilsValueCurrent = listChoiceUstensils[l].appliance;
				
											
								// for(let u=0; u<listUstensilsCurrent.length; u++){

								// 	let objectAppareilsCurrent = listChoiceUstensils[u];

								if(appareilsValueCurrent ){
			
									if(valClassBtnLi.toUpperCase() === appareilsValueCurrent.replace(/\s+/g, "").toUpperCase() ){
				
										
				
										//listChoiceAppareils=[];
										listChoiceAppareils.push(listChoiceUstensilsCurrent);
				
										
										//stockage de la valeur du li ou du btn dans le localstorage
										localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
										localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
													
										ingredientsChoiceFunction();
										ustensilsChoiceFunction();

										//exécution de la fonction des tags
										showTagFunction();
									}
																
								}

								//}
									
							}

							//////////////////////////
								
							//fermeture de la list
							//showHidenElementFunction();
								
							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpAppareils = document.querySelector(".arrowUpAppareils");
							arrowUpAppareils.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownAppareils = document.querySelector(".arrowDownAppareils");
							arrowDownAppareils.style.display = "block";


							//masquage du ul
							const containerAppareils = document.querySelector("#Appareils");
							containerAppareils.style.display = "none";

								
				
							//////////////////////////
				
						});

					}

					//}


				}else{

					
					/////////////////////////////
					
					const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
					const ulTagIngredients = document.querySelector(".ulTagIngredients");
					const ulTagAppareils = document.querySelector(".ulTagAppareils");
					const ulTagUstensils = document.querySelector(".ulTagUstensils");

					//ulTagAppareils.innerHTML="";

					/////////////////////////////

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);


						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagAppareils"){

							

							btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

								
								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
					
								// let differentClassFilter = btnCurrent.classList[2];
										
								//stockage de la valeur du li ou du btn dans le localstorage
								localStorage.setItem( "valClassBtnAppareilsLi", btnCurrent.textContent);

								//récupération des valeurs selectionnées du localstorage
								const valChoiceFilter = localStorage.getItem(valClassBtnLi);

								//récupération des recettes qui correspondent à la sélection du filtre
										
								let listValFilterTest = ["ingredients", "ustensils" ];

								for(let l=0; l<listAllData.length; l++){

										
									let objectAllDataCurrent = listAllData[l];
									let valAppareils = listAllData[l].appliance;

									if(objectAllDataCurrent){

										
										if(valClassBtnLi.toUpperCase() === valAppareils.replace(/\s+/g, "").toUpperCase() ){

											listChoiceAppareils.push(objectAllDataCurrent);

											//stockage de la valeur du li ou du btn dans le localstorage
											localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));

										}

									}


								}

								ingredientsChoiceFunction();
								ustensilsChoiceFunction();

								//exécution de la fonction des tags
								showTagFunction();

								//////////////////////////
							
								//fermeture de la list
							
								
								//masquage de la fleche du haut arrowDownIngredients
								let arrowUpAppareils = document.querySelector(".arrowUpAppareils");
								arrowUpAppareils.style.display = "none";

								//affichage de la fleche du bas arrowDownIngredients
								let arrowDownAppareils = document.querySelector(".arrowDownAppareils");
								arrowDownAppareils.style.display = "block";


								//masquage du ul
								const containerAppareils = document.querySelector("#Appareils");
								containerAppareils.style.display = "none";
								

								//////////////////////////
		
							});


						}

					}

				}

						
				

										

			}
			
			applianceChoiceFunction();



			//fonction de mise à jour de la liste du filtre ustensils
			function ustensilsChoiceFunction(){


				
				//vérification si on est sur le bon filtres

				//if(keysLocalstorage.length !==0 ){

				if(listChoiceAppareils.length !==0   ){  //&& keysLocalstorage.length !==0

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listUstensilsConcat = [];


					const differentClassFilter = "tagUstensiles";
						


					for(let i=0; i< listChoiceAppareils.length; i++){ 
					
						ustensilesContainer.innerHTML= "";
							
						let ustensilsValue2List = listChoiceAppareils[i].ustensils;
									
						for(let u=0; u<ustensilsValue2List.length; u++){


							let ustensilsValue2 = ustensilsValue2List[u];

							listUstensilsConcat.push(ustensilsValue2);

							
						}


							
								
								
					}

					//retrait des doublons 
					let listUstensilsConcat2 = [...new Set(listUstensilsConcat)];


					for(let l=0; l<listUstensilsConcat2.length; l++){
		
						let listUstensilsConcatCurrent = listUstensilsConcat2[l];
		
						//création du li 
						createLiFunction(listUstensilsConcatCurrent, ustensilesContainer, differentClassFilter);
		
					}


					/////////////////////////:::

					const btnTagUstensilsLi = document.getElementsByClassName("tagUstensiles");

					for(let b=0; b<btnTagUstensilsLi.length; b++){


						let btnTaUstenilsLi = btnTagUstensilsLi[b];
						let tagUstensilsLiId = btnTagUstensilsLi[b].id;

								
						btnTaUstenilsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

							
								
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							//let valClassBtnUstensilsLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);

								

							// let differentClassFilter = btnCurrent.classList[2];
														
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( "valClassBtnUstensilsLi", btnTaUstenilsLi.textContent);
				

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
													
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceAppareils.length; l++){

								let listUstensilsObject = listChoiceAppareils[l].ustensils;
								let objectAppareil = listChoiceAppareils[l];
									
								for(let j=0; j<listUstensilsObject.length; j++ ){

									let ustensilsValueCurrent = listUstensilsObject[j];
									//let objectAllDataCurrent = listIngredientsVal[j].ingredient;

									if(listUstensilsObject ){
			
										if(valClassBtnLi.replace(/\s+/g, "").toUpperCase() === ustensilsValueCurrent.replace(/\s+/g, "").toUpperCase() ){
					
											
					
											listChoiceUstensils=[];
											listChoiceUstensils.push(objectAppareil);
					
											
											//stockage de la valeur du li ou du btn dans le localstorage
											localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceUstensils));
														
											applianceChoiceFunction();
											ingredientsChoiceFunction();

											//exécution de la fonction des tags
											showTagFunction();
											
										}
																	
									}

										
										
										
								}

						
							}

							//fonction de retour à l'état initial des filtres
							//fermeture de la list

							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpUstensiles = document.querySelector(".arrowUpUstensiles");
							arrowUpUstensiles.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownUstensiles = document.querySelector(".arrowDownUstensiles");
							arrowDownUstensiles.style.display = "block";


							//masquage du ul
							const containerUstensiles = document.querySelector("#Ustensiles");
							containerUstensiles.style.display = "none";

				
						});

					}


				}else if(listChoiceIngredients.length !== 0  ){  //&& keysLocalstorage.length !==0

					
						
					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listUstensilsConcat = [];


					const differentClassFilter = "tagUsteniles";
					//ustensilesContainer.innerHTML= "";



					for(let i=0; i< listChoiceIngredients.length; i++){ 
					
						ustensilesContainer.innerHTML= "";

						let listustensilsValue2 = listChoiceIngredients[i].ustensils;
									
						for(let l=0; l<listustensilsValue2.length; l++){

							let ustensilsValueCurrent = listustensilsValue2[l];

							listUstensilsConcat.push(ustensilsValueCurrent);
							//création du li 
							//createLiFunction(ustensilsValueCurrent, ustensilesContainer, differentClassFilter);

						}



								
								
					}

					//retrait des doublons 
					let listUstensilsConcat2 = [...new Set(listUstensilsConcat)];



					for(let l=0; l<listUstensilsConcat2.length; l++){
				
						let listUstensilsConcatCurrent = listUstensilsConcat2[l];
				
									
						//création du li 
						createLiFunction(listUstensilsConcatCurrent, ustensilesContainer, differentClassFilter);
				
					}


					/////////////////////////:::

					const btnTUstensilsListLi = document.getElementsByClassName("tagUstensiles");

					for(let b=0; b<btnTUstensilsListLi.length; b++){


						let btnTUstensilsLi = btnTUstensilsListLi[b];
						let tagUstensilsLiId = btnTUstensilsListLi[b].id;

								
						btnTUstensilsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

							
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
														
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( "valClassBtnUstensilsLi", btnTUstensilsLi.textContent);
				

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
				
							//récupération des recettes qui correspondent à la sélection du filtre
													
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceIngredients.length; l++){

								let listIngredients = listChoiceIngredients[l].ustensils;
								let objectIngredients = listChoiceIngredients[l];
								
				
								for(let u=0; u<listIngredients.length; u++){



									let ustensilsCurrent = listIngredients[u];

									if(ustensilsCurrent){
			
										if(valClassBtnLi.toUpperCase() === ustensilsCurrent.replace(/\s+/g, "").toUpperCase() ){
				
											
											//listChoiceAppareils=[];
											listChoiceUstensils.push(objectIngredients);
				
										
											//stockage de la valeur du li ou du btn dans le localstorage
											localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceUstensils));
													
											applianceChoiceFunction();
											ingredientsChoiceFunction();

											//exécution de la fonction des tags
											showTagFunction();
										}
																
									}
								}
									
							}

							//fonction de retour à l'état initial des filtres
							//fermeture de la list

							//masquage de la fleche du haut arrowDownIngredients
							let arrowUpUstensiles = document.querySelector(".arrowUpUstensiles");
							arrowUpUstensiles.style.display = "none";

							//affichage de la fleche du bas arrowDownIngredients
							let arrowDownUstensiles = document.querySelector(".arrowDownUstensiles");
							arrowDownUstensiles.style.display = "block";


							//masquage du ul
							const containerUstensiles = document.querySelector("#Ustensiles");
							containerUstensiles.style.display = "none";
				
						});

					}

					//}


				}else{ 

					/////////////////////////////

					const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
					const ulTagIngredients = document.querySelector(".ulTagIngredients");
					const ulTagAppareils = document.querySelector(".ulTagAppareils");
					const ulTagUstensils = document.querySelector(".ulTagUstensils");

					//ulTagUstensils.innerHTML="";

					/////////////////////////////

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagUstensiles"){


							btnCurrent.addEventListener("click", ()=>{  

								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
								
								let differentClassFilter = btnCurrent.classList[2];
													
								//stockage de la valeur du li ou du btn dans le localstorage
								localStorage.setItem( "valClassBtnUstensilsLi", btnCurrent.textContent);
			
								//récupération des valeurs selectionnées du localstorage
								const valChoiceFilter = localStorage.getItem(differentClassFilter);
			
								//récupération des recettes qui correspondent à la sélection du filtre
													
								let listValFilterTest = ["ingredients", "ustensils" ];
			
								for(let l=0; l<listAllData.length; l++){
			
									let objectAllDataCurrent = listAllData[l];
		
									for(let o=0; o<objectAllDataCurrent.ustensils.length; o++){
		
										let valObjectUstensils = objectAllDataCurrent.ustensils[o];
		
								
		
										if(valObjectUstensils ){    //&& !listChoiceIngredientsLocalstorage
		
											
														
											if(valClassBtnLi.toUpperCase() === valObjectUstensils.replace(/\s+/g, "").toUpperCase() ){
		
												
		
												listChoiceUstensils.push(objectAllDataCurrent);
										
												//stockage de la valeur du li ou du btn dans le localstorage
												localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
												localStorage.setItem( "listChoice", JSON.stringify(listChoiceUstensils));
												
												applianceChoiceFunction();
												ingredientsChoiceFunction();

												//exécution de la fonction des tags
												showTagFunction();
											}
									
										}
		
									}
								}

								//fonction de retour à l'état initial des filtres
								//fermeture de la list

								//masquage de la fleche du haut arrowDownIngredients
								let arrowUpUstensiles = document.querySelector(".arrowUpUstensiles");
								arrowUpUstensiles.style.display = "none";

								//affichage de la fleche du bas arrowDownIngredients
								let arrowDownUstensiles = document.querySelector(".arrowDownUstensiles");
								arrowDownUstensiles.style.display = "block";


								//masquage du ul
								const containerUstensiles = document.querySelector("#Ustensiles");
								containerUstensiles.style.display = "none";

							});


						}

					}

				}
				
	
			}
			ustensilsChoiceFunction();


		}
		btnFilterChoiceFunction();



		/********************* gestion des tags ******************************* */
	
		const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
		const ulTagIngredients = document.querySelector(".ulTagIngredients");
		const ulTagAppareils = document.querySelector(".ulTagAppareils");
		const ulTagUstensils = document.querySelector(".ulTagUstensils");
	
    
		//fonction de création des tags des filtres
		const keywordsTagFilterFunction = (tagTexContent, tagContainer, listChoiceClass) => {

			const keywordsTagFilter = `

            <li class="${"likeyword"+(tagTexContent).replace(/\s+/g, "")} keywordContainer ${listChoiceClass}"  >

                <p   class="${"keyword"+(tagTexContent).replace(/\s+/g, "")} keywordContainer__btn">

                    ${tagTexContent}
                            
                </p>
                <span class="keywordContainer__delete"> <i class="fa-solid fa-circle-xmark btnDeleteTag" data-keyWord=${"keyword text"} ></i> </span>
            
            </li>

            
        `;
			//keywordsTaglistFilter.innerHTML= keywordsTagFilter;
			tagContainer.innerHTML= keywordsTagFilter;


		};
		// keywordsTagFilterFunction();

		function showTagFunction(){

			
			//récupération des valeurs des tags du localstorage

			let tagIngredientsLocalStorage = localStorage.getItem("valClassBtnIngredientsLi");
			let tagAppareilsLocalStorage = localStorage.getItem("valClassBtnAppareilsLi");
			let tagUstensilsLocalStorage = localStorage.getItem("valClassBtnUstensilsLi");

			let listChoiceIngredientsStorage = "listChoiceIngredients";

			if(tagIngredientsLocalStorage){

				//ulTagIngredients.innerHTML = "";
				keywordsTagFilterFunction(tagIngredientsLocalStorage, ulTagIngredients, listChoiceIngredientsStorage);
			
				deleteTagFunction();

				let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
			

				//éxécussion de la articleCreateFunction venant de cardRecette.js
			
				getDatasFunction(listChoiceLocalStorage);


			}
			if(tagAppareilsLocalStorage){ 

				let listChoiceAppareilsStorage = "listChoiceAppareils";

				//ulTagAppareils.innerHTML = "";
				keywordsTagFilterFunction(tagAppareilsLocalStorage, ulTagAppareils, listChoiceAppareilsStorage);

				deleteTagFunction();

				let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
				let listChoiceAppareilsLocalStorage = JSON.parse(localStorage.getItem("listChoiceAppareils"));
			
				//éxécussion de la articleCreateFunction venant de cardRecette.js
			
				getDatasFunction(listChoiceLocalStorage);

			}
			if(tagUstensilsLocalStorage){

				let listChoiceUstensilsStorage = "listChoiceUstensils";

				//ulTagUstensils.innerHTML = "";
				keywordsTagFilterFunction(tagUstensilsLocalStorage, ulTagUstensils, listChoiceUstensilsStorage);
		
				deleteTagFunction();

				let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
				let listChoiceUstensilsLocalStorage = JSON.parse(localStorage.getItem("listChoiceUstensils"));
			

				//éxécussion de la articleCreateFunction venant de cardRecette.js
			
				getDatasFunction(listChoiceLocalStorage);
			}

		}
		
		//gestion des fermetures des tags

		function deleteTagFunction(){

			let listTitleFilters2 =[ "Ingredients", "Appareils", "Ustensils" ];

			//récupération de la liste qui correspond au contenu de la page
			let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
		
		
			let listConcatUnique = []; // listChoiceLocalStorage;

			//récupération de la liste des ul ou contenaire des tags
			let keywordContainer = document.getElementsByClassName("keywordContainer");

			for( let k=0; k<keywordContainer.length; k++){

				let keywordContainerCurrent = keywordContainer[k].classList[0];

				//récupération de la class volue
				let classLiTagCurrent = keywordContainer[k].classList[2];

				//récupération du texContent du tag
				let valueTexContentTagCurrent = keywordContainer[k].textContent.trim();

				//récupération du parent de l'élément
				let keywordContainerClassCurrent = document.querySelector(`.${keywordContainerCurrent}`).parentNode;

			
				keywordContainerClassCurrent.addEventListener("click", ()=>{

					//récupération de la liste qui correspond au contenu de la page
					let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
				
					let sectionTag = document.getElementsByClassName("keywordsTag");
				
					keywordContainerClassCurrent.innerHTML = "";


					for(let i=0; i<listTitleFilters2.length; i++){

						let valListTitleFiltersCurrent = listTitleFilters2[i];

						if(keywordContainerClassCurrent.classList[2].includes(valListTitleFiltersCurrent) ){

							//function manageDataTag(){

							//récupération de la liste qui correspond au tag qu'on supprime
							let listChoiceTagLocalStorage = JSON.parse(localStorage.getItem(`${"listChoice"+valListTitleFiltersCurrent}`));
				
							//fusion des deux listes pour obtenir une nouvelle liste lors de la suppression du tag
							
							//récupération des ul ou container des tags
							let ulTagIngredients = document.querySelector(".ulTagIngredients");
							let ulTagAppareils = document.querySelector(".ulTagAppareils");
							let ulTagUstensils = document.querySelector(".ulTagUstensils");



							//mise à jour du contenu de la page lorsqu'on ferme les tags
						
							if(ulTagIngredients.childNodes.length <=1  && ulTagAppareils.childNodes.length <=1 && ulTagUstensils.childNodes.length <=1  ){

								

								//recréation des li ou élément des filtres

								//récupération du ul encours
								let ingredientsContainer = document.querySelector("#IngredientsContainer");
								let appareilsContainer = document.querySelector("#AppareilsContainer");
								let ustensilesContainer = document.querySelector("#UstensilesContainer");
							
							
								///////////////////////////////////
								//reinitialisation des listes des filtres 
								function initStateFilterFunction(){

			

										
									ingredientsContainer.innerHTML="";

									for(let i=0; i<ingredientsListFilter.length; i++){
		
		
										let ingredientValue = ingredientsListFilter[i];
	
										const differentClassFilter = "tagIngredients";
										//création du li 
										createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);
		
									}
			
									
									ustensilesContainer.innerHTML="";

									for(let i=0; i<ustencilsListFilter.length; i++){
		
		
										let ustensilesValue = ustencilsListFilter[i];
		
										const differentClassFilter = "tagUstensiles";
										//création du li 
										createLiFunction(ustensilesValue, ustensilesContainer, differentClassFilter);
		
									}
			
					
									appareilsContainer.innerHTML="";

									for(let i=0; i<applianceListFilter.length; i++){
		
		
										let applianceValue = applianceListFilter[i];
		
										const differentClassFilter = "tagAppareils";
										//création du li 
										createLiFunction(applianceValue, appareilsContainer, differentClassFilter);
		
									}
										
									
									
			

								}
								initStateFilterFunction();
							

								localStorage.clear();
								
								btnFilterChoiceFunction();

								getDatasFunction( listAllData);
								//////////////////////////

								// btnFilterChoiceFunction(listChoiceAppareils,listChoiceIngredients, listChoiceUstensils);

								



							}else{

								

								//supression de la liste du local storage  qui correspond au tag qu'on supprime
								localStorage.removeItem(`${"listChoice"+valListTitleFiltersCurrent}`);

							
								//récupération de toutes les liste du local storage
								let listChoiceIngredientsStorage = JSON.parse(localStorage.getItem("listChoiceIngredients")) ?? [];
								let listChoiceAppareilsStorage = JSON.parse(localStorage.getItem("listChoiceAppareils")) ?? [];
								let listChoiceUstensilsStorage = JSON.parse(localStorage.getItem("listChoiceUstensils")) ?? [];


								//////////////////////////
								if(classLiTagCurrent === "listChoiceIngredients"){

								
									//fonction de gestion de mise à jour à la supression des tags
									function manageValueTexcontentTagFunction(){


										

										let valueTexContentTagAppareils = document.querySelector(".listChoiceAppareils") ?? [];
										let valueTexContentTagUstensils = document.querySelector(".listChoiceUstensils") ?? [];
								
										let listValueTexContentTag = [valueTexContentTagAppareils, valueTexContentTagUstensils];

										let listValueTexContentTagFinal = [];

										for(let l=0; l<listValueTexContentTag.length; l++){

											let valueTexContentTag = listValueTexContentTag[l];

											if(valueTexContentTag.length !== 0 ){

												// valueTexContentTag.textContent.trim()
												listValueTexContentTagFinal.push(valueTexContentTag.textContent.trim());
											


											}
										}
									
										
									
										let listAppareilsUstensilsObjectTag = [];

										let listIng = [];
										let listUst = [];

										//obtension des différentes liste d'objets correspondantes aux filtres restants
										for(let f=0; f<listValueTexContentTagFinal.length; f++){

											let valueTextContentCurrent = listValueTexContentTagFinal[f];

											for(let i=0; i<listAllData.length; i++){

												//objet encours
												let valueObjectTag = listAllData[i];

												//valeurs de ingredient de l'objet encours
												let listAppareilsTagCurrent = valueObjectTag.appliance;

												if(listAppareilsTagCurrent === valueTextContentCurrent){

				
													//ajout de l'objet encours dans la list
													listAppareilsUstensilsObjectTag.push(valueObjectTag);

													listIng.push(valueObjectTag);

										
												}

												//valeurs de ustensil de l'objet encours
												let listUstensilTagCurrent = valueObjectTag.ustensils;


												if(listUstensilTagCurrent.length !== 0){

													

													//gestion de la liste des ustensils encours
													for(let j=0; j<listUstensilTagCurrent.length; j++){

														let ValueUstensilTagCurrent = listUstensilTagCurrent[j];

														if(ValueUstensilTagCurrent === valueTextContentCurrent){

															

															//ajout de l'objet encours dans la list
															listAppareilsUstensilsObjectTag.push(valueObjectTag);

															listUst.push(valueObjectTag);
														}

													}

												

												}
											}

										}

										
										//suppression des doublons dans les liste d'objects en fonction de l'id
										let NewUniqueList = listAppareilsUstensilsObjectTag.filter((item, index, array) =>
											index === array.findIndex((item2) => item2.id === item.id)
										);

										

										getDatasFunction( NewUniqueList);

									}
									manageValueTexcontentTagFunction();
								
						

									/////////////////////

							
								
								
								}else if(classLiTagCurrent === "listChoiceAppareils"){

									

								
									//fonction de gestion de mise à jour à la supression des tags
									function manageValueTexcontentTagFunction(){


										let valueTexContentTagIngredients = document.querySelector(".listChoiceIngredients") ?? [];
										let valueTexContentTagUstensils = document.querySelector(".listChoiceUstensils") ?? [];
								
										let listValueTexContentTag = [valueTexContentTagIngredients, valueTexContentTagUstensils];

										let listValueTexContentTagFinal = [];

										for(let l=0; l<listValueTexContentTag.length; l++){

											let valueTexContentTag = listValueTexContentTag[l];

											if(valueTexContentTag.length !== 0 ){

												// valueTexContentTag.textContent.trim()
												listValueTexContentTagFinal.push(valueTexContentTag.textContent.trim());
											


											}
										}
									
										
									
										let listAppareilsUstensilsObjectTag = [];

										let listIng = [];
										let listUst = [];

										//obtension des différentes liste d'objets correspondantes aux filtres restants
										for(let f=0; f<listValueTexContentTagFinal.length; f++){

											let valueTextContentCurrent = listValueTexContentTagFinal[f];

											for(let i=0; i<listAllData.length; i++){

												//objet encours
												let valueObjectTag = listAllData[i];

												//valeurs de ingredient de l'objet encours
												let listIngredientTagCurrent = valueObjectTag.ingredients;

												if(listIngredientTagCurrent.length !== 0){

						
													//gestion de la liste des ingredients encours
													for(let j=0; j<listIngredientTagCurrent.length; j++){

														let objectIngredientTagCurrent = listIngredientTagCurrent[j].ingredient;


														if(objectIngredientTagCurrent === valueTextContentCurrent){

															

															//ajout de l'objet encours dans la list
															listAppareilsUstensilsObjectTag.push(valueObjectTag);

															listIng.push(valueObjectTag);

														}

													}

												

												}

												//valeurs de ustensil de l'objet encours
												let listUstensilTagCurrent = valueObjectTag.ustensils;


												if(listUstensilTagCurrent.length !== 0){

													

													//gestion de la liste des ustensils encours
													for(let j=0; j<listUstensilTagCurrent.length; j++){

														let ValueUstensilTagCurrent = listUstensilTagCurrent[j];

														if(ValueUstensilTagCurrent === valueTextContentCurrent){

															

															//ajout de l'objet encours dans la list
															listAppareilsUstensilsObjectTag.push(valueObjectTag);

															listUst.push(valueObjectTag);
														}

													}

												

												}
											}

										}

										

										//suppression des doublons dans les liste d'objects en fonction de l'id
										let NewUniqueList = listAppareilsUstensilsObjectTag.filter((item, index, array) =>
											index === array.findIndex((item2) => item2.id === item.id)
										);

										

										getDatasFunction( NewUniqueList);

									}
									manageValueTexcontentTagFunction();
								
						

									/////////////////////

								}else if(classLiTagCurrent === "listChoiceUstensils"){

									
									//fonction de gestion de mise à jour à la supression des tags
									function manageValueTexcontentTagFunction(){


										

										let valueTexContentTagIngredients = document.querySelector(".listChoiceIngredients") ?? [];
										let valueTexContentTagAppareils = document.querySelector(".listChoiceAppareils") ?? [];
								
										let listValueTexContentTag = [valueTexContentTagIngredients, valueTexContentTagAppareils];

										let listValueTexContentTagFinal = [];

										for(let l=0; l<listValueTexContentTag.length; l++){

											let valueTexContentTag = listValueTexContentTag[l];

											if(valueTexContentTag.length !== 0 ){

												// valueTexContentTag.textContent.trim()
												listValueTexContentTagFinal.push(valueTexContentTag.textContent.trim());
											


											}
										}
									
									
									
										let listAppareilsIngredientObjectTag = [];

										let listIng = [];
										let listUst = [];

										//obtension des différentes liste d'objets correspondantes aux filtres restants
										for(let f=0; f<listValueTexContentTagFinal.length; f++){

											let valueTextContentCurrent = listValueTexContentTagFinal[f];

											for(let i=0; i<listAllData.length; i++){

												//objet encours
												let valueObjectTag = listAllData[i];

												//valeurs de ingredient de l'objet encours
												let listIngredientTagCurrent = valueObjectTag.ingredients;

												if(listIngredientTagCurrent.length !== 0){

													


													//gestion de la liste des ingredients encours
													for(let j=0; j<listIngredientTagCurrent.length; j++){

														let objectIngredientTagCurrent = listIngredientTagCurrent[j].ingredient;


														if(objectIngredientTagCurrent === valueTextContentCurrent){

															

															//ajout de l'objet encours dans la list
															listAppareilsIngredientObjectTag.push(valueObjectTag);

															listIng.push(valueObjectTag);

														}

													}

												

												}

												//valeurs de ustensil de l'objet encours
												let listAppareilsTagCurrent = valueObjectTag.appliance;


												if(listAppareilsTagCurrent.length === valueTextContentCurrent){

													

													//ajout de l'objet encours dans la list
													listAppareilsIngredientObjectTag.push(valueObjectTag);

													listUst.push(valueObjectTag);

												
												}
											}

										}

							

										//suppression des doublons dans les liste d'objects en fonction de l'id
										let NewUniqueList = listAppareilsIngredientObjectTag.filter((item, index, array) =>
											index === array.findIndex((item2) => item2.id === item.id)
										);


										

										getDatasFunction( NewUniqueList);

									}
									manageValueTexcontentTagFunction();
								
								}


							}
						
						
		
						}
					}

		
				});
			}
		}


	
	}
	setListDataFilterFunction();

	
	
}
export default createFilterFunction();













