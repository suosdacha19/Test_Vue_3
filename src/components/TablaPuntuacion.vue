<script setup lang="ts">
import { useVendedorStore } from '../stores/Vendedor'
const _VendedorStore = useVendedorStore()
</script>

<template>
  <h1 class="text-center font-semibold text-lg">Puntuación:</h1>
  <span class="text-center text-sm text-gray-400">(Gana el vendedor con 20pts.)</span>
  <div class="flex w-full justify-between">
    <span>Nombre</span>
    <span>Puntos</span>
  </div>
  <div
    class="flex w-full justify-between"
    v-for="(punto, index) in _VendedorStore.puntos"
    :key="punto.name"
  >
    <span>{{ index + 1 }}. {{ punto.name }}:</span>
    <span>{{ punto.puntos }}</span>
  </div>
</template>
