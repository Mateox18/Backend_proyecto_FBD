
use("ISIS2304E31202610");

db.resenas.drop();

db.createCollection("resenas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "idReserva",
        "idHotel",
        "idCliente",
        "calificacion",
        "comentario",
        "fechaCreacion",
        "estado"
      ],
      properties: {
        idReserva: {
          bsonType: "int"
        },
        idHotel: {
          bsonType: "int"
        },
        idCliente: {
          bsonType: "int"
        },
        calificacion: {
          bsonType: "int",
          minimum: 1,
          maximum: 5
        },
        comentario: {
          bsonType: "string"
        },
        fechaCreacion: {
          bsonType: "date"
        },
        fechaActualizacion: {
          bsonType: "date"
        },
        estado: {
          enum: ["publicada", "eliminada"]
        },
        destacada: {
          bsonType: "bool"
        },
        utilidad: {
          bsonType: "object",
          properties: {
            cantidad: {
              bsonType: "int",
              minimum: 0
            },
            usuarios: {
              bsonType: "array",
              items: {
                bsonType: "int"
              }
            }
          }
        },
        respuestaAdmin: {
          bsonType: ["object", "null"],
          properties: {
            idAdmin: {
              bsonType: "int"
            },
            texto: {
              bsonType: "string"
            },
            fechaRespuesta: {
              bsonType: "date"
            }
          }
        }
      }
    }
  },
  validationLevel: "strict"
});