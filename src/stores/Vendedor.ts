import { defineStore } from 'pinia'
import { type Vendedor, type TablaPuntos, type Fotos } from '../interfaces/main'

export const useVendedorStore = defineStore('vendedor', {
  state: () => {
    return {
      vendedores: [] as Vendedor[],
      puntos: [] as TablaPuntos[]
    }
  },
  actions: {
    setVendedores(arrayVendedores: Vendedor[]) {
      this.vendedores = arrayVendedores
    },
    addPuntos(foto: Fotos): Number {
      let puntos: Number
      if (this.puntos.findIndex((punto) => punto.name === foto.vendedor.name) !== -1) {
        this.puntos[this.puntos.findIndex((punto) => punto.name === foto.vendedor.name)].puntos += 3
        puntos =
          this.puntos[this.puntos.findIndex((punto) => punto.name === foto.vendedor.name)].puntos
      } else {
        this.puntos.push({
          name: foto.vendedor.name,
          puntos: 3
        })
        puntos = 3
      }
      this.puntos.sort((a, b) => {
        return b.puntos - a.puntos
      })
      return puntos
    },
    removePuntos(foto: Fotos) {
      console.log('addPuntos', foto)
      if (foto.vendedor) {
        this.puntos[this.puntos.findIndex((punto) => punto.name === foto.vendedor.name)].puntos -= 3
        if (
          this.puntos[this.puntos.findIndex((punto) => punto.name === foto.vendedor.name)]
            .puntos === 0
        ) {
          this.puntos.splice(
            this.puntos.findIndex((punto) => punto.name === foto.vendedor.name),
            1
          )
        }
      }
      this.puntos.sort((a, b) => {
        return b.puntos - a.puntos
      })
    }
  }
})
