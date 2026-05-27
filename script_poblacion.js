
use("ISIS2304E31202610");

let resenas = [];

for (let i = 1; i <= 60; i++) {

  let hotel = ((i - 1) % 15) + 1;

  let calificacion = (i % 5) + 1;

  let destacada = (i % 15 === 0);

  let utilidadCantidad = (i % 7) + 1;

  let usuariosUtilidad = [];

  for (let j = 1; j <= utilidadCantidad; j++) {
    usuariosUtilidad.push(j + i);
  }

  let respuesta = null;

  if (i % 2 === 0) {
    respuesta = {
      idAdmin: hotel,
      texto: "Gracias por compartir su experiencia con nuestro hotel.",
      fechaRespuesta: new Date(`2025-${((i % 12) + 1).toString().padStart(2, "0")}-15`)
    };
  }

  resenas.push({
    idReserva: i,
    idHotel: hotel,
    idCliente: i,
    calificacion: calificacion,
    comentario:
      "Reseña número " + i +
      ". La experiencia general en el hotel fue satisfactoria y el servicio recibido cumplió con las expectativas del huésped.",
    fechaCreacion: new Date(
      `2025-${((i % 12) + 1).toString().padStart(2, "0")}-10`
    ),
    fechaActualizacion: new Date(
      `2025-${((i % 12) + 1).toString().padStart(2, "0")}-11`
    ),
    estado: "publicada",
    destacada: destacada,
    utilidad: {
      cantidad: utilidadCantidad,
      usuarios: usuariosUtilidad
    },
    respuestaAdmin: respuesta
  });
}

db.resenas.insertMany(resenas);