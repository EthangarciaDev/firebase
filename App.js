//Importa librerías
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
//Contiene las credenciales y la configuración necesaria para inicializar Firebase en tu proyecto
import appFirebase from './credentials.js';

// Inicializa y devuelve una instancia de Firestore, una base de datos en tiempo real basada en documentos
const db = getFirestore(appFirebase);

export default function App() {
  // Declara un arreglo para almacenar usuarios
  const [usuarios, setUsuarios] = useState([]);

  // useEffect -Una de sus tareas es la obtención de datos
  useEffect(() => {
    // Función asincrónica para obtener documentos de la colección 'Usuarios'
    const Documentos = async() => {
      try {
        // Realiza una consulta en la colección 'Usuarios'
        const consulta = await getDocs(collection(db, 'Usuarios'));
        // Mapea los documentos obtenidos para extraer el campo 'nombre'
        const valoresDocumentos = consulta.docs.map(doc => ({
          nombre: doc.data().nombre,
          pasatiempo: doc.data().pasatiempo
        }));
        // Actualiza el estado 'usuarios' con los nombres obtenidos
        setUsuarios(valoresDocumentos);
      } catch (error) {
        // Manejo de errores en caso de que falle la consulta
        console.error('Error al obtener documentos', error.message);
      }
    };
    // Llama a la función Documentos
    Documentos();
  }, []);

  return (
    // Renderiza la vista con los nombres de los usuarios obtenidos
    <View style={styles.contenedor}>
      <Text> Prueba de Base de Datos - Usuarios </Text>
      <Text> Nombre  Pasatiempo </Text>
      { usuarios.map((usuario, index) => (
        <Text key={index}> {usuario.nombre},  {usuario.pasatiempo} </Text>
      ))}
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'lightseagreen',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
})

