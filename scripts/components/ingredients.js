/*
//creation de la cardRecetteFunction
export const cardRecetteFunction = () => {

	//récupération du container de la containerFilter
	const filtersContainer = document.querySelector(".filters__container");

	let  cardRecette = `

        <div class="filters__container--filter">

            <button class="recettesBtn" >
              ${"Ingrédients"}
              <i class="fa-solid fa-chevron-down arrowDown"></i>
              <i class="fa-solid fa-chevron-up arrowUp"></i>
            </button>

            <ul  class="listeUlContainer" style="display: block;" >
                      
                <li class="optionBar "  role='option'>  
                
                    <input class="optionBar__input ${"Ingredients"} " type="text" >
                    <span class="populariteElement__icon"> <i class="fa-solid fa-magnifying-glass"></i> </span>

                </li>
                <li class="optionLi ${ "Ingredients" }" style="display: block;" role='option'>  
                
                    <button  value= ${"Ingredients"} class="${ "Ingredients"+"Btn" }">

                        <span class="spanPopularite">${"Ingredients"}</span>
                       
                    </button>
                    
                </li>
                

            </ul>

        </div>

   `;

   filtersContainer.innerHTML = cardRecette;

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
	
};
cardRecetteFunction();*/
