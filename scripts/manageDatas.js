//récupération de la data
async function getDatas(){

	let listAllData;
	let listAllKeyWordSearchBar;
	let descriptionListFilter;
	let ustencilsListFilter = [];
	let ingredientsListFilter = [];
	let applianceListFilter = [];

	try{
		//requete de récupération des données asynchrone
		let response = await fetch("../datas.json");
        
		//je converti ensuite la réponse pendant un certain temps en json
		let responseJson = await response.json();

		listAllData = responseJson.recipes;

		
		//obtension des listes de mots clés 
		
		//constitution des listes pour les filtres
		let titreListFilter = listAllData.map( item => item.name);
		ingredientsListFilter = listAllData.map( item => item.ingredients[0].ingredient);
		applianceListFilter = listAllData.map( item => item.appliance);
		descriptionListFilter = listAllData.map( item => item.description);
		
		let ustencils = listAllData.map( item => item.ustensils );
    
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

		ustencilsListFilter = [].concat(...ustencilsList);

		// Fonction de normalisation des chaînes ou de formatage des chaines de caractères 
		const normaliserChaine = (chaine) => chaine.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		
		//let ustencilsListFilter1 = [...new Set(ustencilsListFilter)];
		
		//retrait des doublons après la fusion des données et application de la function normaliserChaine
		//pour chaque élément
		ustencilsListFilter = [...new Set(ustencilsListFilter.map(normaliserChaine))];

		console.log("***** ustencilsListFilter")
		console.log(ustencilsListFilter.sort())


		/*for(let l=0; l<ustencilsListFilter.length; l++){

			let ustencilsListFilterCurrent = ustencilsListFilter[l];

			if(ustencilsListFilterCurrent)
		}*/

		//obtension de la grande liste de tous les mots clés utiliser sur la searchbar

		// listAllKeyWordSearchBar = [].concat(ustencilsListFilter).concat(ingredientsListFilter).concat(applianceListFilter);
		listAllKeyWordSearchBar = [].concat(titreListFilter).concat(ingredientsListFilter).concat(descriptionListFilter);

		/*
		//stockage des listes de mots clés dans le local storage

		let listkeywords = [ { ingredientsListFilter : ingredientsListFilter },
			{ applianceListFilter: applianceListFilter }, 
			{ descriptionListFilter: descriptionListFilter }, 
			{ ustencilsListFilter: ustencilsListFilter },
			{ listAllKeyWordSearchBar: listAllKeyWordSearchBar}
		];
		
		for(let l=0; l<listkeywords.length; l++){

			let listkeywordsCurrent = listkeywords[l];

			//récupératio de la valeur de la clé encours
			let keyCurrent = Object.keys(listkeywordsCurrent);

			// Convertion  listeFusionnee en chaîne JSON
			let keyCurrentStringify = JSON.stringify(listkeywordsCurrent);

			// Stockez la chaîne JSON dans le local storage avec une clé
			localStorage.setItem( keyCurrent, keyCurrentStringify);

		}
		*/

		//vidage du localstorage au chargement de la page
		window.addEventListener("beforeunload", () => {
			// Supprimession toutes les données du Local Storage
			localStorage.clear();
		});

	} catch(error){

		console.error("Erreur lors de la requête :", error);

	}

	return [ listAllKeyWordSearchBar, descriptionListFilter, listAllData, ustencilsListFilter, ingredientsListFilter, applianceListFilter ];//listAllImgData,listAllKeyWordFinal;

}


export default getDatas();

//obtension des listes des mots clés

