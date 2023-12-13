
//récupération de la fonction
import getDatas from "../manageDatas.js";
//import articleCreateFunction from "./cardRecette.js";
import { getDatasFunction } from "./cardRecette.js";


//creation de la du filtre
export async  function createFilterFunction(listRicepsFilterJSON){

	/*****récupération de la liste du résultat de recherche du localstorage **/
	// Récupération de listRicepsFilter la chaîne JSON du localStorage
	/*let listRicepsFilterJSON = localStorage.getItem("listRicepsFilter");
	
	// Convertion de la chaîne listRicepsFilterJSON en liste JavaScript
	//let listRicepsFilter = JSON.parse(listRicepsFilterJSON);
	
	console.log("***listRicepsFilter dans filters");
	console.log(listRicepsFilter);*/
	

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

	/*
	console.log("*** listAllData");
	console.log(listAllData);
	console.log("*** ustencilsListFilter");
	console.log(ustencilsListFilter);
	console.log("*** ingredientsListFilter");
	console.log(ingredientsListFilter);
	console.log("*** applianceListFilter");
	console.log(applianceListFilter);*/

	/********************* gestion des de la list issue de la barre de recherche principale ******************************* */
	if(listRicepsFilterJSON){

		console.log("***listRicepsFilterJSON dans filters");
		console.log(listRicepsFilterJSON);
		
		//constitution des listes pour les filtres
		let titreListFilter = listRicepsFilterJSON.map( item => item.name);
		ingredientsListFilter = listRicepsFilterJSON.map( item => item.ingredients[0].ingredient);
		applianceListFilter = listRicepsFilterJSON.map( item => item.appliance);
		let ustencils = listAllData.map( item => item.ustensils );
		//let descriptionListFilter = listRicepsFilterJSON.map( item => item.description);

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
	

	console.log("*** listAllData");
	console.log(listAllData);
	console.log("*** ustencilsListFilter");
	console.log(ustencilsListFilter);
	console.log("*** ingredientsListFilter");
	console.log(ingredientsListFilter);
	console.log("*** applianceListFilter");
	console.log(applianceListFilter);

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

		btnArrow.innerHTML= "";

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
		for(let a=0; a<filterForm2.length; a++){ //f

			let filterFormCureent = filterForm2[a];
			let valueIdFiltre = filterFormCureent.id;

			for(let i=0; i< listBtnRecette.length; i++){

				let listBtnRecetteCurrent = listBtnRecette[i];
				
				//récupération de la deuxième class
				let valueSecondClass = listBtnRecetteCurrent.classList[1];

				//récupération de id de l'élément en cours
				let classBtn = document.querySelector(`${"."+valueSecondClass}`);

				// console.log("***classBtn")
				// console.log(classBtn)

				/////////////////////////////
				
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


								console.log("**** bienvenue dans le if du display");

								filterFormCureent.style.display = "block";

								//récupération et gestion de arrow correspondant au bouton
								let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
								
								arrowUp.style.display = "none";

								//récupération et gestion de arrow correspondant au bouton
								const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
								arrowDown.style.display = "block";


								//stockage de la liste dans le localstorage
								localStorage.setItem("classBtnValue", JSON.stringify(classBtn.classList[1]));

								//////////////////
								//deleteSearchBarFilter();
								//////////////////

							}else{

								console.log("**** bienvenue dans le else du display");

								filterFormCureent.style.display = "none";
								//récupération et gestion de arrow correspondant au bouton
								let arrowUp = document.querySelector(`${ ".arrowDown"+valueIdFiltre}`);
								
								arrowUp.style.display = "block";

								//récupération et gestion de arrow correspondant au bouton
								const arrowDown = document.querySelector(`${ ".arrowUp"+valueIdFiltre}`);
								arrowDown.style.display = "none";
								//////////////////
								//deleteSearchBarFilter();
								//////////////////

							}
						}
						ShowDisplayFilterFunction();

						

						
						
					});// de classBtn


				}
				
			}


		}

	}
	createFilterInitFunction();




	/////////////////////////////////////////////////

	/*********gestion et creation des li des filtres ***/

	function createLiFunction(liItemValue, ulItem, differentClassFilter){

		let liItem =`
							
							
			<li data-${"btnFilter"+liItemValue.replace(/\s+/g, "")}=${"btnFilter"+liItemValue.replace(/\s+/g, "")} class="optionLi ${liItemValue}" style="display: block;" role='option'>  
		
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

			// console.log("***inputFilterElementValueCurrent");
			// console.log(inputFilterElementValueCurrent);

			if(InputlistValueCurrent === inputFilterElementValueCurrent.trim()){

				console.log("***bienvenue sur l'input");

				inputFilterElementCurrent.addEventListener("input", (e)=>{

					valInputFilter = e.target.value;

				
					inputFilterElementCurrent.setAttribute("value" , `${valInputFilter}`);


					setListDataFilterFunction(valInputFilter);

					////////////////////////////////////////////

					//gestion de l'affichage de la croix dans le filtre
					function deleteValueSearchBarFilterFunction(){

						console.log("*****bienvenue à la deleteValueSearchBarFilterFunction");
				
						
				
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
								
							console.log("*****valueClassbtenXDelete");
							console.log(valueClassbtenXDelete);

							console.log("*****valueClassbtenInput");
							console.log(valueClassbtenInput);
				
							if(valueClassbtenInput === valueClassbtenXDelete && valInputFilter){
				
								console.log("*****bienvenue à la condition delete");
								//console.log(elementDeleteCurrent);

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

				console.log("*** bienvenue dans Ingratients");
										
				for(let i=0; i<ingredientsListFilter.length; i++){
		
		
					let ingredientValue = ingredientsListFilter[i];
	
					const differentClassFilter = "tagIngredients";
					//création du li 
					createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);
		
				}
			}
										
		
			if(!inputUstensiles.value){
		
				console.log("*** bienvenue dans Ustensiles");
		
				for(let i=0; i<ustencilsListFilter.length; i++){
		
		
					let ustensilesValue = ustencilsListFilter[i];
		
					const differentClassFilter = "tagUstensiles";
					//création du li 
					createLiFunction(ustensilesValue, ustensilesContainer, differentClassFilter);
		
				}
			}
										
		
			if(!inputAppareils.value){
		
				console.log("*** bienvenue dans Appareils");
		
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
									
				console.log(val);
	
				// suppression de tous les éléments existants dans l'élément ou enfants
				ingredientsContainer.innerHTML = "";
	
				inputIngredients.setAttribute("value" , `${val}`);
	
				let inputIngredientsList = ingredientsListFilter.filter( item => item.includes(`${val}`));
									
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

					console.log("*****bienvenue à la deleteSearchBarFilter");

		

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

									console.log("*****bienvenue à la l'evennement delete");
									console.log(elementDeleteCurrent);

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
				//btnFilterChoiceFunction();

				////////////////////////////////////////////

				//////////////////////
				btnFilterChoiceFunction();
				//////////////////////
	
	
			});
	
	
	
			inputAppareils.addEventListener("input", (e)=>{
	
				let val = e.target.value;
				
				inputAppareils.setAttribute("value" , `${val}`);
	
				// suppression de tous les éléments existants dans l'élément ou enfants
				appareilsContainer.innerHTML = "";
	
				let inputAppareilsList = applianceListFilter.filter( item => item.includes(`${val.trim()}`));
									
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

					console.log("*****bienvenue à la deleteSearchBarFilter");

		

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

									console.log("*****bienvenue à la l'evennement delete");
									console.log(elementDeleteCurrent);

									//masquage de la croix 

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
				console.log(val);

				inputUstensiles.setAttribute("value" , `${val}`);
	
				// suppression de tous les éléments existants dans l'élément ou enfants
				ustensilesContainer.innerHTML = "";
	
				let inputUstensilesList = ustencilsListFilter.filter( item => item.includes(`${val.trim()}`));
									
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

					console.log("*****bienvenue à la deleteSearchBarFilter");

		

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

									console.log("*****bienvenue à la l'evennement delete");
									console.log(elementDeleteCurrent);

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
				//btnFilterChoiceFunction();

				////////////////////////////////////////////
	
	
			});

		}
		evenSearchBarFilterFunction();

		//}); // de classBtn




		//gestion des evennements au click sur le un choix de li ou 
							
		//récupération de tous les boutons ou li des filtres
		let BtnFilter = document.getElementsByClassName("btnFilter");
		
		let listChoiceAppareils = [];
		let listChoiceIngredients = [];
		let listChoiceUstensils = [];

		
		
		function btnFilterChoiceFunction(){

			function ingredientsChoiceFunction(){

			
				

				if(listChoiceAppareils.length !==0  ){

					let listAppareilsConcat = [];


					const differentClassFilter = "tagIngredients";
					
					for(let i=0; i< listChoiceAppareils.length; i++){ 
				
						ingredientsContainer.innerHTML= "";
						
						let ingredientsValue2List = listChoiceAppareils[i].ingredients;
								
						for(let ig=0; ig<ingredientsValue2List.length; ig++){


							let ingredientsValue2 = ingredientsValue2List[ig].ingredient;

							listAppareilsConcat.push(ingredientsValue2);

							//création du li 
							// createLiFunction(ingredientsValue2, ingredientsContainer, differentClassFilter);

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

							console.log("** bienvenue dans  tagIgredients condition 1");
			
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagIngredientsLiId.substring(9,tagIngredientsLiId.length);
			
							//stockage de la valeur du li ou du btn dans le localstorage
							// localStorage.setItem( "valClassBtnIngredientsLi", JSON.stringify(valClassBtnLi));
							localStorage.setItem( "valClassBtnIngredientsLi", btnTaIngredientsLi.textContent);

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
			
							//récupération des recettes qui correspondent à la sélection du filtre
												
							let listValFilterTest = ["ingredients", "ustensils" ];


							///////////////////////////////////////////////


							///////////////////////////////////////////////


							for(let l=0; l<listChoiceAppareils.length; l++){

								let listappareilObject = listChoiceAppareils[l].ingredients;
								let objectAppareil = listChoiceAppareils[l];
								
								for(let j=0; j<listappareilObject.length; j++ ){

									let listappareilObjectCurrent = listappareilObject[j].ingredient;
							
									if(listappareilObjectCurrent ){
		
										if(valClassBtnLi.replace(/\s+/g, "").toUpperCase() === listappareilObjectCurrent.replace(/\s+/g, "").toUpperCase() ){
				
											console.log("*** bienvenue dans le if appareilVal replace  de ingredients");
				
											listChoiceIngredients=[];
											listChoiceIngredients.push(objectAppareil);
				
										
											//stockage de la valeur du li ou du btn dans le localstorage
											// localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));
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


				}else  if(listChoiceUstensils.length !== 0 ){

					console.log("** bienvenue dans  tagAppareils condition 1");

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

							console.log("** bienvenue dans  tagAppareils condition 1");
			
						
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
			
											console.log("*** bienvenue dans le if appareils replace ");
			
											listChoiceIngredients.push(objectIngredientsCurrent);
			
									
											//stockage de la valeur du li ou du btn dans le localstorage
											// localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
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


				} else{ 

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagIngredients"){


							btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

								console.log("** bienvenue dans  tagIngredients");

								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
					
								// let differentClassFilter = btnCurrent.classList[2];
										
								//stockage de la valeur du li ou du btn dans le localstorage
								//localStorage.setItem( "valClassBtnIngredientsLi", JSON.stringify(valClassBtnLi));
								localStorage.setItem( "valClassBtnIngredientsLi", btnCurrent.textContent);

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

									
											// console.log("***valObjectIngredients");
											// console.log(valObjectIngredients);

											if(valObjectIngredients){

										
												if(valClassBtnLi.toUpperCase() === valObjectIngredients.replace(/\s+/g, "").toUpperCase() ){

													listChoiceIngredients.push(objectAllDataCurrent);

									
													//stockage de la valeur du li ou du btn dans le localstorage
													//localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));
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
				

				

			//////////////////////////////////


			//gestion du choix sur les appareils

				
			function applianceChoiceFunction(){

				//fonction de retour à l'état initial des filtres
				
				//vérification si on est sur le bon filtres
				
				if(listChoiceIngredients.length !== 0 ){

					console.log("** bienvenue dans  tagAppareils condition 1");

					//let differentClassFilter = btnCurrent.classList[2];

					

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";



					for(let i=0; i< listChoiceIngredients.length; i++){ 
				
				
						let appareilsValue2 = listChoiceIngredients[i].appliance;
								
						listAppareilsConcat.push(appareilsValue2);

						//création du li 
						//createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
							
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

							console.log("** bienvenue dans  tagAppareils condition 1");

							
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
										//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
										localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
											
										ingredientsChoiceFunction();
										ustensilsChoiceFunction();

										//exécution de la fonction des tags
										showTagFunction();
										
									}
														
								}
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


				}else if(listChoiceUstensils.length !== 0 ){

					console.log("** bienvenue dans  tagAppareils condition 1");

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";



					for(let i=0; i< listChoiceUstensils.length; i++){ 
				
						//appareilsContainer.innerHTML= "";

						let appareilsValue2 = listChoiceUstensils[i].appliance;
								
						listAppareilsConcat.push(appareilsValue2);

						//création du li 
						//createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
							
					}

					
					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];

					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						//création du li 
						createLiFunction(listIngredientsConcatCurrent, appareilsContainer, differentClassFilter);

					}


					/////////////////////////:::

					let btnTagAUstensilsListLi = document.getElementsByClassName("tagUstensiles");

					for(let b=0; b<btnTagAUstensilsListLi.length; b++){


						let btnTagUstensilsLi = btnTagAUstensilsListLi[b];
						let tagUstensilsLiId = btnTagAUstensilsListLi[b].id;

			
						btnTagUstensilsLi.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

							console.log("** bienvenue dans  tagAppareils condition 1");
			
							
							// console.log("*** mon btnCurrent");
							// console.log(btnCurrent);
			
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
			
										console.log("*** bienvenue dans le if appareils replace ");
			
										//listChoiceAppareils=[];
										listChoiceAppareils.push(listChoiceUstensilsCurrent);
			
									
										//stockage de la valeur du li ou du btn dans le localstorage
										//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
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


				}else{

					

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

						// console.log("*** mon btnCurrent");
						// console.log(btnCurrent);

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagAppareils"){

							

							btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

								console.log("** bienvenue dans  tagAppareils");

								
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
											//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
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



			//gestion du choix sur les ustensils
			function ustensilsChoiceFunction(){


				
				//vérification si on est sur le bon filtres


				if(listChoiceAppareils.length !==0 ){

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

							//création du li 
							//createLiFunction(ustensilsValue2, ustensilesContainer, differentClassFilter);

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

							console.log("** bienvenue dans  tagIgredients condition 1");
							
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
				
											console.log("*** bienvenue dans le if appareilVal replace  de ingredients");
				
											// console.log("***objectAllDataCurrent");
											// console.log(objectAllDataCurrent);
				
											listChoiceUstensils=[];
											listChoiceUstensils.push(objectAppareil);
				
										
											//stockage de la valeur du li ou du btn dans le localstorage
											//localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
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


				}else if(listChoiceIngredients.length !== 0 ){

					console.log("** bienvenue dans  tagAppareils condition 1");

					
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

							console.log("** bienvenue dans  tagUstensiles condition 1");
							
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
			
											console.log("*** bienvenue dans le if ustensils replace ");
			
											//listChoiceAppareils=[];
											listChoiceUstensils.push(objectIngredients);
			
									
											//stockage de la valeur du li ou du btn dans le localstorage
											//localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
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


				}else{ 

					for(let b=0; b<BtnFilter.length; b++){

				
						let BtnFilterCurrentValue = BtnFilter[b].id;

						//récupération du bouton spécifique ou encours
						let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

						/*console.log("*** mon btnCurrent");
						console.log(btnCurrent);*/

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagUstensiles"){


							btnCurrent.addEventListener("click", ()=>{  

								console.log("** bienvenue dans  tagUstensiles");
			
						
						
			
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
		
											console.log("listChoiceIngredients n'existe dans cette condition");
														
											if(valClassBtnLi.toUpperCase() === valObjectUstensils.replace(/\s+/g, "").toUpperCase() ){
		
												console.log("*** bienvenue dans le if ustensils replace 1 ");
		
												listChoiceUstensils.push(objectAllDataCurrent);
										
												//stockage de la valeur du li ou du btn dans le localstorage
												//localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
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
			
	}
	setListDataFilterFunction();

					
	////////////////////////////////////////////////

	

	/********************* gestion des tags ******************************* */
	
	const keywordsTaglistFilter = document.querySelector(".keywordsTag__listFilter");
	const ulTagIngredients = document.querySelector(".ulTagIngredients");
	const ulTagAppareils = document.querySelector(".ulTagAppareils");
	const ulTagUstensils = document.querySelector(".ulTagUstensils");
	//console.log(keywordsTaglistFilter);
    
	//fonction de création des tags des filtres
	const keywordsTagFilterFunction = (tagTexContent, tagContainer) => {

		const keywordsTagFilter = `

            <li class="${"likeyword"+(tagTexContent).replace(/\s+/g, "")} keywordContainer"  >

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

		console.log("Bienvenue dans showTagFunction()");
		//récupération des valeurs des tags du localstorage

		let tagIngredientsLocalStorage = localStorage.getItem("valClassBtnIngredientsLi");
		let tagAppareilsLocalStorage = localStorage.getItem("valClassBtnAppareilsLi");
		let tagUstensilsLocalStorage = localStorage.getItem("valClassBtnUstensilsLi");

		if(tagIngredientsLocalStorage){

			ulTagIngredients.innerHTML = "";
			keywordsTagFilterFunction(tagIngredientsLocalStorage, ulTagIngredients);
			
			deleteTagFunction();

			let listChoiceLocalStorage = JSON.parse(localStorage.getItem("listChoice"));
			
			// console.log("***listChoiceLocalStorage")
			// console.log(listChoiceLocalStorage)
			//éxécussion de la articleCreateFunction venant de cardRecette.js
			
			getDatasFunction(listChoiceLocalStorage);


		}
		if(tagAppareilsLocalStorage){

			ulTagAppareils.innerHTML = "";
			keywordsTagFilterFunction(tagAppareilsLocalStorage, ulTagAppareils);

			deleteTagFunction();

		}
		if(tagUstensilsLocalStorage){

			ulTagUstensils.innerHTML = "";
			keywordsTagFilterFunction(tagUstensilsLocalStorage, ulTagUstensils);
		
			deleteTagFunction();
		}

	}
	//showTagFunction();

	//gestion des fermetures des tags

	function deleteTagFunction(){

		let keywordContainer = document.getElementsByClassName("keywordContainer");

		for( let k=0; k<keywordContainer.length; k++){

			let keywordContainerCurrent = keywordContainer[k].classList[0];

			//récupération du parent de l'élément
			let keywordContainerClassCurrent = document.querySelector(`.${keywordContainerCurrent}`).parentNode;

		
			keywordContainerClassCurrent.addEventListener("click", ()=>{

				keywordContainerClassCurrent.innerHTML = "";
			});
		}
	}

	/********************* 	//gestion de la suppresion du contenu de la search bar des filtres ******************************* */
	/*
	function deleteSearchBarFilter(inputFilterElementCurrent, valInputFilter){

		console.log("*****bienvenue à la deleteSearchBarFilter");

		

		let listInputSearchBarFilter = ["btnDeleteIngredients", "btnDeleteAppareils", "btnDeleteUstensiles"];

		//récupération de tous les inputs des filtres
		const inputsearchBarFilter = document.getElementsByClassName("btnDelete");

		for(let s=0; s<listInputSearchBarFilter.length; s++){


			let listInputSearchBarFilterValue = listInputSearchBarFilter[s];

			for(let i=0; i<inputsearchBarFilter.length; i++){

				let inputsearchBarFilterClass = inputsearchBarFilter[i].classList[3];
				

				let elementDeleteCurrent = inputsearchBarFilter[i];

				if(inputsearchBarFilterClass === listInputSearchBarFilterValue){

					// console.log("*****bienvenue à la condition delete");
					// console.log(elementDeleteCurrent);

					
					elementDeleteCurrent.addEventListener("click", ()=>{

						console.log("*****bienvenue à la condition delete");
						console.log(elementDeleteCurrent);

						//inputFilterElementCurrent.addEventListener("input", ())
						if(valInputFilter){

							inputFilterElementCurrent.value = "";

							evenSearchBarFilterFunction()

						}
						

					})


				}
			}
		}
	}*/
	
	


	
}
export default createFilterFunction();













