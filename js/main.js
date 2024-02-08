const container = document.getElementById("container");

let carrito = [];

let todosLosProductos = [];

fetch("././json/productos.json")
  .then((response) => response.json())
  .then((data) => {
    const arrayProductos = data;

    arrayProductos.forEach((element) => {
      const card = document.createElement("div");
      card.className = "card-producto";

      const titulo = document.createElement("h3");
      titulo.textContent = element.nombre;

      const imagen = document.createElement("img");
      imagen.className = "imagen-productos";
      imagen.src = element.img;
      imagen.alt = "imagen de café";

      const precio = document.createElement("p");
      precio.innerHTML = `$${element.precio}`;

      const btnAgregarCarrito = document.createElement("button");
      //   boostrap
      btnAgregarCarrito.className = "btn-agregar-carrito";
      btnAgregarCarrito.innerText = "Comprar";
      btnAgregarCarrito.onclick = () => agregarAlCarrito(element.id);

      card.appendChild(imagen);
      card.appendChild(titulo);
      card.appendChild(precio);
      card.appendChild(btnAgregarCarrito);

      container.appendChild(card);

      todosLosProductos.push(element);
    });
  });
// .catch((error) => alert(error));
function agregarAlCarrito(id) {
  const productoAAgregar = todosLosProductos.find(
    (element) => element.id === id
  );
  if (!carrito.some((element) => element.id === id)) {
    carrito.push({
      id: productoAAgregar.id,
      nombre: productoAAgregar.nombre,
      precio: productoAAgregar.precio,
      cantidad: productoAAgregar.cantidad,
      img: productoAAgregar.img,
    });
  } else {
    let indiceDelProducto = carrito.findIndex((element) => element.id === id);
    carrito[indiceDelProducto].cantidad += 1;
  }
  Toastify({
    text: `Agregaste ${productoAAgregar.nombre} al carrito 😁`,
    duration: 2000,
    position: "right",
  }).showToast();
}
console.log(carrito);
