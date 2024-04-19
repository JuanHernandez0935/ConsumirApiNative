import axios from 'axios';

/**
 * Maneja la edición de un contacto.
 * @param {number} id - El ID del contacto a editar.
 * @param {object} updatedContactDetails - Los detalles actualizados del contacto.
 */
export const handleEditContact = async (id, updatedContactDetails) => {
    try {
        // Verifica si los detalles de contacto actualizados están definidos
        if (!updatedContactDetails) {
            console.error('Los detalles de contacto actualizados son indefinidos.');
            return;
        }

        // Envía la solicitud para actualizar los detalles del contacto
        const response = await axios.put(`http://192.168.14.248:64201/usuario/${id}`, updatedContactDetails);

        // Verifica si la solicitud fue exitosa
        if (response.status === 200) {
            console.log('Contacto editado exitosamente');
        } else {
            console.error('Hubo un error al editar el contacto.');
        }
    } catch (error) {
        console.error('Error al editar el contacto:', error);
    }
};


