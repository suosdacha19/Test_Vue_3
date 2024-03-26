import { createClient } from 'pexels'
import { type PhotosWithTotalResults } from 'pexels'
import { useImagenStore } from '@/stores/Imagen'
import { useVendedorStore } from '@/stores/Vendedor'

export default class PexelsService {
  private client
  private storeImagen
  private storeVendedor

  constructor() {
    this.client = createClient(import.meta.env.VITE_PEXELS_API_KEY)
    this.storeImagen = useImagenStore()
    this.storeVendedor = useVendedorStore()
  }

  async search(query: string): Promise<void> {
    try {
      const response = await this.client.photos.search({
        query,
        per_page: this.storeVendedor.vendedores.length
      })

      if ('photos' in response) {
        this.storeImagen.setImagenes([response] as PhotosWithTotalResults[])
      } else {
        console.error('Error en la búsqueda de imágenes:', response)
      }
    } catch (error) {
      console.error('Error en la búsqueda de imágenes:', error)
    }
  }
}
