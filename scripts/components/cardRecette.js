/* eslint-disable indent */
//récupération de la fonction
import getDatas from "../manageDatas.js"; //createFilterFunction
import { createFilterFunction } from "./filters.js";


//fonction asynchrone pemettant d'utiliser ou de récupérer la data 
export async function getDatasFunction(listChoiceLocalStorage, uniqueList) {


	//récupération des données 
	let listRicepsFilter = [];
	let NewListResultSearchBar=[];
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

	let tagIngredientsLocalStorage = localStorage.getItem("valClassBtnIngredientsLi");
	
	

	console.log("***uniqueList dans cardRecettes")
	console.log(uniqueList)

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

	console.log("*** test uniqueList")
	console.log(uniqueList)

	console.log("*** test listChoiceLocalStorage")
	console.log(listChoiceLocalStorage)

	function showAllRicepsFunction(){


	
		if( !uniqueList && listChoiceLocalStorage){ 

			containerArticleRecette.innerHTML = "";

			for(let i=0; i<listChoiceLocalStorage.length; i++){

				let recetteCurrent = listChoiceLocalStorage[i];
		
				articleCreateFunction(recetteCurrent);
		
			}

		}else if(uniqueList && listChoiceLocalStorage ){  ///////////////////////

			console.log("*** condition uniqueList")
			console.log(uniqueList)

			containerArticleRecette.innerHTML = "";

			for(let i=0; i<uniqueList.length; i++){

				let recetteCurrent = uniqueList[i];
		
				articleCreateFunction(recetteCurrent);
		
			}

		}else{ ///////////////////////

			containerArticleRecette.innerHTML = "";

			for(let i=0; i<listAllData.length; i++){

				let recetteCurrent = listAllData[i];
		
				articleCreateFunction(recetteCurrent);
		
			}
			
		}
	}
	showAllRicepsFunction();
	

	//récupération de la croix du champ de recherche principal
	let btnDeleteSearchBarMain = document.querySelector(".btnDeleteSearchBarMain")

	//gestion de la value de la searchbar
	const inputSearch = document.querySelector(".inputSearch");
	

	//affichage de la quantité des recettes
	function showNumberRiceptsFunction(){

		let numberRecettes = document.getElementsByClassName("containerArticleRecette__article");
		let numberRecettesElement = document.querySelector(".filters__numberRecetteValue");
		numberRecettesElement.textContent=`${numberRecettes.length}`;

		
	}
	showNumberRiceptsFunction();
	

	inputSearch.addEventListener( "input", (e)=> {

		let ingredientCurrentFilter = [];

		

		let valInput = e.target.value;
		//console.log(valInput);

		inputSearch.setAttribute("value" , `${valInput}`);
		
		//affichage de la croix
		if(valInput){
				
			
			btnDeleteSearchBarMain.style.display = "block";
				

		}else{

			

			btnDeleteSearchBarMain.style.display = "none";
		}

		//fonction de gestion de la searchbar principale
		function manageSearchBarMainFunction(){


		
			//stockage de valInput dans le local storage

			localStorage.setItem("valInput", valInput);
			
			//obtension des listes de recette qui correspondent à l'input de la recherche en fonction des catégories correspondantes
			let listFilterNameSearchBar = listAllData.filter( item => item.name.toUpperCase().includes(`${valInput.toUpperCase()}`) || item.name.toLowerCase().includes(`${valInput.toLowerCase()}`));
			let listFilterDescriptionSearchBar = listAllData.filter( item => item.description.toUpperCase().includes(`${valInput.toUpperCase()}`) || item.description.toLowerCase().includes(`${valInput.toLowerCase()}`) );
			
			
			// suppression de tous les éléments existants dans l'élément ou enfants
			containerArticleRecette.innerHTML = "";

			
			/****** gestion du filtre du titre de la recette ****/
			
			
			
			for(let j=0; j< listAllData.length; j++){
			
				let recetteCurrent = listAllData[j];

				

				if(listFilterNameSearchBar.length > 0 ){

					console.log("**bienvenue à la condition listFilterNameSearchBar");

					//vérification si l'input correspont à la description de la recette encours
					if(  recetteCurrent.name.toUpperCase().includes(valInput.toUpperCase()) 
						|| recetteCurrent.name.toLowerCase().includes(valInput.toLowerCase())
					
					
					){  

						//listRicepsFilter=[];

						//insersion des receptes dans la liste
						listRicepsFilter.push(recetteCurrent);
						articleCreateFunction(recetteCurrent);
						
						//affichage de la quantité des recettes
						showNumberRiceptsFunction();
					
					
					}
					
				}else if(listFilterDescriptionSearchBar.length > 0 ){

					console.log("***bienvenue dans description")

					//vérification si l'input correspont à la description de la recette encours
					if( recetteCurrent.description.toUpperCase().includes(valInput.toUpperCase())
						|| recetteCurrent.description.toLowerCase().includes(valInput.toLowerCase())
					
					){ 

						//listRicepsFilter=[];

						//insersion des receptes dans la liste
						listRicepsFilter.push(recetteCurrent)

						articleCreateFunction(recetteCurrent);

						//affichage de la quantité des recettes
						showNumberRiceptsFunction();

					}

				}else if(listFilterDescriptionSearchBar.length === 0 && listFilterNameSearchBar.length === 0 ){


					console.log("***les deux existent")

					let ingredientObjectCurrent = recetteCurrent.ingredients;
				
					for( let i=0; i< ingredientObjectCurrent.length; i++){

						let ingredientObjectCurrent2 = ingredientObjectCurrent[i];

						//vérification si l'input correspont à la description de la recette encours
						if( (ingredientObjectCurrent2.ingredient).includes(valInput) ){  //(valInput).includes(ingredientObjectCurrent2.ingredient

							console.log("**** ingredient inclu dans la recherche")

							//insersion des receptes dans la liste
							ingredientCurrentFilter.push( recetteCurrent); //ingredientObjectCurrent2
							
							//listRicepsFilter=[];

							listRicepsFilter = [...ingredientCurrentFilter];
							articleCreateFunction(recetteCurrent);

							//affichage de la quantité des recettes
							showNumberRiceptsFunction();

						}


					}

				}
				

			}

			///////////////////////////////

			console.log("****listRicepsFilter avant")
			console.log(listRicepsFilter)

			//suppression des doublons dans les liste d'objects en fonction de l'id
			let listDataSearchBarMain = listRicepsFilter.filter((item, index, array) =>
				index === array.findIndex((item2) => item2.id === item.id)
			);


			listRicepsFilter=listDataSearchBarMain;
		}

		//exécution de la fonction si la searchbar a aumoins 3 caractères
		if(valInput.length >= 3){

			console.log("exécution de ma manageSearchBarMainFunction();")

			manageSearchBarMainFunction();

		}else{

			console.log("bienvenue dans le else de manageSearchBarMainFunction() ")
			
			containerArticleRecette.innerHTML = "";

			listRicepsFilter=[];

			console.log("****listRicepsFilter dans")
			console.log(listRicepsFilter)

			//exécution de la fonction de l'affichage de toutes les recettes initiales
			showAllRicepsFunction();

			//exécution de la fonction de l'affichage du nombre de recettes initiales
			showNumberRiceptsFunction();
		}
		



		///////////////////////////////


		

		console.log("****listRicepsFilter après")
		console.log(listRicepsFilter)

		//stockage de listRicepsFilter dans le localstorage
		// Convertion  listRicepsFilter en chaîne JSON
		let listRicepsFilterStringify = JSON.stringify(listRicepsFilter);

		// Stockage la chaîne JSON dans le local storage avec une clé
		localStorage.setItem( "listRicepsFilter", listRicepsFilterStringify);


		// Récupération et conversion de listRicepsFilter la chaîne JSON du localStorage
		let listRicepsFilterJSON = JSON.parse(localStorage.getItem("listRicepsFilter"));

		//transfert de la listRicepsFilterJSON vers la fonction ou le fichier filters.js
		createFilterFunction(listRicepsFilterJSON);
		//createFilterFunction(listRicepsFilter);

	});

	let valInputLocalStorage = localStorage.getItem("valInput");
	

	//fermeture de la searchbar

	const deleteValueInput = () => {

		//fonction de suppression du contenu de la search bar 
		const btnDelete = document.querySelector(".btnDelete");
		const inputSearch = document.querySelector(".inputSearch");

		btnDelete.addEventListener("click", ()=>{

			//suppression de l'input et de sa valeur de l'input 
			inputSearch.value = "";
			inputSearch.removeAttribute("value");


			//masquage de la croix 
			btnDeleteSearchBarMain.style.display="none";

			// Supprimez la clé du local storage
			localStorage.removeItem("valInput");

			//récupération du conteneur de toutes les recettes pour le vider 
			let containerRecettes = document.querySelector(".containerArticleRecette");
			
			containerRecettes.innerHTML = "";

			//////////////
			for(let i=0; i<listAllData.length; i++){

				let recetteCurrent = listAllData[i];
		
				articleCreateFunction(recetteCurrent);
		
			}

			showNumberRiceptsFunction();
			
		});

	};
	deleteValueInput();


	
}

export default getDatasFunction(); 

