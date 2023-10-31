//récupération de la data
async function getDatas(){

	let listAllImgData;

	try{
		//requete de récupération des données asynchrone
		let response = await fetch("../datas.json");
        
		//je converti ensuite la réponse pendant un certain temps en json
		let responseJson = await response.json();

		listAllImgData = responseJson.recipes;

	} catch(error){

		console.error("Erreur lors de la requête :", error);

	}

	return listAllImgData;

}

export default getDatas();
