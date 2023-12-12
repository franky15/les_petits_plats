/* eslint-disable indent */
//récupération de la fonction
import getDatas from "../manageDatas.js"; //createFilterFunction
import { createFilterFunction } from "./filters.js";


//fonction asynchrone pemettant d'utiliser ou de récupérer la data 
export async function getDatasFunction(listChoiceLocalStorage) {

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


	let tagIngredientsLocalStorage = localStorage.getItem("valClassBtnIngredientsLi");
	
	


	//récupération de containerArticleRecette
	const containerArticleRecette = document.querySelector(".containerArticleRecette");
	
	let article;
	//fonction de creation de l'article
	function articleCreateFunction(recetteCurrent){


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
 
	}
	
	//affichage de toutes les recettes sur la page d'acceuil

	/////////////////////////
	if(listChoiceLocalStorage){ //.length !==0

		containerArticleRecette.innerHTML = "";

		for(let i=0; i<listChoiceLocalStorage.length; i++){

			let recetteCurrent = listChoiceLocalStorage[i];
	
			articleCreateFunction(recetteCurrent);
	
		}

	}else{

		console.log("*** bienvenue dans la condition  else listChoiceLocalStorage");

		containerArticleRecette.innerHTML = "";

		for(let i=0; i<listAllData.length; i++){

			let recetteCurrent = listAllData[i];
	
			articleCreateFunction(recetteCurrent);
	
		}
		
	}

	/////////////////////////



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
		
		
			// suppression de tous les éléments existants dans l'élément ou enfants
			containerArticleRecette.innerHTML = "";

			
			/****** gestion du filtre du titre de la recette ****/
			for(let j=0; j< listAllData.length; j++){
			
				let recetteCurrent = listAllData[j];

				if(listFilterNameSearchBar.length > 0 ){

					//for(let i=0; i<listFilterNameSearchBar.length; i++){


						//////////////////////
						//let recetteCurrent = listAllData.filter();

						///////////////////////

						//console.log(recetteCurrent.name.toUpperCase() === valInput.toUpperCase())

						//vérification si l'input correspont à la description de la recette encours
						if(  recetteCurrent.name.toUpperCase() === valInput.toUpperCase() ){  //(recetteCurrent.name ).includes(valInput) 
	
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

			

			//stockage de listRicepsFilter dans le localstorage
			// Convertion  listRicepsFilter en chaîne JSON
			let listRicepsFilterStringify = JSON.stringify(listRicepsFilter);

			// Stockage la chaîne JSON dans le local storage avec une clé
			localStorage.setItem( "listRicepsFilter", listRicepsFilterStringify);


			// Récupération et conversion de listRicepsFilter la chaîne JSON du localStorage
			let listRicepsFilterJSON = JSON.parse(localStorage.getItem("listRicepsFilter"));

			// console.log("***listRicepsFilterJSON dans carrd");
			// console.log(listRicepsFilterJSON);

			//transfert de la listRicepsFilterJSON vers la fonction ou le fichier filters.js
			createFilterFunction(listRicepsFilterJSON);

	});

	let valInputLocalStorage = localStorage.getItem("valInput");
	

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


	
}

export default getDatasFunction(); 

