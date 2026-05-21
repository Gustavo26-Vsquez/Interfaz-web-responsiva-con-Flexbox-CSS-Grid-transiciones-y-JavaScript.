

const navbar = document.getElementById('navbar');
const botonMenu = document.getElementById('botonMenu');
const menu = document.getElementById('menu');


window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
        navbar.classList.add('con-fondo');
    } else {
        navbar.classList.remove('con-fondo');
    }
});


botonMenu.addEventListener('click', function () {
    menu.classList.toggle('abierto');
});


menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menu.classList.remove('abierto');
    });
});


/*
FILTRO DE GALERÍA
   Al hacer clic en un botón de categoría, muestra solo
   las tarjetas que pertenecen a esa categoría
*/

const botonesFiltro = document.querySelectorAll('.filtro');
const tarjetas = document.querySelectorAll('.tarjeta');

botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {

        botonesFiltro.forEach(function (b) {
            b.classList.remove('activo');
        });


        boton.classList.add('activo');


        var categoria = boton.getAttribute('data-categoria');


        tarjetas.forEach(function (tarjeta) {
            var categoriaTarjeta = tarjeta.getAttribute('data-categoria');

            if (categoria === 'todos' || categoriaTarjeta === categoria) {
                tarjeta.classList.remove('oculta');

                tarjeta.style.animation = 'fadeUp 0.4s ease both';
            } else {
                tarjeta.classList.add('oculta');
            }
        });
    });
});


/*  WIDGET DE CLIMA INTERACTIVO
   Muestra temperatura, lluvia y actividades según el mes
 */

// Información de clima para cada mes
var climaMeses = [
    {
        nombre: 'Enero',
        icono: '☀️',
        descripcion: 'Tiempo seco y soleado. Cielos despejados y brisas frescas. El mejor mes para visitar playas y volcanes.',
        temperatura: 82,       // número para la barra (del 0 al 100)
        tempTexto: '28°C',
        lluvia: 5,
        lluviaTexto: '5 mm',
        actividades: ['Playas', 'Senderismo', 'Surf']
    },
    {
        nombre: 'Febrero',
        icono: '🌤️',
        descripcion: 'Días cálidos y noches frescas. Ideal para recorrer la Ruta de las Flores sin muchos turistas.',
        temperatura: 83,
        tempTexto: '29°C',
        lluvia: 5,
        lluviaTexto: '5 mm',
        actividades: ['Ruta de Flores', 'Cultura', 'Ciclismo']
    },
    {
        nombre: 'Marzo',
        icono: '🌞',
        descripcion: 'Calor intenso y ambiente seco. Las playas están en su mejor nivel. Muy recomendado para el mar.',
        temperatura: 90,
        tempTexto: '32°C',
        lluvia: 8,
        lluviaTexto: '8 mm',
        actividades: ['Playas', 'Cascadas', 'Surf']
    },
    {
        nombre: 'Abril',
        icono: '🌞',
        descripcion: 'El mes más caluroso. Semana Santa se celebra con festividades muy coloridas en todo el país.',
        temperatura: 95,
        tempTexto: '33°C',
        lluvia: 15,
        lluviaTexto: '15 mm',
        actividades: ['Cultura', 'Festivales', 'Playas']
    },
    {
        nombre: 'Mayo',
        icono: '🌦️',
        descripcion: 'Empiezan las lluvias. Los paisajes se vuelven muy verdes. El bosque El Imposible está en su esplendor.',
        temperatura: 85,
        tempTexto: '30°C',
        lluvia: 55,
        lluviaTexto: '55 mm',
        actividades: ['Naturaleza', 'Ecoturismo', 'Fotografía']
    },
    {
        nombre: 'Junio',
        icono: '🌧️',
        descripcion: 'Llueve bastante por las tardes. Las mañanas suelen ser despejadas. Bueno para cultura y gastronomía.',
        temperatura: 80,
        tempTexto: '28°C',
        lluvia: 80,
        lluviaTexto: '80 mm',
        actividades: ['Cultura', 'Gastronomía', 'Lagos']
    },
    {
        nombre: 'Julio',
        icono: '⛅',
        descripcion: 'Veranillo de San Juan: las lluvias bajan un poco. Temperatura agradable. Buen momento para los lagos.',
        temperatura: 82,
        tempTexto: '29°C',
        lluvia: 60,
        lluviaTexto: '60 mm',
        actividades: ['Lagos', 'Pueblos', 'Aventura']
    },
    {
        nombre: 'Agosto',
        icono: '🌦️',
        descripcion: 'Lluvias tropicales. Los ríos y cascadas están llenos de agua. Ideal para turismo de aventura.',
        temperatura: 80,
        tempTexto: '28°C',
        lluvia: 90,
        lluviaTexto: '90 mm',
        actividades: ['Cascadas', 'Rafting', 'Naturaleza']
    },
    {
        nombre: 'Septiembre',
        icono: '🌩️',
        descripcion: 'El mes más lluvioso del año. Recomendado para viajeros que disfrutan la naturaleza bajo la lluvia.',
        temperatura: 78,
        tempTexto: '27°C',
        lluvia: 95,
        lluviaTexto: '95 mm',
        actividades: ['Naturaleza', 'Hoteles', 'Fotografía']
    },
    {
        nombre: 'Octubre',
        icono: '🌦️',
        descripcion: 'Las lluvias van disminuyendo. Los paisajes siguen muy verdes y los precios de hospedaje son más bajos.',
        temperatura: 79,
        tempTexto: '27°C',
        lluvia: 70,
        lluviaTexto: '70 mm',
        actividades: ['Senderismo', 'Fotografía', 'Cultura']
    },
    {
        nombre: 'Noviembre',
        icono: '🌤️',
        descripcion: 'Termina la época lluviosa. Tiempo perfecto para el surf en La Libertad y subir volcanes.',
        temperatura: 82,
        tempTexto: '29°C',
        lluvia: 20,
        lluviaTexto: '20 mm',
        actividades: ['Surf', 'Volcanes', 'Playas']
    },
    {
        nombre: 'Diciembre',
        icono: '☀️',
        descripcion: 'Clima muy agradable, seco y fresco. Fiestas navideñas con posadas y nacimientos artísticos por todo el país.',
        temperatura: 81,
        tempTexto: '28°C',
        lluvia: 8,
        lluviaTexto: '8 mm',
        actividades: ['Festivales', 'Cultura', 'Playas', 'Familia']
    }
];

// Selecciona los elementos del panel de clima
var botonesmes = document.querySelectorAll('.mes');
var climaIcono = document.getElementById('climaIcono');
var climaMes = document.getElementById('climaMes');
var climaDesc = document.getElementById('climaDescripcion');
var barraTemp = document.getElementById('barraTemp');
var barraLluvia = document.getElementById('barraLluvia');
var valorTemp = document.getElementById('valorTemp');
var valorLluvia = document.getElementById('valorLluvia');
var etiquetas = document.getElementById('etiquetasActividades');

// Función para mostrar la información de un mes
function mostrarClima(numeroMes) {
    var datos = climaMeses[numeroMes];

    // Actualiza el texto del panel
    climaIcono.textContent = datos.icono;
    climaMes.textContent = datos.nombre;
    climaDesc.textContent = datos.descripcion;
    valorTemp.textContent = datos.tempTexto;
    valorLluvia.textContent = datos.lluviaTexto;


    barraTemp.style.width = datos.temperatura + '%';
    barraLluvia.style.width = datos.lluvia + '%';

    // Crea las etiquetas de actividades
    etiquetas.innerHTML = '';
    datos.actividades.forEach(function (actividad) {
        var etiqueta = document.createElement('span');
        etiqueta.className = 'etiqueta-actividad';
        etiqueta.textContent = actividad;
        etiquetas.appendChild(etiqueta);
    });
}


botonesmes.forEach(function (boton) {
    boton.addEventListener('click', function () {


        botonesmes.forEach(function (b) {
            b.classList.remove('activo');
        });


        boton.classList.add('activo');


        var numeroMes = parseInt(boton.getAttribute('data-mes'));
        mostrarClima(numeroMes);
    });
});


var mesActual = new Date().getMonth();
botonesmes[mesActual].classList.add('activo');
mostrarClima(mesActual);


/* 
 SCROLL SUAVE para los enlaces del menú
  */
document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
    enlace.addEventListener('click', function (evento) {
        evento.preventDefault();
        var destino = document.querySelector(enlace.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});