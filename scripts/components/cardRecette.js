/* eslint-disable indent */
//récupération de la fonction
import getDatas from "../manageDatas.js";

//fonction asynchrone pemettant d'utiliser ou de récupérer la data 
async function getDatasFunction() {

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

	//console.log(listdatas);


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

	for(let i=0; i<=listdatas.length; i++){

		let recetteCurrent = listdatas[i];

		articleCreateFunction(recetteCurrent);

	}

}

getDatasFunction();


