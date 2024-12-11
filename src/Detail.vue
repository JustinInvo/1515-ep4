<template>
  <div class="max-w-[800px] mx-auto p-6">
    <h1 class="mb-4 text-[22px]">Editar Cliente</h1>
    <div v-if="clientDetail">
      <h4>Datos del cliente:</h4>
      <label for="dni">DNI:</label>
      <input type="text" v-model="clientDetail.dni" />

      <label for="nombre">Nombre:</label>
      <input type="text" v-model="clientDetail.nombre" />

      <label for="apellido_paterno">Apellido Paterno:</label>
      <input type="text" v-model="clientDetail.apellido_paterno" />

      <label for="apellido_materno">Apellido Materno:</label>
      <input type="text" v-model="clientDetail.apellido_materno" />

      <button @click="saveClient">Guardar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const api_url = import.meta.env.VITE_API_ENDPOINT;
const clientDetail = ref(null);
const clientId = ref(router.params.id);

const getClientDetail = (id) => {
  return axios
    .get(`${api_url}/cliente/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error obteniendo detalle del cliente:', error);
      throw error;
    });
};

const saveClient = () => {
  axios
    .put(`${api_url}/cliente/${clientDetail.value.id}/`, clientDetail.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      alert('Cliente actualizado con éxito');
    })
    .catch((error) => {
      console.error('Error actualizando cliente:', error);
      alert('Error al actualizar el cliente');
    });
};

const cancelEdit = () => {
  // Lógica para cancelar la edición, como redirigir a otra vista o recargar datos.
  alert('Edición cancelada');
};

onMounted(async () => {
  clientDetail.value = await getClientDetail(clientId.value);
});
</script>