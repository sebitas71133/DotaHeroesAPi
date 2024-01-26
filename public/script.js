const card_container = document.querySelector("#tarjetasHeroes");
const input_search = document.querySelector("#filtro");
const search_container = document.querySelector(".busqueda");
const suggestions_container = document.querySelector(".sugerencias");


let arrayHeroData = [];
let arrayHeroNames  = [];
let arrayHeroDataByFilter = [];
let quantityHeroes = 6;

window.addEventListener("load",async () => {
  arrayHeroData = await loadData(6);
  arrayHeroDataByFilter = await loadData(-1);
  loadCards(arrayHeroData);
  loadHeroNames();
  // input_search.value = "";
});

async function loadHeroNames() {
  
  let api_url = `${api_address}/api/dota/lista`;

  try {
    let response = await fetch(api_url, { method: "GET" });
    if (!response.ok) {
      throw new Error("error en la peticion");
    }

    const { data } = await response.json();
    arrayHeroNames  = data.map((e) => e.localized_name);
  } catch (err) {
    console.error("Error al cargar nombres", err);
  }
}



async function loadCards(arrayHeroData) {
  try {
    
   // arrayHeroData = await loadData();
    removeChildrenContainer(card_container);
    arrayHeroData.forEach((hero) => {
      addCardToSection(card_container, createHeroCard(hero), () => getHeroInformationById(hero.id));
    });

    if(arrayHeroData.length===0){
      const emptyMessage = ` 
      <article>
          <div class="content">
              <div class="nombre">
                  <div>Oops! It looks like we're empty here</div>
              </div>
          </div>
      </article>
       `;
      addCardToSection(card_container, emptyMessage, () => {});
    }
  } catch (err) {
    console.error("Error al cargar", err);
  }
}

async function loadData(quantityHeroes) {
  let api_url = `${api_address}/api/dota?quantity=${quantityHeroes}`;

  try {
    const response = await fetch(api_url, { method: "GET" });
    
    if (!response.ok) {
      throw new Error("error en la peticion");
    }

    const { data } = await response.json();
    
    return data;
  } catch (err) {
    console.error("Error al cargar data", err);
  }
}


function getHeroInformationById(id) {
  window.location.href = `${api_address}/api/dota/${id}`;
}

/**
 * 
 * @param {object} heroObject El objeto que contiene la informacion del heroe
 * @returns {string} Una cadena HTML que representa la tarjeta del heroe
 */
function createHeroCard(heroObject) {
  
  
  const attributeMappings = {
    'str': 'STRENGTH',
    'agi': 'AGILITY',
    'int': 'INTELLIGENCE',
    'all': 'UNIVERSAL'
  };

  let type = attributeMappings[heroObject.primary_attr];

  return `              
    <div class="image">
        <img src="${heroObject.img}" alt="">
    </div>
    <div class="content">
        <div class="tipo">
            <div>
                 <img class="icono_atributo" src="${
                   iconos_atributos[heroObject.primary_attr]
                 }" >
                 ${type}
            </div>     
        </div>
        <div class="nombre">
            <div>${heroObject.localized_name}</div>
        </div>
        <div class="frase">
        <div>${heroObject.phrase}</div>
        </div>
        <div class="ataquec">Attributes</div>
        <div class="descripcion">
            <img class="icono_atributo" src="${iconos_atributos["str"]}" >
            ${heroObject.base_str} 
            <img class="icono_atributo" src="${iconos_atributos["agi"]}" >
            ${heroObject.base_agi} 
            <img class="icono_atributo" src="${iconos_atributos["int"]}" >
            ${heroObject.base_int}
        </div>
        <div class="ataque">
            <div class="ataquec">Attack Type</div>
            <div>
            <img class="icono_tipo_ataque"
            " src="${iconos_tipo_ataque[heroObject.attack_type]}" >
            ${heroObject.attack_type}
            </div>
        </div>
        <div class="stats">
            <div class="ataquec">
                <div>Attack</div>
                <div>
                ${heroObject.attack_min}-${heroObject.attack_max}
                <img class="icono_stats" src="${iconos_stats["damage"]}" >
                </div>
            </div>
            <div class="ataquec text-center">
                <div>Defense</div>
                <div>
                ${heroObject.armor}
                <img class="icono_stats" src="${iconos_stats["defense"]}" >
                </div>
            </div>
            <div class="ataquec text-center">
                <div>Mobility</div>
                <div>
                ${heroObject.move_speed}
                <img class="icono_stats" src="${iconos_stats["mobility"]}" >
                </div>
            </div>
        </div class="stats">   
    </div>
    `;
}

// FILTROS

function renderCardsHeroFilter(matchedHerosArray=[]){
   card_container.innerHTML = matchedHerosArray.map((hero)=>{
        return `<article>
              ${createHeroCard(hero)}
        </article>`
   }).join('');
}


input_search.addEventListener('keyup',async (e)=> {
  const searchTerm = e.target.value.trim();
  const matchedWords = getMatches(searchTerm,arrayHeroNames);
  const matchedHerosArray = getMatchesHero(searchTerm,arrayHeroDataByFilter);
  
  if (e.key === "Enter") {
    renderSearchedHeroCard(input_search.value);
  }

  if (searchTerm) {
    
    if (!matchedWords.length) {
      suggestions_container.innerHTML = `<li>${searchTerm}</li>`;
    } else {
      displayMatchingWords(matchedWords);
      renderCardsHeroFilter(matchedHerosArray);
    }
    search_container.classList.add("active");
  } else {
    loadCards(arrayHeroData);
    search_container.classList.remove("active");
  }

  document.addEventListener('click', function(event) {
    if (!input_search.contains(event.target)) {
      // input_search.value = "";
      search_container.classList.remove("active");
    }
  });
})


/**
 * 
 * @param {HTMLElement} element Elemento 'li' seleccionado por el usuario como sugerencia
 */
function selectSuggestedHero(element) {
  let selectUserData = element.textContent;
  input_search.value = selectUserData;
  search_container.classList.remove("active");
  renderSearchedHeroCard(selectUserData);
}


/**
 * 
 * @param {string} selectUserData Nombre del heroe 
 */
async function renderSearchedHeroCard(selectUserData) {
  let api_url = `${api_address}/api/dota/heroe?name=${selectUserData}`;
  try {
    let response = await fetch(api_url, { method: "GET" });
    
    if (!response.ok) {
      throw new Error("error en la peticion");
    } 

    const {data} = await response.json();
    removeChildrenContainer(card_container);
    addCardToSection(card_container, createHeroCard(data), () =>getHeroInformationById(data.id));
    search_container.classList.remove("active");
  } catch (err) {
    console.error("Error al hacer click", err);
  }
}

/**
 * 
 * @param {string[]} matchedWords Arreglo de palabras que coinciden con la busqueda del usario
 */
function displayMatchingWords(matchedWords) {
  while (suggestions_container.firstChild) {
    suggestions_container.removeChild(suggestions_container.firstChild);
  }
  matchedWords.forEach((word) => {
    let li = document.createElement("li");
    li.innerHTML = `<li>${word}</li>`;
    li.addEventListener('click',()=>selectSuggestedHero(li));
    suggestions_container.appendChild(li);
  });
}


// Detectar el evento de desplazamiento

let spin = document.querySelector('.loader');
let cargar = false;
window.addEventListener("scroll", function () {
  if (!cargar && window.innerHeight + window.scrollY >= document.body.offsetHeight-10) {
    cargar = true;
    spin.classList.toggle('active'); 
    setTimeout( async () => {
      quantityHeroes = quantityHeroes + 6;
      arrayHeroData = await loadData(quantityHeroes); //actualizar el array
      loadCards(arrayHeroData);
      spin.classList.toggle('active'); 
      cargar = false;
    }, 1000);
  }
});

window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  if (window.scrollY > 100) {
      header.classList.add('transparente');
  } else {
      header.classList.remove('transparente');
  }
});


document.querySelector("#recargarPagina").addEventListener("click", () => location.reload(true));

// Filtrar por atributo

const iconImagesAttributes = document.querySelectorAll('.icono_atributo_busqueda');
iconImagesAttributes.forEach((image) => {
  image.addEventListener("click",getDataByAttribute);
});


async function getDataByAttribute(event) {
  const clickedImage = event.target;
  let api_url = `${api_address}/api/dota/heroe?attribute=${clickedImage.id}`;
  try {
        const response = await fetch(api_url,{method:"GET"});
        ;
        if(!response.ok){
          throw new Error("error en la peticion");  
        }

        const {data} = await response.json();
        loadCards(data);



  } catch (error) {
      console.log(error);
  }

}