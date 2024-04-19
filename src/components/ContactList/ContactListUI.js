import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import NewContactButton from '../NewContact/NewContactButton';
import ContactDetailsModal from '../ContactDetails/ContactDetailsModal';
import axios from 'axios';
import EditContactModal from '../ContactUtils/EditContactModal';

export default function ContactListUI() {
    // Estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para almacenar los datos de los usuarios
    const [userData, setUserData] = useState(null);
    // Estado para almacenar los datos filtrados según el término de búsqueda
    const [filteredData, setFilteredData] = useState(null);
    // Estado para almacenar el contacto seleccionado para mostrar los detalles
    const [selectedContact, setSelectedContact] = useState(null);
    // Estado para controlar la visibilidad del modal de detalles del contacto
    const [modalVisible, setModalVisible] = useState(false);
    // Estado para almacenar el ID del contacto seleccionado para editar o eliminar
    const [selectedId, setSelectedId] = useState(null);
    // Estado para almacenar los detalles del contacto seleccionado para editar
    const [selectedContactDetails, setSelectedContactDetails] = useState(null);
    // Estado para controlar la visibilidad del modal de edición de contacto
    const [editModalVisible, setEditModalVisible] = useState(false);

    // Función que se ejecuta al cargar el componente para obtener los datos de los usuarios
    useEffect(() => {
        fetchData();
    }, []);

    // Función para obtener los datos de los usuarios desde la API
    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.0.17:64201/usuario');
            // Almacena los datos de los usuarios y los establece como datos filtrados por defecto
            setUserData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Hubo un error al obtener los datos:', error);
        }
    };

    // Función para manejar el cambio en el término de búsqueda
    const handleSearch = (text) => {
        setSearchTerm(text);
        if (!text) {
            // Si no hay término de búsqueda, muestra todos los usuarios
            setFilteredData(userData);
            return;
        }
        // Filtra los usuarios según el término de búsqueda
        const filtered = userData.filter(item =>
            item.nombre.toLowerCase().includes(text.toLowerCase()) ||
            item.apeP.toLowerCase().includes(text.toLowerCase()) ||
            item.apeM.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // Función para manejar el clic en una tarjeta de usuario para mostrar los detalles
    const handleCardPress = (contact) => {
        setSelectedContact(contact);
        setModalVisible(true);
    };

    // Función para manejar el clic en el botón de editar un contacto
    const handleEdit = async (id) => {
        setSelectedId(id); // Establece selectedId con el ID del contacto seleccionado
        // Obtiene los detalles del contacto seleccionado
        const contactDetails = await fetchContactDetails(id);
        setSelectedContactDetails(contactDetails);
        setEditModalVisible(true);
    };

    // Función para manejar el clic en el botón de eliminar un contacto
    const handleDelete = async (id) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que quieres eliminar este contacto?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            // Envía la solicitud para eliminar el contacto
                            await axios.delete(`http://192.168.0.17:64201/usuario/${id}`);
                            // Actualiza la lista de contactos después de eliminar
                            const updatedData = userData.filter(item => item.id !== id);
                            setUserData(updatedData);
                            setFilteredData(updatedData);
                            // Muestra una alerta o mensaje de éxito
                            Alert.alert('Éxito', 'El contacto se ha eliminado correctamente.');
                        } catch (error) {
                            console.error('Error al eliminar el contacto:', error);
                            // Muestra una alerta o mensaje de error
                            Alert.alert('Error', 'Hubo un error al eliminar el contacto. Por favor, inténtalo de nuevo.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // Función para obtener los detalles de un contacto desde la API
    const fetchContactDetails = async (id) => {
        try {
            const response = await axios.get(`http://192.168.0.17:64201/usuario/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Hubo un error al obtener los detalles del contacto.');
                return null;
            }
        } catch (error) {
            console.error('Error al obtener los detalles del contacto:', error);
            return null;
        }
    };

    // Función para manejar el cambio en un campo de edición de contacto
    const handleInputChange = (value, field) => {
        setSelectedContactDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // Función para guardar los cambios al editar un contacto
    const handleSaveChanges = async () => {
        try {
            // Envía la solicitud para actualizar los detalles del contacto
            await axios.put(`http://192.168.0.17:64201/usuario/${selectedId}`, selectedContactDetails);
            // Actualiza los detalles del contacto en la lista de usuarios
            const updatedUserData = userData.map(user => {
                if (user.id === selectedId) {
                    return selectedContactDetails;
                }
                return user;
            });
            setUserData(updatedUserData);
            setEditModalVisible(false);
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    // Función para renderizar una tarjeta de usuario
    const renderUsuario = ({ item }) => (
        <TouchableOpacity style={styles.usuarioCard} onPress={() => handleCardPress(item)}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.apellidos}>{item.apeP} {item.apeM}</Text>
            <View style={styles.buttonContainer}>
                {/* Botón para editar un contacto */}
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                {/* Botón para eliminar un contacto */}
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Contactos</Text>
            <View style={styles.header}>
                {/* Entrada de texto para buscar contactos */}
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    onChangeText={handleSearch}
                    value={searchTerm}
                />
                {/* Botón para agregar un nuevo contacto */}
                <NewContactButton onPress={() => setModalVisible(true)} />
            </View>
            {/* Lista de contactos */}
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                renderItem={renderUsuario}
                extraData={filteredData}
            />
            {/* Modal para mostrar los detalles del contacto */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ContactDetailsModal contact={selectedContact} closeModal={() => setModalVisible(false)} />
            </Modal>
            {/* Modal para editar un contacto */}
            <EditContactModal
                editModalVisible={editModalVisible}
                setEditModalVisible={setEditModalVisible}
                selectedContactDetails={selectedContactDetails}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
            />
        </View>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    usuarioCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 15,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    apellidos: {
        fontSize: 16,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: 'blue',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});

