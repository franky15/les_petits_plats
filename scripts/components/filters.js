
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

										
										// console.log("**valInputFilter");
										// console.log(valInputFilter);

										setListDataFilterFunction(valInputFilter);
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
	
										//  console.log("***ingredientValue");
										//  console.log(ingredientValue);

										// console.log("***ingredientsContainer");
										//  console.log(ingredientsContainer);
		
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
									//localStorage.setItem("inputIngredientsList", JSON.stringify(inputIngredientsList));
	
									for(let i=0; i< inputIngredientsList.length; i++){  
	
	
										let ingredientValue = inputIngredientsList[i];
	
										//création du li 
										createLiFunction(ingredientValue, ingredientsContainer);
		
									}
	
	
								});
	
	
	
								inputAppareils.addEventListener("input", (e)=>{
	
									let val = e.target.value;
									console.log(val);

									inputAppareils.setAttribute("value" , `${val}`);
	
									// suppression de tous les éléments existants dans l'élément ou enfants
									appareilsContainer.innerHTML = "";
	
									let inputAppareilsList = applianceListFilter.filter( item => item.includes(`${val.trim()}`));
									
									//stockage de la liste dans le localstorage
									//localStorage.setItem("inputAppareilsList", JSON.stringify(inputAppareilsList));
									
									for(let i=0; i< inputAppareilsList.length; i++){ 
	
	
										let AppareilsValue = inputAppareilsList[i];
	
										//création du li 
										createLiFunction(AppareilsValue, appareilsContainer);
		
									}
	
	
								});
	
								inputUstensiles.addEventListener("input", (e)=>{
	
									let val = e.target.value;
									console.log(val);

									inputUstensiles.setAttribute("value" , `${val}`);
	
									// suppression de tous les éléments existants dans l'élément ou enfants
									ustensilesContainer.innerHTML = "";
	
									let inputUstensilesList = ustencilsListFilter.filter( item => item.includes(`${val.trim()}`));
									
									//stockage de la liste dans le localstorage
									//localStorage.setItem("inputUstensilesList", JSON.stringify(inputUstensilesList));
									
									for(let i=0; i< inputUstensilesList.length; i++){ 
	
	
										let UstensilesValue = inputUstensilesList[i];
	
										//création du li 
										createLiFunction(UstensilesValue, ustensilesContainer);
		
									}
	
	
								});

							}
							evenSearchBarFilterFunction();


							//récupération de tous les boutons ou li des filtres
							let BtnFilter = document.getElementsByClassName("btnFilter");

							//récupération des boutons ou li du filtres des ingedients 

							//gestions des evennements au click sur un ingredients, appareils ou ustensils
							function btnFilterChoiceFunction(){

								for(let b=0; b<BtnFilter.length; b++){


									let BtnFilterCurrentValue = BtnFilter[b].id;

									//récupération du bouton spécifique ou encours
									let btnCurrent = document.getElementById(`${BtnFilterCurrentValue}`);

									
									btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

										console.log("** j'ai cliqué sur ce bouton");

										// console.log("***BtnFilterCurrentValue")
										// console.log(BtnFilterCurrentValue)

										// console.log("***btnCurrent")
										// console.log(btnCurrent.classList[2])

										let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
										// console.log("***valClassBtnLi")
										// console.log(valClassBtnLi);//.replace(/\s+/g, "")
										
										//vérification si la valeur de chaque filtres est déjà présente dans le local storage car
										//on veut une valeur par filtre ou par liste

										let differentClassFilter = btnCurrent.classList[2];
										
										//stockage de la valeur du li ou du btn dans le localstorage
										//localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));

										//récupération des valeurs selectionnées du localstorage
										const valChoiceFilter = localStorage.getItem(differentClassFilter);

										//récupération des recettes qui correspondent à la sélection du filtre
										
										let listValFilterTest = ["ingredients", "ustensils" ];

										let listChoiceAppareils = [];
										let listChoiceIngredients = [];
										let listChoiceUstensils = [];

										for(let l=0; l<listAllData.length; l++){

										
											let objectAllDataCurrent = listAllData[l];

											for(let t=0; t<listValFilterTest.length; t++){

												let  valFilterTestCurrent = listValFilterTest[t];

												//vérification si l'élément encours est une liste ou non
												function ingredientsChoiceFunction(){
													
													for(let o=0; o<objectAllDataCurrent[valFilterTestCurrent].length; o++){

														let valObjectIngredients = objectAllDataCurrent[valFilterTestCurrent][o].ingredient;
		
														// console.log("***valObjectIngredients"); 
														// console.log(  valObjectIngredients );
														
														if(valObjectIngredients){

										
															if(valClassBtnLi.toUpperCase() === valObjectIngredients.replace(/\s+/g, "").toUpperCase() ){

																// console.log("*** bienvenue dans le if ingredients replace ");
																


																listChoiceIngredients.push(objectAllDataCurrent);

																
	
															}

														}

							
		
													}

					
													//transfert de la list aux autres li 
													//ustensilsChoiceFunction(listChoiceIngredients);
												}
												ingredientsChoiceFunction();
												
												//gestion du choix sur les appareils
												function applianceChoiceFunction(){


													if(objectAllDataCurrent.appliance ){
		
														if(valClassBtnLi.toUpperCase() === objectAllDataCurrent.appliance.replace(/\s+/g, "").toUpperCase() ){
			
															console.log("*** bienvenue dans le if ustensils replace ");
			
															listChoiceAppareils.push(objectAllDataCurrent);
			
														}
															
													}

													

												}
												applianceChoiceFunction();
												
											
												//gestion du choix sur les ustensils
												function ustensilsChoiceFunction(){

				
													for(let o=0; o<objectAllDataCurrent.ustensils.length; o++){

														let valObjectUstensils = objectAllDataCurrent.ustensils[o];

														if(valObjectUstensils ){    //&& !listChoiceIngredientsLocalstorage
		
															console.log("listChoiceIngredients n'existe dans cette condition");
															
															if(valClassBtnLi.toUpperCase() === valObjectUstensils.replace(/\s+/g, "").toUpperCase() ){
		
																console.log("*** bienvenue dans le if ustensils replace 1 ");
		
																listChoiceUstensils.push(objectAllDataCurrent);
		
															}
														/////////////
														}
		
													}


												}
												ustensilsChoiceFunction();

											}

										}

										//stockage de la liste dans le localstorage
										/*localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));*/

										let listAppareils = [];
										let listIngredients = [];
										let listUstensils = [];


										//mise à jour des listes des filtres
										if(listChoiceIngredients && listChoiceAppareils.length === 0 && listChoiceUstensils.length === 0){


											console.log("***listChoiceIngredients");
											console.log(listChoiceIngredients);

											function updateChoiceAppareilsFunction(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												appareilsContainer.innerHTML = "";

												for(let i=0; i< listChoiceIngredients.length; i++){ 
				
				
													let appareilsValue2 = listChoiceIngredients[i].appliance;
												
													//insersion des valeurs
													listAppareils.push(appareilsValue2);
					
												}

												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let appareilsValue3 = [...new Set(listAppareils)];

												for(let i=0; i< appareilsValue3.length; i++){ 
				
				
													let appareilsValue2 = appareilsValue3[i];
								
													const differentClassFilter = "tagAppareils";

													//création du li 
													createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
												}

											}
											updateChoiceAppareilsFunction();
											


											function updateChoiceUstensilsFunction(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												ustensilesContainer.innerHTML = "";

												for(let i=0; i< listChoiceIngredients.length; i++){ 
						
													//liste 
													let UstensilesValue1 = listChoiceIngredients[i].ustensils;
												
														
													for(let l=0; l< UstensilesValue1.length; l++){ //UstensilesValue1

														let UstensilesValue = UstensilesValue1[l];
														listUstensils.push(UstensilesValue);
						

													}

									
												}

												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let ustensilsValue3 = [...new Set(listUstensils)];

												for(let i=0; i< ustensilsValue3.length; i++){ 
				
				
													let ustensilsValue2 = ustensilsValue3[i];
								
													const differentClassFilter = "tagUstensiles";

													//création du li 
													createLiFunction(ustensilsValue2, ustensilesContainer, differentClassFilter);
							
												}

											}
											updateChoiceUstensilsFunction();
											

											

										}else if(listChoiceAppareils && listChoiceIngredients.length === 0 && listChoiceUstensils.length === 0 ){
											
											console.log("***listChoiceAppareils");
											console.log(listChoiceAppareils);

											

											function updateChoiceIngredientsFunctionOne(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												ingredientsContainer.innerHTML = "";

												for(let i=0; i< listChoiceAppareils.length; i++){ 
						
													//liste 
													let ingredientsValue1 = listChoiceAppareils[i].ingredients;
													
													console.log("***ingredientsValue1");
													console.log(ingredientsValue1);
	
													for(let l=0; l< ingredientsValue1.length; l++){ //UstensilesValue1
	
														let ingredientsValue = ingredientsValue1[l].ingredient;
														listIngredients.push(ingredientsValue);
							
	
													}
	
												}
	
												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let ingredientValue3 = [...new Set(listIngredients)];
	
	
												for(let i=0; i< ingredientValue3.length; i++){ 
					
					
													let ingredientsValue2 = ingredientValue3[i];
									
													const differentClassFilter = "tagUstensiles";
	
													//création du li 
													createLiFunction(ingredientsValue2, ingredientsContainer, differentClassFilter);
								
												}

											}
											updateChoiceIngredientsFunctionOne();
						
									
											function updateChoiceUstensilsFunctionOne(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												ustensilesContainer.innerHTML = "";

											
												for(let i=0; i< listChoiceAppareils.length; i++){ 
						
													//liste 
													let UstensilesValue1 = listChoiceAppareils[i].ustensils;
												
													console.log("***UstensilesValue1");
													console.log(UstensilesValue1);

													for(let l=0; l< UstensilesValue1.length; l++){ //UstensilesValue1

														let UstensilesValue = UstensilesValue1[l];
														listUstensils.push(UstensilesValue);
						

													}
	
									
												}

												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let ustensilsValue3 = [...new Set(listUstensils)];

												console.log("****ustensilsValue3 après retrait doublons");
												console.log(ustensilsValue3);

												for(let i=0; i< ustensilsValue3.length; i++){ 
				
				
													let ustensilsValue2 = ustensilsValue3[i];
								
													const differentClassFilter = "tagUstensiles";

													//création du li 
													createLiFunction(ustensilsValue2, ustensilesContainer, differentClassFilter);
							
												}


											}
											updateChoiceUstensilsFunctionOne();
											


										}else if(listChoiceUstensils && listChoiceIngredients.length === 0 && listChoiceAppareils.length === 0 ){

											console.log("***listChoiceUstensils");
											console.log(listChoiceUstensils);

											function updateChoiceIngredientsFunctionSecond(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												ingredientsContainer.innerHTML = "";

												for(let i=0; i< listChoiceUstensils.length; i++){ 
						
													//liste 
													let ingredientsValue1 = listChoiceUstensils[i].ingredients;
													
													console.log("***ingredientsValue1");
													console.log(ingredientsValue1);
	
													for(let l=0; l< ingredientsValue1.length; l++){ //UstensilesValue1
	
														let ingredientsValue = ingredientsValue1[l].ingredient;
														listIngredients.push(ingredientsValue);
							
	
													}
	
												}
	
												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let ingredientValue3 = [...new Set(listIngredients)];
	
	
												for(let i=0; i< ingredientValue3.length; i++){ 
					
					
													let ingredientsValue2 = ingredientValue3[i];
									
													const differentClassFilter = "tagUstensiles";
	
													//création du li 
													createLiFunction(ingredientsValue2, ingredientsContainer, differentClassFilter);
								
												}

											}
											updateChoiceIngredientsFunctionSecond();

											////////////////
											/*
											//suppression de tous les éléments existants dans l'élément ou enfants
											ingredientsContainer.innerHTML = "";

											for(let i=0; i< listChoiceUstensils.length; i++){ 
						
						
												let ingredientListValue1 = listChoiceUstensils[i].ingredients;



												for(let l=0; l< ingredientListValue1.length; l++){ 

													let ingredientValue = ingredientListValue1[l].ingredient;


													const differentClassFilter = "tagIngredients";

													//création du li 
													createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);

												}
												
									
											}*/

				
											function updateChoiceAppareilsFunctionSecond(){

												//suppression de tous les éléments existants dans l'élément ou enfants
												appareilsContainer.innerHTML = "";

												for(let i=0; i< listChoiceUstensils.length; i++){ 
				
				
													let appareilsValue2 = listChoiceUstensils[i].appliance;
												
													//insersion des valeurs
													listAppareils.push(appareilsValue2);
					
												}

												//suppression des doublons et mise à jour des li
												//retrait des doublons 
												let appareilsValue3 = [...new Set(listAppareils)];

												for(let i=0; i< appareilsValue3.length; i++){ 
				
				
													let appareilsValue2 = appareilsValue3[i];
								
													const differentClassFilter = "tagAppareils";

													//création du li 
													createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
												}

											}
											updateChoiceAppareilsFunctionSecond();


										}

										
									});
								}

								

							}
							btnFilterChoiceFunction();


							//récupération des listes issues des recherches des filtres
							

						}
						setListDataFilterFunction();
						
						
					});
			
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
