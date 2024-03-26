<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PexelsService from './services/PexelsService.service'
import AlegraService from './services/AlegraService.service'
import { useImagenStore } from '@/stores/Imagen'
import { useVendedorStore } from './stores/Vendedor'
import { type Fotos } from '@/interfaces/main'
import TablaPuntuacion from './components/TablaPuntuacion.vue'
import GaleriaImagenes from './components/GaleriaImagenes.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const valorBuscado = ref('')
const isLoading = ref(false)

const _PexelsService = new PexelsService()
const _AlegraService = new AlegraService()

const _ImagenStore = useImagenStore()
const _VendedorStore = useVendedorStore()

const search = async () => {
  isLoading.value = true
  _ImagenStore.imagenSeleccionada = {} as Fotos
  await _PexelsService.search(valorBuscado.value)
  isLoading.value = false
}

onMounted(() => {
  _AlegraService.getSellers()
})
</script>

<template>
  <loading v-model:active="isLoading" :is-full-page="true" />
  <div class="flex flex-col justify-center items-center h-3/4 gap-4">
    <img alt="Logo Empresa" src="./assets/logo.png" class="min-h-80 max-h-80 w-auto" />
    <div class="relative w-2/4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        class="absolute top-1/2 left-3 transform -translate-y-1/2"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M11.5 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2.5"
          />
          <path
            d="M14.757 11.815a3 3 0 1 0-3.431 4.109M15 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0m5.2 2.2L22 22"
          />
        </g>
      </svg>
      <input
        type="text"
        class="border-2 border-gray-300 p-2 pl-12 rounded-md w-full"
        placeholder="Buscar"
        v-model="valorBuscado"
        @keyup.enter="search()"
      />
    </div>
    <!-- Imagenes -->
    <div :class="'flex flex-col md:flex-row w-full gap-6'">
      <section
        v-if="_ImagenStore.imagenes.length"
        :class="`flex flex-wrap gap-6 justify-center ${_VendedorStore.puntos.length ? 'w-full md:w-5/6 ' : 'w-full'}`"
      >
        <GaleriaImagenes />
      </section>
      <section
        class="flex w-full md:w-1/6 bg-[#021e33] h-fit flex-col text-white rounded-lg p-4"
        v-if="_VendedorStore.puntos.length && _ImagenStore.imagenes.length"
      >
        <TablaPuntuacion />
      </section>
    </div>
  </div>
</template>
