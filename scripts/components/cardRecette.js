/* eslint-disable indent */
//récupération de la fonction
import getDatas from "../manageDatas.js"; //createFilterFunction



//fonction asynchrone pemettant d'utiliser ou de récupérer la data 
export async function getDatasFunction() {

	//récupération des données 
	let listRicepsFilter = [];
	let listdatasPartiel;
	let listDescription;
	let listAllData;
	let ustencilsListFilter;
	let ingredientsListFilter;
	let applianceListFilter;
	

	try {
        
		//car getDatas retourne responseData qui est une liste
		let responseData = await getDatas;
		
		//je converti ensuite la réponse pendant un certain temps en json
		let responseDataJson = await responseData;

		listdatasPartiel = responseDataJson[0];
		listDescription = responseDataJson[1];
		listAllData = responseDataJson[2];
		ustencilsListFilter = responseDataJson[3];
		ingredientsListFilter = responseDataJson[4];
		applianceListFilter = responseDataJson[5];
	
	} catch (error) {

		console.error("Erreur dans la requête :", error);
	}

	// console.log("***listAllData");
	// console.log(listAllData);
	// console.log("*** listdatasPartiel");
	// console.log(listdatasPartiel);


	//récupération de containerArticleRecette
	const containerArticleRecette = document.querySelector(".containerArticleRecette");
	
	let article;
	//fonction de creation de l'article
	const articleCreateFunction = (recetteCurrent) => {

		//console.log(recetteCurrent);

		article = `

        
            <article class="containerArticleRecette__article ${ (recetteCurrent.name).replace(/\s+/g, "") }" >
               
                <div class="imgContainer"
                    style="background-image: url('../../assets/images/${recetteCurrent.image}');
                    background-repeat: no-repeat;  background-position:  center center;
                    background-size: cover;  border-radius: 15px 15px 0px 0px;"
                
                >
                    <p class="imgContainer__time" > ${recetteCurrent.time + "min"} </p>
                </div>
            
                <section class="recetteContainerSection">

                    <h2> ${recetteCurrent.name} </h2>

                    <div class="recetteContainer">

                        <h3 class="recetteContainer__title"> Recette </h3>
                        <p class="recetteContainer__description"> ${recetteCurrent.description} </p>

                    </div>
                    <h3 class="ingredientContainer__title"> Ingredients </h3>
                    
                    
                    <div class="ingredientColumnsContainer">

                        <div class="ingredientContainer  ${ "column1" + (recetteCurrent.id).toString() }"> 

                        </div>
                        <div class="ingredientContainer  ${ "column2" + (recetteCurrent.id).toString() }"> 

                        </div>

                    </div>
                    

                </section>

            </article>
        `;
        
		containerArticleRecette.innerHTML += article;
		
		
		//récupération du container ou de la colone des ingrédients
		let column1 = document.querySelector(`${ ".column1"+ (recetteCurrent.id).toString()}`);
		let column2 = document.querySelector(`${ ".column2"+ (recetteCurrent.id).toString()}`);
		//console.log(column1);
		//ingredientColumnsContainer

        
		//fonction de creation des éléments des ingredients
		const ingredientsItemFunction = () => {

			//gestion de la liste et des deux colones de la partie description
			let ingredientsItem;

			const sousListesFinal = [];

			//pas de la boucle car on 3 éléments par colone
			const tailleSousListe = 3; 
            
			//optension de la liste ayant des colones
			for (let i = 0; i < recetteCurrent.ingredients.length; i += tailleSousListe) {
            
				const sousListeCurrent = recetteCurrent.ingredients.slice(i, i + tailleSousListe);
				sousListesFinal.push(sousListeCurrent);
			}

			for(let u=0; u< sousListesFinal.length; u++){

				let ingredientsCurrentList = sousListesFinal[u];

				if(u === 0){

					for(let k=0; k<ingredientsCurrentList.length; k++){

						let ingredientsCurrent = ingredientsCurrentList[k];
                        
						ingredientsItem = `

                            <div class="ingredientContainer__child">
                                <p class="ingredients"> ${ingredientsCurrent.ingredient} </p>
                                <span class="ingredientsMesure">
                                 ${
                                    ingredientsCurrent.unit ?
                                    ingredientsCurrent.quantity +ingredientsCurrent.unit
                                    :
                                    ""
                                } 
                                 </span>

                            <div>
                        `;
                        
						column1.innerHTML += ingredientsItem;
						
                
					} 

				}else{

					for(let k=0; k<ingredientsCurrentList.length; k++){

						let ingredientsCurrent = ingredientsCurrentList[k];
                        
						ingredientsItem = `

                        <div class="ingredientContainer__child">
                            <p class="ingredients"> ${ingredientsCurrent.ingredient} </p>
                            <span class="ingredientsMesure">
                                ${
                                ingredientsCurrent.unit ?
                                ingredientsCurrent.quantity +ingredientsCurrent.unit
                                :
                                 ""
                                } 
                            </span>
                        <div>
                    `;
                    
						column2.innerHTML += ingredientsItem;
                

					} 
					
				}
			}
            
		};
		
		ingredientsItemFunction();
 
	};
	
	//affichage de toutes les recettes sur la page d'acceuil
	for(let i=0; i<listAllData.length; i++){

		let recetteCurrent = listAllData[i];

		articleCreateFunction(recetteCurrent);

	}


	//searchBarFunction();
	//gestion de la value de la searchbar
	const inputSearch = document.querySelector(".inputSearch");
	//console.log(inputSearch);
	
	
	//listes des recettes récupérées après recherche
	// let listRicepsFilter = [];
	
	inputSearch.addEventListener( "input", (e)=> {

		//listes des recettes récupérées après recherche
		//let listRicepsFilter = [];

		//
		let ingredientCurrentFilter = [];

		let valInput = e.target.value;
		// console.log(valInput);

		
		inputSearch.setAttribute("value" , `${valInput}`);
		
		//stockage de valInput dans le local storage

		localStorage.setItem("valInput", valInput);
		
		//let valInputLocalStorage = localStorage.getItem("valInput");
		//console.log(valInputLocalStorage);
		

		//obtension des listes de recette qui correspondent à l'input de la recherche en fonction des catégories correspondantes
		let listFilterNameSearchBar = listAllData.filter( item => item.name.includes(`${valInput}`) );
		let listFilterDescriptionSearchBar = listAllData.filter( item => item.description.includes(`${valInput}`) );

		/*
		console.log("***listFilterNameSearchBar")
		console.log(listFilterNameSearchBar)
		console.log("****listFilterDescriptionSearchBar")
		console.log(listFilterDescriptionSearchBar)*/
		
		//if(valInput ){  //valInputLocalStorage

			/*
			// Suppression de tous les enfants de la section
			while (containerArticleRecette.firstChild) {
				containerArticleRecette.removeChild(containerArticleRecette.firstChild);
			}*/

			// suppression de tous les éléments existants dans l'élément ou enfants
			containerArticleRecette.innerHTML = "";

			
			/****** gestion du filtre du titre de la recette ****/
			for(let j=0; j< listAllData.length; j++){
			
				let recetteCurrent = listAllData[j];

				if(listFilterNameSearchBar.length > 0 ){

					console.log("***bienvenue dans name")

					//for(let i=0; i<listFilterNameSearchBar.length; i++){


						//////////////////////
						//let recetteCurrent = listAllData.filter();

						///////////////////////

						//console.log(recetteCurrent.name.toUpperCase() === valInput.toUpperCase())

						//vérification si l'input correspont à la description de la recette encours
						if(  recetteCurrent.name.toUpperCase() === valInput.toUpperCase() ){  //(recetteCurrent.name ).includes(valInput) 
	
							// console.log(recetteCurrent.name.toUpperCase())
							// console.log(valInput)

							console.log("***** condition name Limonade de Coco")
	
							//insersion des receptes dans la liste
							listRicepsFilter.push(recetteCurrent)
							articleCreateFunction(recetteCurrent);
							
						
						
						}
						
	
					//}

				}else if(listFilterDescriptionSearchBar.length > 0 ){

					console.log("***bienvenue dans description")

					//gestion du filtre de la description de la recette 
					
					//for(let i=0; i<listFilterDescriptionSearchBar.length; i++){

						//let recetteDescriptionCurrent = listFilterDescriptionSearchBar[i];
						

						//vérification si l'input correspont à la description de la recette encours
						if( (recetteCurrent.description).includes(valInput) ){ //recetteDescriptionCurrent.description

							//insersion des receptes dans la liste
							listRicepsFilter.push(recetteCurrent)

							articleCreateFunction(recetteCurrent);

						}

					//}


				}else if(listFilterDescriptionSearchBar.length === 0 && listFilterNameSearchBar.length === 0 ){

					console.log("***bienvenue dans ingredients")

					let ingredientObjectCurrent = recetteCurrent.ingredients;
				
					for( let i=0; i< ingredientObjectCurrent.length; i++){

						let ingredientObjectCurrent2 = ingredientObjectCurrent[i];

						//vérification si l'input correspont à la description de la recette encours
						if( (ingredientObjectCurrent2.ingredient).includes(valInput) ){  //(valInput).includes(ingredientObjectCurrent2.ingredient

							console.log("**** ingredient inclu dans la recherche")

							//insersion des receptes dans la liste
							ingredientCurrentFilter.push( recetteCurrent); //ingredientObjectCurrent2
							
							listRicepsFilter = [...ingredientCurrentFilter];
							articleCreateFunction(recetteCurrent);
						
						}


					}

				}

			}

			createFilterFunction(listRicepsFilter);

			// console.log("***listRicepsFilter")
			// console.log(listRicepsFilter)

			//stockage de listRicepsFilter dans le localstorage
			// Convertion  listRicepsFilter en chaîne JSON
			let listRicepsFilterStringify = JSON.stringify(listRicepsFilter);

			// Stockage la chaîne JSON dans le local storage avec une clé
			localStorage.setItem( "listRicepsFilter", listRicepsFilterStringify);

	});

	let valInputLocalStorage = localStorage.getItem("valInput");
	console.log(valInputLocalStorage);

	//fermeture de la searchbar

	const deleteValueInput = () => {

		//fonction de suppression du contenu de la search bar 
		const btnDelete = document.querySelector(".btnDelete");
		const inputSearch = document.querySelector(".inputSearch");

		btnDelete.addEventListener("click", ()=>{

			inputSearch.value = "";
			// Supprimez la clé du local storage
			localStorage.removeItem("valInput");

			//////////////
			for(let i=0; i<listAllData.length; i++){

				let recetteCurrent = listAllData[i];
		
				articleCreateFunction(recetteCurrent);
		
			}

			////////////

			console.log("click sur le bouton de suppression");
		});

	};
	deleteValueInput();



	/////////////////////////////////////


	// //liste des titres des filtres
	let listTitleFilters =[ "Ingredients", "Appareils", "Ustensiles" ];


	////////////////////////////////////


	/********************* gestion des filtres ******************************* */

	/////////////////////////////::




	/////////////////////////////::


	//fonction de creation des filtres de recettes
	function createFilterFunction(){

		
		console.log("*** listRicepsFilter récupéré ici")
		console.log(listRicepsFilter)
		/*
		console.log("*** listAllData");
		console.log(listAllData);
		console.log("*** ustencilsListFilter");
		console.log(ustencilsListFilter);
		console.log("*** ingredientsListFilter");
		console.log(ingredientsListFilter);
		console.log("*** applianceListFilter");
		console.log(applianceListFilter);*/
	
		/********************* gestion des filtres ******************************* */
		
		/*
		//récupération du container des filtres
		// const filtersContainer = document.querySelector(".filters__container");
		const btnfilter = document.querySelector(".btnfilter");

		function createFilterItemFunction(listTitleFiltersCurrent){
			
			let  filter = `
				
				<div class="containerFilterBtn" >

					<button class="recettesBtn" >
					
						<span class="titleBtnMain ${listTitleFiltersCurrent}" > ${listTitleFiltersCurrent} </span>
						<span class="arrow arrowDown" > <i class="fa-solid fa-chevron-down"></i> </span>
						<span class="arrow arrowUp" style="display: none;" > <i class="fa-solid fa-chevron-up"></i> </span>
			
					</button>
					

					
					<ul  class="filters__container--filter listeUlContainer filterForm2" id="${listTitleFiltersCurrent}"  style="display: block;">
							
						<li class="optionBar" >  
						
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
	
			// filtersContainer.innerHTML += filter;
			btnfilter.innerHTML += filter;
			
		}
		//createFilterItemFunction();
		*/
		
		const listBtnRecette = document.getElementsByClassName("recettesBtn");
		
		//récupération des filtres
		const filterForm2 = document.getElementsByClassName("filterForm2");
		console.log(filterForm2)

		//récupération des filtres
		const listArrowDown = document.getElementsByClassName("arrowDown");

		const listArrowUp = document.getElementsByClassName("arrowUp");
		//console.log(listArrow)

		//liste des valeurs des arrows
		let listArrowDownFilters = [ "arrowDownIngredients", "arrowDownAppareils", "arrowDownUstensiles" ];
		let listArrowUpFilters = [ "arrowUpIngredients", "arrowUpAppareils", "arrowUpUstensiles" ];
		
		//ajout des class dans 
		for(let f=0; f<filterForm2.length; f++){

			let filterFormCureent = filterForm2[f];
			let valueIdFiltre = filterFormCureent.id;
			/*console.log("***valueId")
			console.log(valueId)*/

			for(let i=0; i< listBtnRecette.length; i++){

				let listBtnRecetteCurrent = listBtnRecette[i];
				
				//récupération de la deuxième class
				let valueSecondClass = listBtnRecetteCurrent.classList[1];
				
				//récupération de id de l'élément en cours
				let classBtn = document.querySelector(`${"."+valueSecondClass}`);


				if( valueSecondClass.trim() === valueIdFiltre){

					////////////////////////////////

					for(let a=0; a<listArrowDown.length; a++){

						let listArrowDownElement = listArrowDown[a];
						let listArrowDownCurrent = listArrowDownElement.classList[1];
 
						//récupération de id de l'élément en cours
						let classArrowDown = document.querySelector(`${"."+listArrowDownCurrent}`);

						

						for(let u=0; u<listArrowDownFilters.length; u++){

							let listArrowDownFiltersCurrent = listArrowDownFilters[u];

						
				

							if( listArrowDownFiltersCurrent === listArrowDownCurrent ){

								
								//insersion des évennement dans les boutons
								classBtn.addEventListener("click", ()=>{  //listBtnRecetteCurrent 

									// listArrowDownElement.style.display = "none";

									classArrowDown.style.display = "none";
									//listBtnRecetteCurrent.classList.add(listTitleBtnCurrent);
									
									console.log("***** j'ai clické sur le bouton")
								
									filterFormCureent.style.display = "block";

									
									//////:
									
									///////
								
								});

			

							}

							//insersion des évennement dans les boutons
							classBtn.addEventListener("click", ()=>{ 

								console.log("**** deuxième clique");

								//////:
								for(let d=0; d<listArrowUpFilters.length; d++){

									let listArrowUpFiltersElement = listArrowUpFilters[d];


									for(let dd=0; dd<listArrowUp.length; dd++){

										let listArrowElement2 = listArrowUp[d];
										let listArrowCurrent2 = listArrowElement2.classList[1];

										//récupération de id de l'élément en cours
										let classArrowUp = document.querySelector(`${"."+listArrowCurrent2}`);

										console.log("***listArrowCurrent2")
										console.log(listArrowCurrent2)

										if( listArrowUpFiltersElement === listArrowCurrent2){

											
											// listArrowElement2.style.display = "block";

											classArrowUp.style.display = "block";

										}

									}


	
								}
								///////

							});
							
	
						}

					}

					///////////////////////:
			
				}


			}


		}


		///////////////////////////////////////
	
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
	// createFilterFunction();

	


	/////////////////////////////////////


	
}

getDatasFunction(); 

