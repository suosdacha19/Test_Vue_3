export interface Vendedor {
  id: number
  name: string
  identification: string
  observations: string
  status: string
}

export interface Fotos {
  id: number
  width: number
  height: number
  url: string
  alt: string | null
  avg_color: string | null
  photographer: string
  photographer_url: string
  photographer_id: string
  liked: boolean
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  vendedor: Vendedor
}

export interface TablaPuntos {
  name: string
  puntos: number
}

export interface FacturaVenta {
  id: string
  date: string
  dueDate: string
  datetime: string
  observations: string | null
  anotation: string
  termsConditions: string
  status: string
  client: {
    id: string
    name: string
    identification: string
    phonePrimary: string | null
    phoneSecondary: string | null
    fax: string | null
    mobile: string
    email: string | null
    address: {
      address: string | null
      department: string | null
      city: string | null
    }
    kindOfPerson: string
    regime: string
    identificationObject: {
      type: string | null
      number: string
    }
  }
  numberTemplate: {
    id: string
    prefix: string | null
    number: string
    text: string | null
    documentType: string
    fullNumber: string
    formattedNumber: string
  }
  subtotal: number
  discount: number
  tax: number
  total: number
  totalPaid: number
  balance: number
  decimalPrecision: string
  warehouse: {
    id: string
    name: string
  }
  term: string
  barCodeContent: string
  seller: {
    id: number
    name: string
    identification: string
    observations: string | null
  }
  priceList: {
    id: number
    name: string
  }
  items: {
    id: number
    name: string
    description: string | null
    price: number
    discount: number
    reference: string | null
    quantity: number
    productKey: string | null
    unit: string | null
    tax: any[] // Assuming tax can be an array of objects or other structures
    total: number
  }[]
  costCenter: string | null
  printingTemplate: {
    id: string
    name: string
    pageSize: string
  }
  isFirstInvoiceCreated: boolean
}
