import axios from 'axios'
import { useVendedorStore } from '../stores/Vendedor'
import { type FacturaVenta } from '../interfaces/main'

export default class PexelsService {
  private storeVendedor = useVendedorStore()
  private token: string

  constructor() {
    this.token = btoa(`${import.meta.env.VITE_USERNAME_ALEGRA}:${import.meta.env.VITE_KEY_ALEGRA}`)
  }

  async getSellers(): Promise<void> {
    try {
      axios
        .get('https://api.alegra.com/api/v1/sellers', {
          headers: {
            Authorization: `Basic ${this.token}`
          },
          params: {
            status: 'active'
          }
        })
        .then(({ data }) => {
          this.storeVendedor.setVendedores(data)
        })
        .catch((error) => {
          console.error('Error en la búsqueda de vendedores:', error)
        })
    } catch (error) {
      console.error('Error en la búsqueda de vendedores:', error)
    }
  }

  async postInvoice(factura: any): Promise<FacturaVenta | void> {
    try {
      return axios
        .post('https://api.alegra.com/api/v1/invoices', factura, {
          headers: {
            Authorization: `Basic ${this.token}`
          }
        })
        .then(({ data }) => {
          console.log('Factura creada:', data)
          return data
        })
        .catch((error) => {
          console.log('Error en la creación de la factura:', error)
          return factura
        })
    } catch (error) {
      console.error('Error en la creación de la factura:', error)
    }
  }
}
