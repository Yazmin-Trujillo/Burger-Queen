// create interface representing product
export interface Product {
    id: string
    name: string
    description?: string
    price: number
    image?: string
    category?: string
    type?: string 
    createDate: Date
}
