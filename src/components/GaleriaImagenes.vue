<script setup lang="ts">
import { ref } from 'vue'
import { type Fotos, type FacturaVenta } from '../interfaces/main'
import { useImagenStore } from '../stores/Imagen'
import { useVendedorStore } from '../stores/Vendedor'
import AlegraService from '../services/AlegraService.service'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const _VendedorStore = useVendedorStore()
const _ImagenStore = useImagenStore()
const _AlegraService = new AlegraService()
const factura = ref({})
const isLoading = ref(false)

const rate = async (foto: Fotos) => {
  _VendedorStore.removePuntos(_ImagenStore.imagenSeleccionada)
  const validarGanador = _VendedorStore.addPuntos(foto)
  _ImagenStore.imagenSeleccionada = foto
  if (Number(validarGanador) >= 20) {
    isLoading.value = true
    factura.value = {
      dueDate: dayjs().format('YYYY-MM-DD'),
      date: dayjs().format('YYYY-MM-DD'),
      client: 1,
      items: [
        {
          id: 1,
          quantity: validarGanador,
          price: 200
        }
      ],
      seller: foto.vendedor.id,
      anotation: 'Factura generada por el ganador de la carrera de likes.'
    }
    _AlegraService.postInvoice(factura.value).then(async (factura: FacturaVenta | void) => {
      if (factura) {
        isLoading.value = false
        await Swal.fire({
          icon: 'success',
          html: `
            <span>¡Felicidades! El vendedor <strong>${factura.seller.name}</strong> ha ganado la carrera.</span>
            <div class="flex flex-col items-center mt-5">
              <div class="flex justify-between w-3/4">
                <span># Factura:</span>
                <span>${factura.id}</span>	
              </div>
              <div class="flex justify-between w-3/4">
                <span>Fecha:</span>
                <span>${dayjs(factura.date).format('DD/MM/YYYY')}</span>	
              </div>
              <div class="flex justify-between w-3/4">
                <span>Fecha de vencimiento:</span>
                <span>${dayjs(factura.dueDate).format('DD/MM/YYYY')}</span>	
              </div>
              <table class="w-full mt-5" id="tabla-factura">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fotos</td>
                    <td>${factura.items[0].quantity}</td>
                    <td>$${factura.items[0].price}</td>
                    <td>$${factura.items[0].quantity * factura.items[0].price}</td>
                  </tr>
                </tbody>
              </table>
              <div class="flex justify-between w-3/4 mt-5">
                <span>Total:</span>
                <span>$${factura.total}</span>	
              </div>
              <span></span>
            </div>
          `,
          confirmButtonText: 'Ok'
        })
      }
    })
  }
}
</script>
<template>
  <loading v-model:active="isLoading" :is-full-page="true" />
  <div
    v-for="imagen in _ImagenStore.imagenes"
    :key="imagen.id"
    :class="`w-auto relative`"
    id="imagen"
  >
    <img alt="Imagen" :src="imagen.src.medium" />
    <div
      id="like"
      :class="`absolute bg-white/80 top-0 bottom-0 w-full ${_ImagenStore.imagenSeleccionada.id === imagen.id ? 'h-full' : 'h-0'} overflow-hidden`"
      @click="rate(imagen)"
    >
      <svg
        v-if="_ImagenStore.imagenSeleccionada.id === imagen.id"
        class="absolute text-center hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        width="5rem"
        height="5rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="#ff0000"
          d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
        />
      </svg>
      <svg
        v-else
        class="absolute text-center hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        width="5rem"
        height="5rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="black"
          d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
        />
      </svg>
    </div>
  </div>
</template>
