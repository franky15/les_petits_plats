//récupération de la data
async function getDatas(){

	let listAllImgData;

	try{
		//requete de récupération des données asynchrone
		let response = await fetch("../datas.json");
        
		//je converti ensuite la réponse pendant un certain temps en json
		let responseJson = await response.json();

		listAllImgData = responseJson.recipes;

		
		//obtension des listes de mots clés 
		
		//constitution des listes pour les filtres
		let ingredientsListFilter = listAllImgData.map( item => item.ingredients[0].ingredient);
		let applianceListFilter = listAllImgData.map( item => item.appliance);
		let descriptionListFilter = listAllImgData.map( item => item.description);
		console.log(descriptionListFilter);
	
		let ustencils = listAllImgData.map( item => item.ustensils );
    
		/* suppression des doublons avec [...new Set(list)]
			[new Set(list)] création d'un nouveau set (ensemble de plusieurs listes) en supprimant les doublons
			[...new Set(list)] fusion de ces listes là en une seule
		*/
		ingredientsListFilter = [...new Set(ingredientsListFilter)];
		applianceListFilter = [...new Set(applianceListFilter)];
		descriptionListFilter = [...new Set(descriptionListFilter)];
		ustencils = [...new Set(ustencils)];
		

		let ustencilsList=[];
	
		//fusion de l'ensemble de listes en une seule grosse liste
		for(let u=0; u<ustencils.length; u++){

			let ustencilsCurrent = ustencils[u];
			ustencilsList.push(ustencilsCurrent);
		

		}

		let ustencilsListFilter = [].concat(...ustencilsList);
	
		//obtension de la grande liste de tous les mots clés
		let listAllKeyWordFinal = [].concat(...ustencilsList).concat(...ingredientsListFilter).concat(...applianceListFilter).concat(...descriptionListFilter);
		// console.log(listAllKeyWordFinal);

		//stockage des listes de mots clés dans le local storage

		let listkeywords = [ { ingredientsListFilter : ingredientsListFilter }, { applianceListFilter: applianceListFilter }, { descriptionListFilter: descriptionListFilter }, { ustencilsListFilter: ustencilsListFilter }, { listAllKeyWordFinal: listAllKeyWordFinal}];
		
		for(let l=0; l<listkeywords.length; l++){

			let listkeywordsCurrent = listkeywords[l];

			//récupératio de la valeur de la clé encours
			let keyCurrent = Object.keys(listkeywordsCurrent);

			// Convertion  listeFusionnee en chaîne JSON
			let keyCurrentStringify = JSON.stringify(listkeywordsCurrent);

			// Stockez la chaîne JSON dans le local storage avec une clé
			localStorage.setItem( keyCurrent, keyCurrentStringify);

		}

		//vidage du localstorage au chargement de la page
		window.addEventListener("beforeunload", () => {
			// Supprimession toutes les données du Local Storage
			localStorage.clear();
		});

		
	


	} catch(error){

		console.error("Erreur lors de la requête :", error);

	}

	return listAllImgData;

}


export default getDatas();

//obtension des listes des mots clés

