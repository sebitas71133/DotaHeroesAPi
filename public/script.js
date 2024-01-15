
let tarjetas_contenedor = document.querySelector('#tarjetasHeroes');
const paginas_contenedor = document.querySelector('#paginas-container');

let listaHeroes = [];
let sugerencias = [];


window.addEventListener('load', ()=>{
    actualizarImagenes(1);
    cargarNombresHerores();
});

async function cargarNombresHerores(){
    let url = `https://dota-api-zen.onrender.com/api/dota/lista`;

    try {
        let response = await fetch(url,{method:'GET'})
        if(!response.ok){
            throw new Error('error en la peticion');
        }

        const { data }= await response.json();
        sugerencias = data.map(e=> e.name);
    } catch (err) {
        console.error(err);
    }
}


async function loadData(paginaActual){

    let url = `https://dota-api-zen.onrender.com/api/dota?resultadosPorPagina=4&paginaActual=${paginaActual}`;

    try {
        let response = await fetch(url,{method:'GET'})
        if(!response.ok){
            throw new Error('error en la peticion');
        }

        const { data }= await response.json();
        
        return data;
    } catch (err) {
        console.error(err);
    }
}



async function actualizarImagenes(currentPage){

    try {
        listaHeroes = await loadData(currentPage);
        limpiarContenedor(tarjetas_contenedor);
        if(listaHeroes.length>0){
            listaHeroes.forEach(e => {
           
                let contenido = crearContenidoHeroe(e);
                agregarTarjetaSection(tarjetas_contenedor, contenido, () => manejarClickHeroe(e));
            });
        }else{
            let mensajeVacio = ` 
            <article>
                <div class="content">
                    <div class="nombre">
                        <div>Oops! It looks like we're empty here</div>
                    </div>
                </div>
            </article>
             `
            agregarTarjetaSection(tarjetas_contenedor, mensajeVacio, () => {});
           
        }
    
    } catch (error) {
         console.error('Error al cargar',error);   
    }
   
}

function manejarClickHeroe(e) {
    window.location.href = `https://dota-api-zen.onrender.com/api/dota/${e.idheroes}`;
}

function agregarTarjetaSection(section,contenido,clickCallBack){
    let tarjeta  = document.createElement('article');
    tarjeta.innerHTML = contenido;
    tarjeta.addEventListener('click', clickCallBack);
    section.appendChild(tarjeta);
}

function crearContenidoHeroe(e){
    return `
                
                    
    <div class="image">
        <img src="${e.image}" alt="">
    </div>
    <div class="content">
        <div class="tipo">
            <div>${e.type}</div>
        </div>
        <div class="nombre">
            <div>${e.name}</div>
        </div>
        <div class="frase">
            ${e.quote}
        </div>
        <div class="descripcion">
            ${e.description}
        </div>
        <div class="ataque">
            <div class="ataquec">Tipo de ataque</div>
            <div>${e.attack}</div>
        </div>
        <div class="ataquec">
            <div id="complexity">Complejidad</div>
            <div>${e.complexity}</div>
        </div>
    </div>


    `;
}

function crearPaginacion(){
 
    let contenido;
    limpiarContenedor(paginas_contenedor);
    for (let index = 0; index < 3; index++) {
        contenido = `
        <li class="page-item">
            <a class="page-link" onclick="actualizarImagenes(${index+1})">${index+1}</a>
        </li>
        `
        let li = document.createElement('li');
        li.innerHTML = contenido;
        paginas_contenedor.appendChild(li);
    } 
}

crearPaginacion();

function limpiarContenedor(contenedor){
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

const usuario_busqueda = document.querySelector('#filtro');
let contenedor_busqueda  = document.querySelector('.busqueda');
const caja_sugerencias = document.querySelector('.sugerencias');
const searchLink = document.querySelector('#busquedaGoogle');

usuario_busqueda.onkeyup = (e) => {
    let filtros = [];
    let contenido = '';
    let busqueda = e.target.value;

    if(e.key==='Enter'){
        clickBusqueda();
    }

    if(busqueda){
        filtros = obtenerCoincidencias(busqueda);
        if(!filtros.length){
            contenido = `<li onclick="select(this)">${usuario_busqueda.value}</li>`
            caja_sugerencias.innerHTML = contenido;
        }else{
            desplegarCoincidencias(filtros,contenido);
        }

        contenedor_busqueda.classList.add('active');
    }else{
        actualizarImagenes(1);
        contenedor_busqueda.classList.remove('active');
    }
   
}

function obtenerCoincidencias(busqueda){
    busqueda = busqueda.toLocaleLowerCase();
    return filtros = sugerencias.filter(sugerencia=>{
        if(sugerencia.toLocaleLowerCase().startsWith(busqueda)){
                return sugerencia;
            }
        })    
}

function select(element) {
	let selectUserData = element.textContent;
	usuario_busqueda.value = selectUserData;
	//searchLink.href = `https://www.google.com/search?q=${usuario_busqueda.value}`;

	contenedor_busqueda.classList.remove('active');
}

async function clickBusqueda(){
    let url = `https://dota-api-zen.onrender.com/api/dota/filtro?heroe=${usuario_busqueda.value}`;

    try {
        let response = await fetch(url,{method:'GET'})
        if(!response.ok){
            throw new Error('error en la peticion');
        }

        const { data }= await response.json();
        limpiarContenedor(tarjetas_contenedor);
        let contenido = crearContenidoHeroe(data[0]);
        agregarTarjetaSection(tarjetas_contenedor, contenido, () => manejarClickHeroe(data[0]));
        contenedor_busqueda.classList.remove('active');
    } catch (err) {
        console.error(err);
    }
}



function desplegarCoincidencias(filtros,contenido){
    while(caja_sugerencias.firstChild){
        caja_sugerencias.removeChild(caja_sugerencias.firstChild);
    }
    filtros.forEach(e=>{
        contenido = `<li onclick="select(this)">${e}</li>`
        let li = document.createElement('li');
        li.innerHTML = contenido;
        caja_sugerencias.appendChild(li);
    })
}