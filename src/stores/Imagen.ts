import { defineStore } from 'pinia'
import { type PhotosWithTotalResults } from 'pexels'
import { useVendedorStore } from '@/stores/Vendedor'
import { type Fotos } from '@/interfaces/main'

export const useImagenStore = defineStore('imagen', {
  state: () => {
    return {
      imagenes: [] as Fotos[]
    }
  },
  actions: {
    setImagenes(imagenes: PhotosWithTotalResults[]) {
      this.imagenes = imagenes[0].photos as Fotos[]
      const vendedorStore = useVendedorStore()
      for (const [index, imagen] of Object.entries(this.imagenes)) {
        imagen.vendedor = vendedorStore.vendedores[Number(index)]
      }
    }
  }
})
