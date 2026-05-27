
// RFC1 – Top hoteles por calificación

use("dann_alpes_nosql");

db.resenas.aggregate([

  {
    $match: {
      fechaCreacion: {
        $gte: new Date("2025-01-01"),
        $lte: new Date("2025-12-31")
      },
      estado: "publicada"
    }
  },

  {
    $group: {
      _id: "$idHotel",

      promedioCalificacion: {
        $avg: "$calificacion"
      },

      totalResenas: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      promedioCalificacion: -1
    }
  },

  {
    $limit: 10
  }

]);


// RFC2 – Evolución de la reputación de un hotel en el tiempo

db.resenas.aggregate([

  {
    $match: {

      idHotel: idHotelParam,

      estado: "publicada",

      fechaCreacion: {
        $gte: new Date(`${anioParam}-01-01`),
        $lt: new Date(`${anioParam + 1}-01-01`)
      }
    }
  },

  {
    $group: {

      _id: {
        mes: {
          $month: "$fechaCreacion"
        }
      },

      promedioMensual: {
        $avg: "$calificacion"
      },

      cantidadResenas: {
        $sum: 1
      }
    }
  },

  {
    $project: {

      _id: 0,

      mes: "$_id.mes",

      promedioMensual: {
        $round: ["$promedioMensual", 2]
      },

      cantidadResenas: 1
    }
  },

  {
    $sort: {
      mes: 1
    }
  }

]);


// RFC3 – Perfil comparativo de hoteles por ciudad

db.resenas.aggregate([

  {
    $match: {
      estado: "publicada"
    }
  },

  {
    $group: {

      _id: "$idHotel",

      promedioGeneral: {
        $avg: "$calificacion"
      },

      totalResenas: {
        $sum: 1
      },

      respuestasAdmin: {
        $sum: {
          $cond: [
            {
              $ne: ["$respuestaAdmin", null]
            },
            1,
            0
          ]
        }
      },

      destacadas: {
        $sum: {
          $cond: [
            {
              $eq: ["$destacada", true]
            },
            1,
            0
          ]
        }
      }
    }
  }

]);