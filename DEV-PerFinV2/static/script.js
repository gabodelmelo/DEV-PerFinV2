document.addEventListener("DOMContentLoaded", function() {
    // Define una función para crear un gráfico de barras
    function crearGrafico(canvasID, labels, datos, titulo, color) {
        // Define los datos del gráfico de barras
        var data = {
            labels: labels, // Usar las fechas como etiquetas en el eje X
            datasets: [
                {
                    label: titulo,
                    data: datos, // Usar los montos como datos en el eje Y
                    backgroundColor: color, // Color de las barras
                },
            ],
        };

        // Configuración del gráfico de barras
        var config = {
            type: 'bar', // Tipo de gráfico de barras
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Fechas', // Etiqueta del eje X
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Euros', // Etiqueta del eje Y
                        },
                    },
                },
            },
        };

        // Obtiene el elemento canvas por su ID
        var canvas = document.getElementById(canvasID);

        // Crea un contexto 2D para el gráfico
        var ctx = canvas.getContext('2d');

        // Crea el gráfico de barras
        var myBarChart = new Chart(ctx, config);
    }

    // Procesa los datos de ingresos y gastos desde JSON (asegúrate de que ingresos_json y gastos_json estén disponibles)
    var ingresos = JSON.parse(ingresos_json);
    var gastos = JSON.parse(gastos_json);

    // Crea un array de objetos donde cada objeto contiene una fecha y un monto para ingresos y gastos
    var datosIngresos = ingresos.map(function(item) {
        return { fecha: item.fecha, monto: item.monto };
    });

    var datosGastos = gastos.map(function(item) {
        return { fecha: item.fecha, monto: item.monto };
    });

    // Extrae las fechas y montos de ingresos y gastos
    var fechasIngresos = datosIngresos.map(function(item) {
        return item.fecha; // Supongamos que tus objetos de ingresos tienen una propiedad 'fecha'
    });

    var montosIngresos = datosIngresos.map(function(item) {
        return item.monto; // Supongamos que tus objetos de ingresos tienen una propiedad 'monto'
    });

    var fechasGastos = datosGastos.map(function(item) {
        return item.fecha; // Supongamos que tus objetos de gastos tienen una propiedad 'fecha'
    });

    var montosGastos = datosGastos.map(function(item) {
        return item.monto; // Supongamos que tus objetos de gastos tienen una propiedad 'monto'
    });

    // Crea gráficos separados para ingresos y gastos
    crearGrafico('miGraficoIngresos', fechasIngresos, montosIngresos, 'Ingresos', 'green');
    crearGrafico('miGraficoGastos', fechasGastos, montosGastos, 'Gastos', 'red');

   // Calcula la suma total de ingresos
var totalIngresos = ingresos.reduce(function (total, ingreso) {
    return total + ingreso.monto;
  }, 0);
  
  // Calcula la suma total de gastos
  var totalGastos = gastos.reduce(function (total, gasto) {
    return total + gasto.monto;
  }, 0);
  
  // Actualiza los valores en el HTML
  document.getElementById('totalIngresos').textContent = totalIngresos.toFixed(2);
  document.getElementById('totalGastos').textContent = totalGastos.toFixed(2);
  


    document.querySelector(".nav-btn").addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("active");
    });
});
