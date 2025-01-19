const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://blueMario:CarrilloM27@tarea.ii8yi.mongodb.net/Tarea', {
      dbName: 'Tarea',
    });
    console.log(`Conexión exitosa a MongoDB en la base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error al conectar con MongoDB: ${error.message}`);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

connectDB();
