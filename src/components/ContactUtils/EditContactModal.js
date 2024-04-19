import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { handleEditContact } from '../ContactUtils/ContactUtils';

/**
 * Componente funcional que muestra un modal para editar un contacto.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.editModalVisible - Indica si el modal de edición está visible.
 * @param {function} props.setEditModalVisible - Función para controlar la visibilidad del modal de edición.
 * @param {object} props.selectedContactDetails - Detalles del contacto seleccionado.
 * @param {function} props.handleInputChange - Función para manejar el cambio en los campos de entrada.
 * @returns {JSX.Element} Elemento JSX que representa el modal de edición de contacto.
 */
export default function EditContactModal({ editModalVisible, setEditModalVisible, selectedContactDetails, handleInputChange }) {
    /**
     * Maneja la acción de guardar los cambios del contacto.
     */
    const handleSaveChanges = async () => {
        // Verifica si los detalles del contacto seleccionado están definidos
        if (!selectedContactDetails) {
            console.error('Los detalles de contacto seleccionados son indefinidos.');
            return;
        }
        
        // Envía una solicitud para editar el contacto con los detalles actualizados
        await handleEditContact(selectedContactDetails.id, selectedContactDetails);
        // Oculta el modal de edición después de guardar los cambios
        setEditModalVisible(false);
    };
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.editModalContent}>
                    {/* Título del modal */}
                    <Text style={styles.modalTitle}>Editar Contacto</Text>
                    {/* Campos de entrada para editar los detalles del contacto */}
                    {selectedContactDetails && (
                        <View>
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Nombre"
                                value={selectedContactDetails.nombre}
                                onChangeText={(text) => handleInputChange(text, 'nombre')}
                            />
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Apellido Paterno"
                                value={selectedContactDetails.apeP}
                                onChangeText={(text) => handleInputChange(text, 'apeP')}
                            />
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Apellido Materno"
                                value={selectedContactDetails.apeM}
                                onChangeText={(text) => handleInputChange(text, 'apeM')}
                            />
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Telefono"
                                value={selectedContactDetails.tel}
                                onChangeText={(text) => handleInputChange(text, 'tel')}
                            />
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Correo"
                                value={selectedContactDetails.correo}
                                onChangeText={(text) => handleInputChange(text, 'correo')}
                            />
                            <TextInput
                                style={styles.inputEdit}
                                placeholder="Direccion"
                                value={selectedContactDetails.dir}
                                onChangeText={(text) => handleInputChange(text, 'dir')}
                            />
                            {/* Agregar más inputs según los campos necesarios */}
                        </View>
                    )}
                    {/* Botón para guardar los cambios */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                    {/* Botón para cerrar el modal sin guardar cambios */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setEditModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    editModalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputEdit: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
