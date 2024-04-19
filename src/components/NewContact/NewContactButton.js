import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * Componente funcional que representa un botón para añadir un nuevo contacto.
 * Al presionar el botón, se muestra un modal para ingresar los detalles del nuevo contacto.
 * @returns {JSX.Element} Elemento JSX que representa el botón para añadir un nuevo contacto.
 */
const NewContactButton = () => {
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
    const [nombre, setNombre] = useState(''); // Estado para el nombre del nuevo contacto
    const [apellidoPaterno, setApellidoPaterno] = useState(''); // Estado para el apellido paterno del nuevo contacto
    const [apellidoMaterno, setApellidoMaterno] = useState(''); // Estado para el apellido materno del nuevo contacto
    const [correoElectronico, setCorreoElectronico] = useState(''); // Estado para el correo electrónico del nuevo contacto
    const [telefono, setTelefono] = useState(''); // Estado para el teléfono del nuevo contacto
    const [direccion, setDireccion] = useState(''); // Estado para la dirección del nuevo contacto

    /**
     * Maneja la acción de presionar el botón para mostrar el modal de creación de nuevo contacto.
     */
    const handlePress = () => {
        setModalVisible(true); // Muestra el modal
    };

    /**
     * Maneja la acción de cerrar el modal.
     */
    const handleCloseModal = () => {
        setModalVisible(false); // Oculta el modal
    };

    /**
     * Maneja la acción de guardar un nuevo usuario.
     * Envía los datos del nuevo contacto al backend y cierra el modal.
     */
    const handleGuardarUsuario = () => {
        // Crea un objeto con los datos del nuevo usuario
        const nuevoUsuario = {
            nombre,
            apeP: apellidoPaterno,
            apeM: apellidoMaterno,
            tel: telefono,
            correo: correoElectronico,
            dir: direccion
        };

        // Envía una solicitud POST al backend para guardar el nuevo usuario
        fetch('http://192.168.14.248:64201/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario creado:', data);
            // Aquí podrías actualizar la lista de contactos o realizar alguna acción adicional
        })
        .catch(error => console.error('Error al guardar usuario:', error));

        // Cierra el modal después de guardar el usuario
        setModalVisible(false);
    };

    return (
        <>
            {/* Botón para mostrar el modal de creación de nuevo contacto */}
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <AntDesign name="pluscircle" size={22} color="white" />
            </TouchableOpacity>
            {/* Modal para ingresar los detalles del nuevo contacto */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                {/* Fondo semitransparente detrás del modal */}
                <TouchableOpacity style={styles.background} onPress={handleCloseModal} />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Campos de entrada para los detalles del nuevo contacto */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={text => setNombre(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Paterno"
                            value={apellidoPaterno}
                            onChangeText={text => setApellidoPaterno(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Materno"
                            value={apellidoMaterno}
                            onChangeText={text => setApellidoMaterno(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            value={correoElectronico}
                            onChangeText={text => setCorreoElectronico(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={telefono}
                            onChangeText={text => setTelefono(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            value={direccion}
                            onChangeText={text => setDireccion(text)}
                        />
                        {/* Botón para guardar los detalles del nuevo contacto */}
                        <TouchableOpacity style={styles.guardarButton} onPress={handleGuardarUsuario}>
                            <AntDesign name="save" size={24} color="white" />
                        </TouchableOpacity>
                        {/* Botón para cerrar el modal sin guardar los detalles */}
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <AntDesign name="close" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    guardarButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    guardarButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1, // Para que el botón esté por encima del modal
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
});

export default NewContactButton;

