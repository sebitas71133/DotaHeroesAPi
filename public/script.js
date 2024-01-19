let tarjetas_contenedor = document.querySelector("#tarjetasHeroes");
const paginas_contenedor = document.querySelector("#paginas-container");

let listaHeroes = [];
let sugerencias = [];

window.addEventListener("load", () => {
  actualizarImagenes(1);
  cargarNombresHerores();
});

async function cargarNombresHerores() {
  // let url = `https://dota-api-zen.onrender.com/api/dota/lista`;
  let url = `http://localhost:3000/api/dota/lista`;

  try {
    let response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error("error en la peticion");
    }

    const { data } = await response.json();
    sugerencias = data.map((e) => e.localized_name);
  } catch (err) {
    console.error("Error al cargar nombres", err);
  }
}

async function loadData(paginaActual) {
  let url = `http://localhost:3000/api/dota?resultadosPorPagina=6&paginaActual=${paginaActual}`;

  try {
    let response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error("error en la peticion");
    }

    const { data } = await response.json();

    return data;
  } catch (err) {
    console.error("Error al cargar data", err);
  }
}

async function actualizarImagenes(currentPage) {
  try {
    listaHeroes = await loadData(currentPage);
    limpiarContenedor(tarjetas_contenedor);
    if (listaHeroes.length > 0) {
      listaHeroes.forEach((e) => {
        let contenido = crearContenidoHeroe(e);
        agregarTarjetaSection(tarjetas_contenedor, contenido, () =>
          manejarClickHeroe(e)
        );
      });
    } else {
      let mensajeVacio = ` 
            <article>
                <div class="content">
                    <div class="nombre">
                        <div>Oops! It looks like we're empty here</div>
                    </div>
                </div>
            </article>
             `;
      agregarTarjetaSection(tarjetas_contenedor, mensajeVacio, () => {});
    }
  } catch (error) {
    console.error("Error al cargar", error);
  }
}

function manejarClickHeroe(e) {
  window.location.href = `http://localhost:3000/api/dota/${e.id}`;
}

function agregarTarjetaSection(section, contenido, clickCallBack) {
  let tarjeta = document.createElement("article");
  tarjeta.innerHTML = contenido;
  tarjeta.addEventListener("click", clickCallBack);
  section.appendChild(tarjeta);
}

function crearContenidoHeroe(e) {
  let type;

  switch (e.primary_attr) {
    case "str":
      type = "STRENGTH";
      break;
    case "agi":
      type = "AGILITY";
      break;
    case "int":
      type = "INTELLIGENCE";
      break;
    case "all":
      type = "UNIVERSAL";
      break;
  }

  return `

                    
    <div class="image">
        <img src="${e.img}" alt="">
    </div>
    <div class="content">
        <div class="tipo">
            <div>
                 <img class="icono_atributo" src="${
                   iconos_atributos[e.primary_attr]
                 }" >
                 ${type}
            </div>
           
        </div>
        <div class="nombre">
            <div>${e.localized_name}</div>
        </div>
        <div class="frase">
        <div>${e.phrase}</div>
        </div>
        <div class="ataquec">Attributes</div>
        <div class="descripcion">
            <img class="icono_atributo" src="${iconos_atributos["str"]}" >
            ${e.base_str} 
            <img class="icono_atributo" src="${iconos_atributos["agi"]}" >
            ${e.base_agi} 
            <img class="icono_atributo" src="${iconos_atributos["int"]}" >
            ${e.base_int}
        </div>
        <div class="ataque">
            <div class="ataquec">Attack Type</div>
            <div>
            <img class="icono_tipo_ataque"
            " src="${iconos_tipo_ataque[e.attack_type]}" >
            ${e.attack_type}
            </div>
        </div>
        <div class="stats">
            <div class="ataquec">
                <div>Attack</div>
                <div>
                ${e.attack_min}-${e.attack_max}
                <img class="icono_stats" src="${iconos_stats["damage"]}" >
                </div>
            </div>
            <div class="ataquec text-center">
                <div>Defense</div>
                <div>
                ${e.armor}
                <img class="icono_stats" src="${iconos_stats["defense"]}" >
                </div>
            </div>
            <div class="ataquec text-center">
                <div>Mobility</div>
                <div>
                ${e.move_speed}
                <img class="icono_stats" src="${iconos_stats["mobility"]}" >
                </div>
            </div>
        </div class="stats">
        
        
    </div>


    `;
}

function crearPaginacion() {
  let contenido;
  limpiarContenedor(paginas_contenedor);
  for (let index = 0; index < 5; index++) {
    contenido = `
        <li class="page-item">
            <a class="page-link" onclick="actualizarImagenes(${index + 1})">${
      index + 1
    }</a>
        </li>
        `;
    let li = document.createElement("li");
    li.innerHTML = contenido;
    paginas_contenedor.appendChild(li);
  }
}

crearPaginacion();

function limpiarContenedor(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

// FILTROS

const usuario_busqueda = document.querySelector("#filtro");
let contenedor_busqueda = document.querySelector(".busqueda");
const caja_sugerencias = document.querySelector(".sugerencias");
const searchLink = document.querySelector("#busquedaGoogle");
let filtros = [];

usuario_busqueda.onkeyup = (e) => {
  let contenido = "";
  let busqueda = e.target.value;

  if (e.key === "Enter") {
    clickBusqueda();
  }

  if (busqueda) {
    filtros = obtenerCoincidencias(busqueda);
    if (!filtros.length) {
      contenido = `<li onclick="select(this)">${usuario_busqueda.value}</li>`;
      caja_sugerencias.innerHTML = contenido;
    } else {
      desplegarCoincidencias(filtros, contenido);
    }

    contenedor_busqueda.classList.add("active");
  } else {
    actualizarImagenes(1);
    contenedor_busqueda.classList.remove("active");
  }
};

function obtenerCoincidencias(busqueda) {
  busqueda = busqueda.toLocaleLowerCase();
  return (filtros = sugerencias.filter((sugerencia) => {
    if (sugerencia.toLocaleLowerCase().startsWith(busqueda)) {
      return sugerencia;
    }
  }));
}

function select(element) {
  let selectUserData = element.textContent;
  usuario_busqueda.value = selectUserData;
  //searchLink.href = `https://www.google.com/search?q=${usuario_busqueda.value}`;

  contenedor_busqueda.classList.remove("active");
}

async function clickBusqueda() {
  let url = `http://localhost:3000/api/dota/filtro?heroe=${usuario_busqueda.value}`;

  try {
    let response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error("error en la peticion");
    }

    const { data } = await response.json();
    limpiarContenedor(tarjetas_contenedor);
    console.log(data[0]);
    let contenido = crearContenidoHeroe(data[0]);
    agregarTarjetaSection(tarjetas_contenedor, contenido, () =>
      manejarClickHeroe(data[0])
    );
    contenedor_busqueda.classList.remove("active");
  } catch (err) {
    console.error("Error al hacer click", err);
  }
}

function desplegarCoincidencias(filtros, contenido) {
  while (caja_sugerencias.firstChild) {
    caja_sugerencias.removeChild(caja_sugerencias.firstChild);
  }
  filtros.forEach((e) => {
    contenido = `<li onclick="select(this)">${e}</li>`;
    let li = document.createElement("li");
    li.innerHTML = contenido;
    caja_sugerencias.appendChild(li);
  });
}

function complejidad(e) {
  let circulos = "";
  for (let index = 0; index < e.complexity; index++) {
    circulos = circulos + `<div class="circulo"></div>`;
  }
  return circulos;
}
