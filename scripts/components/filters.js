
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

						console.log("***classBtn");
						console.log(classBtn);

									
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
	
				const differentClassFilter = "tagIngredients";

				for(let i=0; i< inputIngredientsList.length; i++){  
	
	
					let ingredientValue = inputIngredientsList[i];
	
					//création du li 
					createLiFunction(ingredientValue, ingredientsContainer, differentClassFilter);
		
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
									
				const differentClassFilter = "tagAppareils";

				for(let i=0; i< inputAppareilsList.length; i++){ 
	
	
					let AppareilsValue = inputAppareilsList[i];
	
					//création du li 
					createLiFunction(AppareilsValue, appareilsContainer, differentClassFilter);
		
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
									
				const differentClassFilter = "tagUstensiles";

				for(let i=0; i< inputUstensilesList.length; i++){ 
	
	
					let UstensilesValue = inputUstensilesList[i];
	
					//création du li 
					createLiFunction(UstensilesValue, ustensilesContainer, differentClassFilter);
		
				}
	
	
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

			/*let listChoiceAppareils = [];
			let listChoiceIngredients = [];
			let listChoiceUstensils = [];*/

			function ingredientsChoiceFunction(){

				 console.log("***listChoiceIngredients");
				console.log(listChoiceIngredients);


				if(listChoiceAppareils.length !==0  ){

					console.log("** listChoiceAppareils");
					console.log(listChoiceAppareils);
					
					let listAppareilsConcat = [];


					const differentClassFilter = "tagIngredients";
					


					for(let i=0; i< listChoiceAppareils.length; i++){ 
				
						ingredientsContainer.innerHTML= "";
						
						let ingredientsValue2List = listChoiceAppareils[i].ingredients;
								
						console.log("** ingredientsValue2List");
						console.log(ingredientsValue2List);

						for(let ig=0; ig<ingredientsValue2List.length; ig++){


							let ingredientsValue2 = ingredientsValue2List[ig].ingredient;

							// console.log("** ingredientsValue2");
							// console.log(ingredientsValue2);

							listAppareilsConcat.push(ingredientsValue2);

							//création du li 
							// createLiFunction(ingredientsValue2, ingredientsContainer, differentClassFilter);

						}


						
							
							
					}

					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];

					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);

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

							console.log("***valClassBtnLi");
							console.log(valClassBtnLi);

							// let differentClassFilter = btnCurrent.classList[2];
													
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
			
							//récupération des recettes qui correspondent à la sélection du filtre
												
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceAppareils.length; l++){

								let listappareilObject = listChoiceAppareils[l].ingredients;
								let objectAppareil = listChoiceAppareils[l];
								
								for(let j=0; j<listappareilObject.length; j++ ){

									let listappareilObjectCurrent = listappareilObject[j].ingredient;
									//let objectAllDataCurrent = listIngredientsVal[j].ingredient;

									console.log("***listappareilObjectCurrent");
									console.log(listappareilObjectCurrent);

					

									if(listappareilObjectCurrent ){
		
										if(valClassBtnLi.replace(/\s+/g, "").toUpperCase() === listappareilObjectCurrent.replace(/\s+/g, "").toUpperCase() ){
				
											console.log("*** bienvenue dans le if appareilVal replace  de ingredients");
				
											// console.log("***objectAllDataCurrent");
											// console.log(objectAllDataCurrent);
				
											listChoiceIngredients=[];
											listChoiceIngredients.push(objectAppareil);
				
										
											//stockage de la valeur du li ou du btn dans le localstorage
											// localStorage.setItem( "listChoiceIngredients", JSON.stringify(listChoiceIngredients));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceIngredients));
													
											applianceChoiceFunction();
											ustensilsChoiceFunction();
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

					console.log("** listChoiceUstensils dans tagAppareils");
					console.log(listChoiceUstensils);
					//let differentClassFilter = btnCurrent.classList[2];

							

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					// let listUstensilsConcat = [...new Set(listChoiceUstensils)];
					let listValIngredientsConcat =[];

					console.log("***listChoiceUstensils");
					console.log(listChoiceUstensils);

		
					const differentClassFilter = "tagIngredients";
					ingredientsContainer.innerHTML= "";



					for(let i=0; i< listChoiceUstensils.length; i++){ 
				
				
						let listIngredients = listChoiceUstensils[i].ingredients;
						let objectIngredients = listChoiceUstensils[i];
								
						console.log("** listIngredients");
						console.log(listIngredients);

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

						
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);

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
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

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
			
											// console.log("***ingredientsValueCurrent");
											// console.log(ingredientsValueCurrent);
			
											
											listChoiceIngredients.push(objectIngredientsCurrent);
			
									
											//stockage de la valeur du li ou du btn dans le localstorage
											// localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
												
											ustensilsChoiceFunction();
											applianceChoiceFunction();
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

						/*console.log("*** mon btnCurrent");
						console.log(btnCurrent);*/

						let differentClassFilter = btnCurrent.classList[2];

						//vérification si on est sur le bon filtres
						if(differentClassFilter === "tagIngredients"){


							btnCurrent.addEventListener("click", ()=>{  //.replace(/\s+/g, "")

								console.log("** bienvenue dans  tagIngredients");

			
								// console.log("*** mon btnCurrent");
								// console.log(btnCurrent);

								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
					
								// let differentClassFilter = btnCurrent.classList[2];
										
								//stockage de la valeur du li ou du btn dans le localstorage
								localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));

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

													console.log("***valObjectIngredients");
													console.log(valObjectIngredients);

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

					console.log("** listChoiceIngredients dans tagAppareils");
					console.log(listChoiceIngredients);
					//let differentClassFilter = btnCurrent.classList[2];

					

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";



					for(let i=0; i< listChoiceIngredients.length; i++){ 
				
				
						let appareilsValue2 = listChoiceIngredients[i].appliance;
								
						listAppareilsConcat.push(appareilsValue2);

						console.log("** appareilsValue2");
						console.log(appareilsValue2);


						//création du li 
						//createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
							
					}

					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];

					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);

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
			
							console.log("***listChoiceIngredients");
							console.log(listChoiceIngredients);
						
							// console.log("*** mon btnCurrent");
							// console.log(btnCurrent);
			
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagAppareilsLiId.substring(9,tagAppareilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
													
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

							//récupération des valeurs selectionnées du localstorage
							const valChoiceFilter = localStorage.getItem(differentClassFilter);
			
							//récupération des recettes qui correspondent à la sélection du filtre
												
							let listValFilterTest = ["ingredients", "ustensils" ];

							for(let l=0; l<listChoiceIngredients.length; l++){

								let objectAllDataCurrent = listChoiceIngredients[l];
			
													
								if(objectAllDataCurrent.appliance ){
		
									if(valClassBtnLi.toUpperCase() === objectAllDataCurrent.appliance.replace(/\s+/g, "").toUpperCase() ){
		
										console.log("*** bienvenue dans le if ustensils replace ");
		
										console.log("***objectAllDataCurrent.appliance");
										console.log(objectAllDataCurrent.appliance);
		
										//listChoiceAppareils=[];
										listChoiceAppareils.push(objectAllDataCurrent);
		
								
										//stockage de la valeur du li ou du btn dans le localstorage
										//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
										localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
											
										ingredientsChoiceFunction();
										ustensilsChoiceFunction();
										
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

					console.log("** listChoiceUstensils dans tagAppareils");
					console.log(listChoiceUstensils);
					//let differentClassFilter = btnCurrent.classList[2];

							

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listAppareilsConcat = [];


					const differentClassFilter = "tagAppareils";
					appareilsContainer.innerHTML= "";



					for(let i=0; i< listChoiceUstensils.length; i++){ 
				
						//appareilsContainer.innerHTML= "";

						let appareilsValue2 = listChoiceUstensils[i].appliance;
								
						listAppareilsConcat.push(appareilsValue2);

						console.log("** appareilsValue2");
						console.log(appareilsValue2);


						//création du li 
						//createLiFunction(appareilsValue2, appareilsContainer, differentClassFilter);
							
							
					}

					
					//retrait des doublons 
					let listAppareilsConcat2 = [...new Set(listAppareilsConcat)];

					for(let l=0; l<listAppareilsConcat2.length; l++){

						let listIngredientsConcatCurrent = listAppareilsConcat2[l];

						
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);

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
			
							console.log("***listChoiceUstensils");
							console.log(listChoiceUstensils);
						
							// console.log("*** mon btnCurrent");
							// console.log(btnCurrent);
			
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
													
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

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
			
										console.log("***appareilsValueCurrent");
										console.log(appareilsValueCurrent);
			
										//listChoiceAppareils=[];
										listChoiceAppareils.push(listChoiceUstensilsCurrent);
			
									
										//stockage de la valeur du li ou du btn dans le localstorage
										//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
										localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));
												
										ingredientsChoiceFunction();
										ustensilsChoiceFunction();
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

			
								// console.log("*** mon btnCurrent");
								// console.log(btnCurrent);

								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
					
								console.log("*** valClassBtnLi");
								console.log(valClassBtnLi);	

								// let differentClassFilter = btnCurrent.classList[2];
										
								//stockage de la valeur du li ou du btn dans le localstorage
								localStorage.setItem( "valClassBtnLi", JSON.stringify(valClassBtnLi));

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

											console.log("***valAppareils");
											console.log(valAppareils);

											//stockage de la valeur du li ou du btn dans le localstorage
											//localStorage.setItem( "listChoiceAppareils", JSON.stringify(listChoiceAppareils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceAppareils));

										}

									}


								}

								ingredientsChoiceFunction();
								ustensilsChoiceFunction();

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

					console.log("** listChoiceAppareils");
					console.log(listChoiceAppareils);
					
					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listUstensilsConcat = [];


					const differentClassFilter = "tagUstensiles";
					


					for(let i=0; i< listChoiceAppareils.length; i++){ 
				
						ustensilesContainer.innerHTML= "";
						
						let ustensilsValue2List = listChoiceAppareils[i].ustensils;
								
						console.log("** ustensilsValue2List");
						console.log(ustensilsValue2List);

						for(let u=0; u<ustensilsValue2List.length; u++){


							let ustensilsValue2 = ustensilsValue2List[u];

							// console.log("** ustensilsValue2");
							// console.log(ustensilsValue2);

							listUstensilsConcat.push(ustensilsValue2);

							//création du li 
							//createLiFunction(ustensilsValue2, ustensilesContainer, differentClassFilter);

						}


						
							
							
					}

					//retrait des doublons 
					let listUstensilsConcat2 = [...new Set(listUstensilsConcat)];

					for(let l=0; l<listUstensilsConcat2.length; l++){
	
						let listUstensilsConcatCurrent = listUstensilsConcat2[l];
	
							
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);
	
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
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);

							console.log("***valClassBtnLi");
							console.log(valClassBtnLi);

							// let differentClassFilter = btnCurrent.classList[2];
													
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

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

									console.log("***ustensilsValueCurrent");
									console.log(ustensilsValueCurrent);

					

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

					console.log("** listChoiceIngredients dans tagAppareils");
					console.log(listChoiceIngredients);
					//let differentClassFilter = btnCurrent.classList[2];

							

					//suppression des doublons et mise à jour des li
					//retrait des doublons 
					let listUstensilsConcat = [];


					const differentClassFilter = "tagUsteniles";
					//ustensilesContainer.innerHTML= "";



					for(let i=0; i< listChoiceIngredients.length; i++){ 
				
						ustensilesContainer.innerHTML= "";

						let listustensilsValue2 = listChoiceIngredients[i].ustensils;
								
						console.log("** listustensilsValue2");
						console.log(listustensilsValue2);

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
			
									
						// console.log("** listIngredientsConcatCurrent");
						// console.log(listIngredientsConcatCurrent);
			
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
			
							console.log("***listChoiceIngredients");
							console.log(listChoiceIngredients);
						
							// console.log("*** mon btnCurrent");
							// console.log(btnCurrent);
			
							//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
							// let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
							let valClassBtnLi = tagUstensilsLiId.substring(9,tagUstensilsLiId.length);


							// let differentClassFilter = btnCurrent.classList[2];
													
							//stockage de la valeur du li ou du btn dans le localstorage
							localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			

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
			
											console.log("***ustensilsCurrent");
											console.log(ustensilsCurrent);
			
											//listChoiceAppareils=[];
											listChoiceUstensils.push(objectIngredients);
			
									
											//stockage de la valeur du li ou du btn dans le localstorage
											//localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
											localStorage.setItem( "listChoice", JSON.stringify(listChoiceUstensils));
												
											applianceChoiceFunction();
											ingredientsChoiceFunction();
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
			
						
								// console.log("*** mon btnCurrent");
								// console.log(btnCurrent);
			
								//récupération du contenue de la chaine du caractère 9 jusqu'au dernier
								let valClassBtnLi = BtnFilterCurrentValue.substring(9,BtnFilterCurrentValue.length);
								
								let differentClassFilter = btnCurrent.classList[2];
													
								//stockage de la valeur du li ou du btn dans le localstorage
								localStorage.setItem( differentClassFilter, JSON.stringify(valClassBtnLi));
			
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
										
												console.log("***valObjectUstensils");
												console.log(valObjectUstensils);
		
												//stockage de la valeur du li ou du btn dans le localstorage
												//localStorage.setItem( "listChoiceUstensils", JSON.stringify(listChoiceUstensils));
												localStorage.setItem( "listChoice", JSON.stringify(listChoiceUstensils));
												
												applianceChoiceFunction();
												ingredientsChoiceFunction();
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
	//console.log(keywordsTaglistFilter);
    
	//fonction de création des tags des filtres
	const keywordsTagFilterFunction = (tagValue, tagTexContent) => {

		const keywordsTagFilter = `

            <li class="${"keyword"+tagValue} keywordContainer" >

                <p   class="${"keyword"} keywordContainer__btn">

                    ${tagTexContent}
                            
                </p>
                <span class="keywordContainer__delete"> <i class="fa-solid fa-circle-xmark btnDeleteTag" data-keyWord=${"keyword text"} ></i> </span>
            
            </li>

            
        `;
		keywordsTaglistFilter.innerHTML= keywordsTagFilter;


	};
	// keywordsTagFilterFunction();

	function showTagFunction(){


		//récupération des valeurs des tags du localstorage

	}



	/*
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
	*/


    
	


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













