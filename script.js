/* FORMULARIO DE CONTACTO
 document.getElementById('contact-form')?.addEventListener('submit', function () {
  // Deja que el form se envíe normalmente a Formspree
});*/



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          alert("¡Gracias por contactarte con nosotros! Te responderemos pronto.");
          form.reset();
        } else {
          alert("Ocurrió un error al enviar tu mensaje.");
        }
      } catch (error) {
        alert("Error de conexión, intenta nuevamente.");
      }
    });
  }
});

  
  // 🔧 Función para mostrar u ocultar el menú en móvil
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
  }
  
  // CARRUSEL
  
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function mostrarSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function cambiarSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    mostrarSlide(slideIndex);
  }

  // Mostrar la primera imagen al cargar
  mostrarSlide(slideIndex);

  // BÚSQUEDA DE PRODUCTOS
  function buscarProductos() {
    const input = document.getElementById('buscarInput');
    const filtro = input.value.toLowerCase().trim();
    const productos = document.querySelectorAll('.product-card');
  
    productos.forEach(producto => {
      const titulo = producto.querySelector('h3').textContent.toLowerCase();
      producto.classList.remove('resaltado');
      producto.style.display = 'block';
  
      if (titulo.includes(filtro) && filtro !== '') {
        producto.classList.add('resaltado');
        producto.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  document.getElementById('buscarInput')?.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarProductos();
    }
  });
  
  // NAVEGACIÓN ACTIVA
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // CARRITO DE COMPRAS
  // ------------------- CARRITO ------------------- //
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Añadir producto al carrito
function agregarDesdeProducto(id, nombre, precio) {
  const productoExistente = carrito.find(p => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
  mostrarCarrito();
}

// Mostrar carrito en pantalla
function actualizarCarrito() {
  const carritoDOM = document.querySelector('.carrito');
  const contador = document.getElementById('contadorCarrito');
  carritoDOM.innerHTML = "<h3>Tu carrito</h3>";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;
    cantidadTotal += p.cantidad;

    carritoDOM.innerHTML += `
      <div class="carrito-item">
        <span>${p.nombre} x ${p.cantidad}</span>
        <div class="carrito-controles">
          <button onclick="cambiarCantidad(${index}, -1)">➖</button>
          <button onclick="cambiarCantidad(${index}, 1)">➕</button>
          <button class="eliminar" onclick="eliminarProducto(${index})">🗑️</button>
        </div>
      </div>
    `;
  });

  carritoDOM.innerHTML += `<p>Total: $<span id="totalCarrito">${total.toLocaleString()}</span></p>`;
  contador.textContent = cantidadTotal;
}

// Cambiar cantidad de un producto
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  actualizarCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Mostrar/ocultar carrito
function toggleCarrito() {
  const carritoDOM = document.querySelector('.carrito');
  carritoDOM.style.display = carritoDOM.style.display === 'block' ? 'none' : 'block';
}

// Mostrar carrito automáticamente cuando se agrega
function mostrarCarrito() {
  const carritoDOM = document.querySelector('.carrito');
  carritoDOM.style.display = 'block';
}

// Al cargar la página, actualizar carrito
document.addEventListener("DOMContentLoaded", actualizarCarrito);

/*let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Añadir producto al carrito
function agregarDesdeProducto(id, nombre, precio) {
  const productoExistente = carrito.find(p => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar carrito en el DOM
function actualizarCarrito() {
  const carritoDOM = document.querySelector('.carrito');
  const contador = document.getElementById('contadorCarrito');
  carritoDOM.innerHTML = "<h3>Tu carrito</h3>";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;
    cantidadTotal += p.cantidad;

    carritoDOM.innerHTML += `
      <div class="carrito-item">
        <span>${p.nombre} x ${p.cantidad}</span>
        <div class="carrito-controles">
          <button onclick="cambiarCantidad(${index}, -1)">➖</button>
          <button onclick="cambiarCantidad(${index}, 1)">➕</button>
          <button class="eliminar" onclick="eliminarProducto(${index})">🗑️</button>
        </div>
      </div>
    `;
  });

  carritoDOM.innerHTML += `<p>Total: $<span id="totalCarrito">${total.toLocaleString()}</span></p>`;
  contador.textContent = cantidadTotal;
}

// Cambiar cantidad
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  actualizarCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Mostrar/ocultar carrito en la tienda
function toggleCarrito() {
  const carritoDOM = document.querySelector('.carrito');
  carritoDOM.style.display = carritoDOM.style.display === 'block' ? 'none' : 'block';
}

// Al cargar la página, actualizar carrito
document.addEventListener("DOMContentLoaded", actualizarCarrito);*/

  const productos = [
    { id: 'base-ani-k', nombre: 'Base 2en1 ANI-K', precio: 34000, categoria: "MAQUILLAJE", imagen: 'baseani-k.webp' },
    { id: 'corrector-ani-k', nombre: 'Corrector ANI-K', precio: 15000, categoria: "MAQUILLAJE", imagen: 'ani.png' },
    { id: 'Brocha para base AK2', nombre: 'Brocha ANI-K', precio: 16000, categoria: "MAQUILLAJE", imagen: 'BROCHA-PARA-BASE-AK2-ANI-K.png' },
    { id: 'Gloss ANI-K', nombre: 'Gloss ANI-K', precio:16000, categoria: "MAQUILLAJE", imagen: 'glossanik.png' },
    { id: 'Iluminador en crema ANI-K', nombre: 'Iluminador en crema ANI-K', precio: 24000, categoria: "MAQUILLAJE", imagen: 'ilumani.jpg' },
    { id: 'Iluminador suelto ani-k', nombre: 'Iluminador suelto ani-k', precio: 25800, categoria: "MAQUILLAJE", imagen: 'iluminadorsu.png' },
    { id: 'Lapiz doble para cejas ANI-K', nombre: 'Lapiz doble para cejas ANI-K', precio: 12700, categoria: "MAQUILLAJE", imagen: 'lapizcejas.png' },
    { id: 'Polvo suelto ANI-K', nombre: 'Polvo suelto ANI-K', precio:29500, categoria: "MAQUILLAJE", imagen: 'polvo-suelto-bonita2.png' },
    { id: 'Rubor en polvo ANI-K', nombre: 'Rubor en polvo ANI-K', precio:13000, categoria: "MAQUILLAJE", imagen: 'Ruboepolvoanik.png' },
    { id: 'Rubor Liquido ANI-K', nombre: 'Rubor liquido ANI-K', precio:19000, categoria: "MAQUILLAJE", imagen: 'Ruboresani-k.png' },
    { id: 'Rubor mineralizado ANI-K', nombre: 'Rubor mineralizado ANI-K', precio:17400, categoria: "MAQUILLAJE", imagen: 'Rubormineralizado.png' },
    { id: 'Primer TEDDY ANI-K', nombre: 'Primer TEDDY ANI-K', precio:27000, categoria: "MAQUILLAJE", imagen: 'teddy.png' },
    { id: 'Base CUSHION', nombre: 'Base CUSHION', precio:27000, categoria: "MAQUILLAJE", imagen: 'cush.png' },
    { id: 'Base en barra bloomshell', nombre: 'Base en barra Bloomshell', precio:22200, categoria: "MAQUILLAJE", imagen: 'baseba.png' },
    { id: 'Bloom blend magivc', nombre: 'Bloom blend magic', precio:3400, categoria: "MAQUILLAJE", imagen: 'bemagi.png' },
    { id: 'Base Bloomshell', nombre: 'Base 2en1 Bloomshell', precio:26800, categoria: "MAQUILLAJE", imagen: 'basebo.png' },
    { id: 'Bloom bush amuse', nombre: 'Bloom brush amuse', precio:15000, categoria: "MAQUILLAJE", imagen: 'bloombru.png' },
    { id: 'Paleta de rubores velvet x3', nombre: 'Paleta de rubores velvet x3', precio:27000, categoria: "MAQUILLAJE", imagen: 'rub.png' },
    { id: 'Oil control', nombre: 'Oil control', precio:19000, categoria: "MAQUILLAJE", imagen: 'oil.png' },
    { id: 'Bloom curl magic encrespador', nombre: 'Bloom curl magic encrespador', precio:12000, categoria: "MAQUILLAJE", imagen: 'encre.png' },
    { id: 'Blosoom ink marcador', nombre: 'Blosoom ink marcador', precio:13100, categoria: "MAQUILLAJE", imagen: 'mar.png' },
    { id: 'Click tint bloomshell', nombre: 'Click tint Bloomshell', precio:11900, categoria: "MAQUILLAJE", imagen: 'click.png' },
    { id: 'Encrespador profesional bloomshell', nombre: 'Encrespador profesional bloomshell', precio:12000, categoria: "MAQUILLAJE", imagen: 'encres.png' },
    { id: 'Fase primer bloomshell', nombre: 'Face primer bloomshell', precio:15600, categoria: "MAQUILLAJE", imagen: 'prim.png' },
    { id: 'Oil Lip Bloom', nombre: 'Bloom One   Lip Oil', precio:11500, categoria: "MAQUILLAJE", imagen: 'oillip.jpg' },
    { id: 'Bloom sculp deep', nombre: 'Bloom sculp deep', precio:21000, categoria: "MAQUILLAJE", imagen: 'sculp.png' },
    { id: 'Bloom Amore mio', nombre: 'Bloom Amore mio', precio:8400, categoria: "MAQUILLAJE", imagen: 'images.jpg' },
    { id: 'Bloom bubble tint', nombre: 'Bloom bubble tint', precio:12500, categoria: "MAQUILLAJE", imagen: 'bubble.png' },
    { id: 'Bloom Cosmic', nombre: 'Bloom Cosmic', precio:23500, categoria: "MAQUILLAJE", imagen: 'cosmic.png' },
    { id: 'Bloom Glam', nombre: 'Bloom Glam', precio:11200, categoria: "MAQUILLAJE", imagen: 'glam.png' },
    { id: 'Bloom gloss mini bloomshell', nombre: 'Bloom gloss mini Bloomshell', precio:3400, categoria: "MAQUILLAJE", imagen: 'gloosmini.png' },
    { id: 'Bloom Rehab', nombre: 'Bloom Rehab', precio:9900, categoria: "MAQUILLAJE", imagen: 'rehab.png' },
    { id: 'Bloomlove Bálsamo', nombre: 'Bloomlove Bálsamo', precio:10500, categoria: "MAQUILLAJE", imagen: 'love.png' },
    { id: 'Cepillo Anti frizz', nombre: 'Cepillo Anti frizz', precio:15000, categoria: "MAQUILLAJE", imagen: 'cepillobloom.png' },
    { id: 'Cera más cepillo pulidor', nombre: 'Cera más cepillo pulidor', precio:22000,categoria: "MAQUILLAJE", imagen: 'cerapuli.jpg' },
    { id: 'Correctores Blommshell', nombre: 'Correctores Bloomshell', precio:15900, categoria: "MAQUILLAJE", imagen: 'correcbloom.png' },
    { id: 'Corrector XL Bloomshell', nombre: 'Corrector XL 20ml Bloomshell', precio:27000, categoria: "MAQUILLAJE", imagen: 'CorrectorXL.png' },
    { id: 'Papel de arroz "BYE BYE" Bloomshell', nombre: 'Papel de arroz "BYE BYE" Bloomshell', precio:15000, categoria: "MAQUILLAJE", imagen: 'byebye.png' },
    { id: 'Polvo suelto lila 2en1', nombre: 'Polvo suelto lila 2en1 ', precio:25500, categoria: "MAQUILLAJE", imagen: 'lilabloom.png' },
    { id: 'Polvo suelto 2en1 Bloomshell', nombre: 'Polvo suelto 2en1 Bloomshell', precio:30000, categoria: "MAQUILLAJE", imagen: 'polvo2en1.png' },
    { id: 'Polvo suelto 2en1 mini Bloomshell', nombre: 'Polvo suelto 2en1 mini Bloomshell', precio:23000, categoria: "MAQUILLAJE", imagen: 'polvomini.png' },
    { id: 'Base 50 Atenea', nombre: 'Base líquida 1ST SCENE Atenea 50ml', precio:43100, categoria: "MAQUILLAJE", imagen: 'baseate.png' },
    { id: 'Base mini Atenea', nombre: 'Base mini Atenea 30ml', precio:33100, categoria: "MAQUILLAJE", imagen: 'Ateneamini.png' },
    { id: 'Tonico de rosas', nombre: 'Tónico de rosas', precio:17500, categoria: "MAQUILLAJE", imagen: 'lulaa.png' },
    { id: 'Corrector Atenea', nombre: 'Corrector Atenea', precio:31100, categoria: "MAQUILLAJE", imagen: 'correcate.png' },
    { id: 'Fijador de Maquillaje', nombre: 'Fijador de maquillaje', precio:12900, categoria: "MAQUILLAJE", imagen: 'lula.png' },
    { id: 'Paleta de contorno E iluminador Atenea', nombre: 'Paleta de contorno E iluminador Atenea', precio:31200, categoria: "MAQUILLAJE", imagen: 'paletaate.png' },
    { id: 'Polvo en gel atenea', nombre: 'Polvo en gel matificante', precio:33500, categoria: "MAQUILLAJE", imagen: 'polvogel.png' },
    { id: 'Polvo suelto Atenea', nombre: 'Polvo suelto Atenea', precio:40500, categoria: "MAQUILLAJE", imagen: 'polvoate.png' },
    { id: 'Rubor cremoso Atenea', nombre: 'Rubor cremoso Atenea', precio:29400, categoria: "MAQUILLAJE", imagen: 'cremaate.png' },
    { id: 'Rubor en dúo Atenea', nombre: 'Rubor en dúo Atenea', precio:32200, categoria: "MAQUILLAJE", imagen: 'duoate.png' },
    { id: 'Base Suede Matte', nombre: 'Base Suede Matte', precio:33100, categoria: "MAQUILLAJE", imagen: 'basedolce.png' },
    { id: 'Corrector liquido DOLCE BELLA', nombre: 'Corrector liquido DOLCE BELLA', precio:13500, categoria: "MAQUILLAJE", imagen: 'codo.png' },
    { id: 'Espuma limpiadora Dolce bella', nombre: 'Espuma limpiadora Dolce Bella', precio:20200, categoria: "MAQUILLAJE", imagen: 'espu.png' },
    { id: 'Kit de iluminadores x4 Dolce Bella', nombre: 'Kit de iluminadores x4 Dolce Bella', precio:30500, categoria: "MAQUILLAJE", imagen: 'glow.png' },
    { id: 'Crema facial de acido hialuronico Dolce Bella', nombre: 'Crema facial de acido hialuronico Dolce Bella', precio:15500, categoria: "MAQUILLAJE", imagen: 'ACIDO.png' },
    { id: 'Pestañina Dolce Bella', nombre: 'Pestañina Dolce Bella', precio:12500, categoria: "MAQUILLAJE", imagen: 'pes.png' },
    { id: 'Corrector AME', nombre: 'Corrector AME', precio:37900, categoria: "MAQUILLAJE", imagen: 'AMECO.PNG' },
    { id: 'Polvo compacto blurring AME ', nombre: 'Polvo compacto blurring AME', precio:40000, categoria: "MAQUILLAJE", imagen: 'POLAME.png' },
    { id: 'Primer pre-base Ame', nombre: 'Primer pre-base Ame', precio:36200, categoria: "MAQUILLAJE", imagen: 'PRIAME.PNG' },
    { id: 'lip oil engol', nombre: 'lip oil engol', precio:5000, categoria: "MAQUILLAJE", imagen: 'eng.png' },
    { id: 'Paleta de rubores pro', nombre: 'Paleta de rubores PRO', precio:14300, categoria: "MAQUILLAJE", imagen: 'pro.png' },
    { id: 'gel hidratante con aloe vera miss', nombre: 'Gel hidratante con aloe vera Miss Beauty', precio:27400, categoria: "MAQUILLAJE", imagen: 'aloe.png' },
    { id: 'Tonico de rosas miss beauty', nombre: 'Tonico de rosas miss beauty', precio:20300, categoria: "MAQUILLAJE", imagen: 'rosas.png' },
    { id: 'Masajeador facial con vibracion beauty pro miss cosmetics', nombre: 'Masajeador facial con vibracion beauty pro miss cosmetics', precio:29600, categoria: "MAQUILLAJE", imagen: 'mas.png' },
    { id: 'Mascarilla de ojos rosas miss cosmetics x60 parches', nombre: 'Mascarilla de ojos rosas miss cosmetics x60 parches', precio:13400, categoria: "MAQUILLAJE", imagen: 'ojo.png' },
    { id: 'Polvo suelto rosado montoc', nombre: 'Polvo suelto rosado Montoc', precio:25500, categoria: "MAQUILLAJE", imagen: 'polvro.png' },
    { id: 'Polvo translucido montoc', nombre: 'Polvo translucido Montoc', precio:25500, categoria: "MAQUILLAJE", imagen: 'polno.jpg' },
    { id: 'Tinta base Montoc', nombre: 'Tinta base Montoc', precio:35400, categoria: "MAQUILLAJE", imagen: 'tin.png' },
    { id: 'Fijador de maquillaje Trendy', nombre: 'Fijador de maquillaje Trendy', precio:13200, categoria: "MAQUILLAJE", imagen: 'fija.png' },
    { id: 'Voluminizador de labios', nombre: 'Voluminizador de labio Trendy', precio:6000, categoria: "MAQUILLAJE", imagen: 'volu.png' },
    { id: 'Tonico de rosas Trendy', nombre: 'Tonico de rosas Trendy', precio:14900, categoria: "MAQUILLAJE", imagen: 'to.png' },
    { id: 'Base soft', nombre: 'Base liquida soft matte Ruby Rose', precio:23900, categoria: "MAQUILLAJE", imagen: 'sof4.png' },
    { id: 'Base liquida natural look Ruby Rose', nombre: 'Base liquida natural look Ruby Rose', precio:23900, categoria: "MAQUILLAJE", imagen: 'natu.png' },
    { id: 'Base liquida Feels Ruby Rose', nombre: 'Base liquida feels Ruby Rose', precio:26000, categoria: "MAQUILLAJE", imagen: 'feels.png' },
    { id: 'Gel para cejas Melu', nombre: 'Gel para cejas Melu', precio:14200, categoria: "MAQUILLAJE", imagen: 'melu.png' },
    { id: 'Polvo translucido Ruby Rose', nombre: 'Polvo translucido Ruby Rose', precio:24500, categoria: "MAQUILLAJE", imagen: 'polru.png' },
    { id: 'Polvo suelto Raquel', nombre: 'Polvo suelto Raquel', precio:19900, categoria: "MAQUILLAJE", imagen: 'polra.png' },
    { id: 'pestañina PROSA', nombre: 'Pestañina PROSA', precio:16900, categoria: "MAQUILLAJE", imagen: 'pros.png' },
    { id: 'Acondicionador ultranutritivo premium', nombre: 'acondicionador ultranutritivo premium', precio:37400, categoria: "MAQUILLAJE", imagen: 'premium.png' },
    { id: 'Acondicionador milagro herbal', nombre: 'Acondicionador milagro herbal', precio:37400, categoria: "MAQUILLAJE", imagen: 'herbal.png' },
    { id: 'Ampolleta de tratamiento rescate instantaneo', nombre: 'Ampolleta de tratamiento rescate instantaneo', precio:15400, categoria: "MAQUILLAJE", imagen: 'ampo.pnj.png' },
    { id: 'Shampoo en seco Milagros', nombre: 'Shampoo en seco Milagros', precio:44400, categoria: "MAQUILLAJE", imagen: 'seco.png' },
    { id: 'Desenredante multibeneficiosos Milagros', nombre: 'Desenredante multibeneficioso Milagros', precio:35800, categoria: "MAQUILLAJE", imagen: 'bene.png' },
    { id: 'Desenredante termoprotector', nombre: 'Desenredante termoprotector', precio:35800, categoria: "MAQUILLAJE", imagen: 'desen.png' },
    { id: 'Serum revitalizante multibeneficios Milagros', nombre: 'Serum revitalizante multibeneficios Milagros', precio:38200, categoria: "MAQUILLAJE", imagen: 'ser.png' },
    { id: 'Shampoo anticaspa Milagros', nombre: 'Shampoo anticaspa Milagros', precio:37000, categoria: "MAQUILLAJE", imagen: 'anti.png' },
    { id: 'Shampoo emergencia capilar Milagros', nombre: 'Shampoo emergencia capilar Milagros', precio:37000, categoria: "MAQUILLAJE", imagen: 'emer.png' },
    { id: 'Shampoo kids Milagros', nombre: 'Shampoo kids Milagros', precio:37000, categoria: "MAQUILLAJE", imagen: 'kid.png' },
    { id: 'Shampoo magia capilar Milagros', nombre: 'Shampoo magia capilar Milagros', precio:37000, categoria: "MAQUILLAJE", imagen: 'magia.png' },
    { id: 'Shampoo milagro herbal Milagros', nombre: 'Shampoo milagro herbal Milagros', precio:38200, categoria: "MAQUILLAJE", imagen: 'herball.png' },
    { id: 'Shampoo ultranutritivo Milagros', nombre: 'Shampoo ultranutritivo Milagros', precio:38200, categoria: "MAQUILLAJE", imagen: 'anto.png' },
    { id: 'Crema para peinar La Poción', nombre: 'Crema para peinar La Poción', precio:36000, categoria: "MAQUILLAJE", imagen: 'poci.png' },
    { id: 'Mascarilla tongoléla Poción', nombre: 'Mascarilla Tongoléla Poción', precio:37000, categoria: "MAQUILLAJE", imagen: 'tongo.png' },
    { id: 'lip oil engol', nombre: 'lip oil engol', precio:5000, categoria: "MAQUILLAJE", imagen: 'eng.png' }, 







    // otros productos...
  ];
  
  function renderizarProductos() {
    const contenedor = document.querySelector('.product-grid');
    contenedor.innerHTML = '';
  
    productos.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'product-card';
  
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toLocaleString()}</p>
        <button class="btn-add" onclick="agregarDesdeProducto('${producto.id}', '${producto.nombre}', ${producto.precio})">
          Añadir al carrito
        </button>
      `;
  
      contenedor.appendChild(card);
    });
  }
  
  // 🔽 Esta línea va al final del script
  document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
  });


  // para realizar una subventana en productos
  function toggleSubmenu(event) {
  event.preventDefault();
  const navItem = event.target.closest('.nav-item-con-submenu');
  navItem.classList.toggle('show');
}


function mostrarProductosPorCategoria(Categoria) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // Limpia el contenido anterior

  const filtrados = productos.filter(producto => producto.categoria === categoria);

  filtrados.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
    `;
    contenedor.appendChild(div);
  });
}
const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const links = menu.querySelectorAll('a');

  // Abre/cierra el menú al hacer clic en la hamburguesa
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Cierra el menú al hacer clic en cualquier enlace
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });


  // script.js
let carro = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarContador() {
  const contador = document.getElementById("contadorCarrito");
  contador.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

function agregarDesdeProducto(id, nombre, precio) {
  const productoExistente = carrito.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Al cargar la página, actualizar contador
document.addEventListener("DOMContentLoaded", actualizarContador);

function toggleCarrito() {
  window.open("carrito.html", "_blank"); // Abre en nueva pestaña
}

localStorage.setItem("carrito", JSON.stringify(carrito));

let carri = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", actualizarContador);

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contador.textContent = totalProductos;
}


document.getElementById("contadorCarrito");


