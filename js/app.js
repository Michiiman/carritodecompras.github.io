// Variables
const carrito =document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');
const listaCursos =document.querySelector('#lista-cursos');
let articulosCarrito=[];

cargarEventlisteners();
function cargarEventlisteners(){
    // Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso)

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito)
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el contenido del html y extrae la info del curso
function leerDatosCurso(curso){
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
    imagen: curso.querySelector('img').src ,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }
    //Revisa si un curso ya esta en el carrito
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if (existe){
        const cursos=articulosCarrito.map(curso=>{
            if (curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];
    }else{
        articulosCarrito=[...articulosCarrito, infoCurso];
    }
    carritoHTMl();
}

//Eliminar el curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso') ){
        const cursoId=e.target.getAttribute('data-id');

        //Eliminar del arreglo el curso
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);
        carritoHTMl();
    }
}

//muestra el carrito de compras en el html
function carritoHTMl(){
    //limpiar el html
    limpiarHTMl();
    //Recorre el carrito
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row= document.createElement('tr');
        row.innerHTML=`
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}>X</a>
        `
        //agregar el contenido del html a la lista(tbody)
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos de tbody
function limpiarHTMl(){
    //forma lenta
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
// vaciar carrito
function vaciarCarrito(){
    articulosCarrito=[];
    limpiarHTMl();
}