<template>
  <div class="max-w-[800px] mx-auto p-6">
    <div>
      <h6 class="font-bold">Filtros:</h6>
      <div class="flex align-middle gap-4 mb-4">
        <div>
          <label for="dni">Dni</label>
          <input 
            type="text" 
            class="border-solid border-2 ml-2"
            v-model="dniFilter"
            @input="filterClients"
          >
        </div>
        <div>
          <label for="ape">Apellido paterno</label>
          <input 
            type="text" 
            class="border-solid border-2 ml-2"
            v-model="apellidoPaternoFilter"
            @input="filterClients"
          >
        </div>
      </div>
    </div>
    <div>
      <h4 class="font-bold">Nuestros clientes</h4>
      <ul>
        <li class="flex align-middle" v-for="(client, key) in filteredClients" :key="key">
          <p class="text-[14px]" @click="goDetail(client.id)"> 
            {{ client.dni }} - {{ client.nombre }} {{ client.apellido_paterno }} {{ client.apellido_materno }}
          </p>
          <div class="flex items-center align-middle gap-2 text-[14px] ml-4">
            <span class="text-[#4d7c0f] cursor-pointer" @click="editClient(client)">Editar</span>
            <span class="text-[#fca5a5] cursor-pointer" @click="deleteClient(client.id)">Eliminar</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Modal de edición -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h3 class="font-bold text-lg">Editar Cliente</h3>
        <form @submit.prevent="updateClient">
          <div class="mb-4">
            <label for="dni" class="block">DNI:</label>
            <input type="text" id="dni" v-model="selectedClient.dni" class="border-solid border-2 w-full p-2 mt-2">
          </div>
          <div class="mb-4">
            <label for="nombre" class="block">Nombre:</label>
            <input type="text" id="nombre" v-model="selectedClient.nombre" class="border-solid border-2 w-full p-2 mt-2">
          </div>
          <div class="mb-4">
            <label for="apellido_paterno" class="block">Apellido Paterno:</label>
            <input type="text" id="apellido_paterno" v-model="selectedClient.apellido_paterno" class="border-solid border-2 w-full p-2 mt-2">
          </div>
          <div class="mb-4">
            <label for="apellido_materno" class="block">Apellido Materno:</label>
            <input type="text" id="apellido_materno" v-model="selectedClient.apellido_materno" class="border-solid border-2 w-full p-2 mt-2">
          </div>
          <div class="flex justify-between">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
            <button type="button" @click="closeModal" class="bg-red-500 text-white py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const api_url = import.meta.env.VITE_API_ENDPOINT;
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const listClients = ref([]);
const filteredClients = ref([]);
const dniFilter = ref('');
const apellidoPaternoFilter = ref('');
const selectedClient = ref(null);
const isModalOpen = ref(false);
const router = useRouter();

// Función para obtener los clientes
const getClientsMethod = async () => {
  listClients.value = [
    {
      "id": 0,
      "nombre": "María",
      "apellido_paterno": "González",
      "apellido_materno": "Fernández",
      "dni": "87654321",
    },
    {
      "id": 1,
      "nombre": "Carlos",
      "apellido_paterno": "Ramírez",
      "apellido_materno": "Lopez",
      "dni": "12345678",
    },
    {
      "id": 2,
      "nombre": "Ana",
      "apellido_paterno": "Torres",
      "apellido_materno": "Vega",
      "dni": "98765432",
    }
  ];
  filteredClients.value = [...listClients.value]; // Inicializamos filteredClients con todos los clientes
};

// Función de filtro de clientes
const filterClients = () => {
  const dni = dniFilter.value.trim().toLowerCase();
  const apellidoPaterno = apellidoPaternoFilter.value.trim().toLowerCase();
  
  filteredClients.value = listClients.value.filter(client => {
    const clientDni = client.dni.toLowerCase();
    const clientApellidoPaterno = client.apellido_paterno.toLowerCase();
    return (
      clientDni.includes(dni) &&
      clientApellidoPaterno.includes(apellidoPaterno)
    );
  });
};

// Filtrar por DNI o Apellido Paterno
const editClient = (client) => {
  selectedClient.value = { ...client };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const updateClient = () => {
  axios.put(`${api_url}/cliente/${selectedClient.value.id}/`, selectedClient.value, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    alert('Cliente actualizado con éxito');
    isModalOpen.value = false;
    getClientsMethod();
  })
  .catch(error => {
    console.error('Error actualizando cliente:', error);
    alert('Error al actualizar el cliente');
  });
};

const goDetail = (id) => {
  router.push(`/${id}`);
};

const deleteClient = (id) => {
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    axios.delete(`${api_url}/cliente/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      alert('Cliente eliminado con éxito');
      getClientsMethod();
    })
    .catch(error => {
      console.error('Error eliminando cliente:', error);
      alert('Error al eliminar el cliente');
    });
  }
};

onMounted(() => {
  getClientsMethod();
});
</script>
