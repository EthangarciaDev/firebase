import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import appFirebase from "./credentials"; 


const db = getFirestore(appFirebase);

export default function App() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoHobby, setNuevoHobby] = useState("");

  const cargarUsuarios = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Usuarios")); 
      const datos = snapshot.docs.map((documento) => ({
        id: documento.id,
        nombre: documento.data().nombre,
        pasatiempo: documento.data().pasatiempo,
      }));
      setListaUsuarios(datos);
    } catch (err) {
      console.error("Error cargando:", err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios(); 
  }, []);

  const guardarNuevoUsuario = async () => {
    if (!nuevoNombre.trim() || !nuevoHobby.trim()) {
      Alert.alert("Atención", "Debes llenar todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, "Usuarios"), {
        nombre: nuevoNombre.trim(),
        pasatiempo: nuevoHobby.trim(),
      });

      Alert.alert("Listo", "Se guardó el usuario");

      setNuevoNombre("");
      setNuevoHobby("");

      cargarUsuarios();
    } catch (err) {
      Alert.alert("Error", "No se guardó: " + err.message);
    }
  };

  const renderizarUsuario = ({ item }) => (
    <View style={estilos.tarjeta}>
      <Text style={estilos.nombreTexto}>{item.nombre}</Text>
      <Text style={estilos.hobbyTexto}>Pasatiempo: {item.pasatiempo}</Text>
    </View>
  );

  return (
    <SafeAreaView style={estilos.pantalla}>
      <View style={estilos.encabezado}>
        <Text style={estilos.tituloApp}>Mi Lista</Text>
      </View>

      <View style={estilos.formulario}>
        <TextInput
          style={estilos.campo}
          placeholder="Tu nombre..."
          placeholderTextColor="#999"
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
        />

        <TextInput
          style={estilos.campo}
          placeholder="Tu pasatiempo..."
          placeholderTextColor="#999"
          value={nuevoHobby}
          onChangeText={setNuevoHobby}
        />

        <TouchableOpacity
          style={estilos.boton}
          onPress={guardarNuevoUsuario}
        >
          <Text style={estilos.botonTexto}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.separador} />

      <FlatList
        data={listaUsuarios}
        renderItem={renderizarUsuario}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={
          <Text style={estilos.vacio}>No hay usuarios aún</Text>
        }
      />
    </SafeAreaView>
  );
}


const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  encabezado: {
    backgroundColor: "#4a90e2",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  tituloApp: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  formulario: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campo: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  separador: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 15,
  },
  lista: {
    padding: 15,
  },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4a90e2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  nombreTexto: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  hobbyTexto: {
    fontSize: 15,
    color: "#666",
  },
  vacio: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 30,
  },
});