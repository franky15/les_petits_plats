
//creation de la cardRecetteFunction
export const createFilterFunction = () => {

	//récupération du container de la containerFilter
	const filtersContainer = document.querySelector(".filters__container");

	const createFilterItemFunction =() => {

		let  filter = `

            <div class="filters__container--filter">

                <button class="recettesBtn" >
            
                    ${"Ingrédients"}
                    <span class="arrowDown" > <i class="fa-solid fa-chevron-down"></i> </span>
                    <span class="arrowUp" style="display: none;" > <i class="fa-solid fa-chevron-up"></i> </span>
                
                </button>

                <ul  class="listeUlContainer" style="display: block;" >
                        
                    <li class="optionBar"  style="display: block;">  
                    
                        <input value=${ "value" } class="optionBar__input ${"Ingredients"} " type="text" >
                        <span class="optionBar__icon"> <i class="fa-solid fa-x btnDelete"></i> </span>

                    </li>
                    <li class="optionLi ${ "Ingredients" }" style="display: block;" role='option'>  
                    
                        <button  value= ${"Ingredients"} class="${ "Ingredients"+"Btn" }">

                            <span class="spanPopularite">${"Ingredients"}</span>
                        
                        </button>
                        
                    </li>
                    

                </ul>

            </div>

        `;

		filtersContainer.innerHTML = filter;


	};
	createFilterItemFunction();

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
	
};
createFilterFunction();
