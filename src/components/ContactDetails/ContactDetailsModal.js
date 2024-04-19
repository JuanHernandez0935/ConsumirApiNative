import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Componente funcional ContactDetailsModal
const ContactDetailsModal = ({ contact, closeModal }) => {
  return (
    // Modal para mostrar los detalles del contacto
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={closeModal} // Función para cerrar el modal
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Nombre del contacto */}
          <Text style={styles.modalText}><AntDesign name="user" size={24} color="black" />{contact.nombre} {contact.apeP} {contact.apeM}</Text>
          {/* Correo electrónico del contacto */}
          <Text style={styles.modalText}><AntDesign name="mail" size={24} color="black" /> {contact.correo}</Text>
          {/* Teléfono del contacto */}
          <Text style={styles.modalText}><AntDesign name="mobile1" size={24} color="black" /> {contact.tel}</Text>
          {/* Dirección del contacto */}
          <Text style={styles.modalText}><FontAwesome5 name="house-user" size={24} color="black" /> {contact.dir}</Text>
          {/* Botón para cerrar el modal */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalView: {
    backgroundColor: 'white', // Fondo del modal
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5, // Sombra en Android
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue', // Color de fondo del botón Cerrar
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white', // Color del texto del botón Cerrar
    fontWeight: 'bold',
  },
});

export default ContactDetailsModal; // Exporta el componente
