const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")
const btnVaciarCarrito = document.querySelector("#vaciar-carrito")
let articulosCarrito = []


registrarEventos()

function registrarEventos(){
    listaCursos.addEventListener('click', agregarCuro)

    //Elimina cursos del carrito
    carrito.addEventListener('click',elimiarCurso)

    //Vaciar el carrito
    btnVaciarCarrito.addEventListener("click", ()=>{
        articulosCarrito=[] //Reseteamos el arreglo
        limpiarHTML()
    })
}


function agregarCuro(e){
    e.preventDefault()
    if ( e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerCurso(cursoSeleccionado)
    }
}


//Eliminar cursos del carrito
function elimiarCurso(e){
   if ( e.target.classList.contains('borrar-curso')){
        const id= e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== id)

        carritoHTML()
   }
    
}

function leerCurso(curso){
    const infoCurso =  {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)

    if ( existe ){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if ( curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso]
    }


    carritoHTML()
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
     limpiarHTML()

    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr')

        const {imagen,titulo,precio,cantidad,id} = curso

        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row)
    })
}


function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}