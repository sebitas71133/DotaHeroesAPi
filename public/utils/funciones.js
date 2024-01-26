/** 
 * remueve los hijos de un contenedor
 * @param {HTMLElement} contenedor - El elemento del cual se le eliminan los hijos
 * @returns {void} 
 * 
*/
function removeChildrenContainer(contenedor) {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
  } 


/**
 * Añade una tarjeta a una sección.
 * @param {HTMLElement} section - El elemento donde se añadirá la tarjeta.
 * @param {string} contentHTML - El contenido HTML de la tarjeta.
 * @param {function} clickCallBack - La función de retorno de llamada para el evento de clic.
 * @returns {void}
 */

function addCardToSection(section, contentHTML, clickCallBack) {
    const card = document.createElement("article");
    card.innerHTML = contentHTML;
    card.addEventListener("click", clickCallBack);
    section.appendChild(card);
}
  
/**
 * 
 * @param {string} searchTerm El termino ingresado en el input por el cliente
 * @param {string[]} arrayHeroNames El arreglo con la lista de nombres de los heroes
 * @returns {string[]} El arreglo de nombres de heroes que coinciden con el termino de busqueda
 */

function getMatches(searchTerm,arrayHeroNames) {
  const searchLowerCase = searchTerm.toLocaleLowerCase();
  return arrayHeroNames.filter((heroName)=> heroName.toLocaleLowerCase().startsWith(searchLowerCase))
}

function getMatchesHero(searchTerm,arrayHero) {
 
  const searchLowerCase = searchTerm.toLocaleLowerCase();
  return arrayHero.filter((hero)=> (hero.localized_name).toLocaleLowerCase().startsWith(searchLowerCase) );
}