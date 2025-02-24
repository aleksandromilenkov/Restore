import { CartItem } from "./cartItem"
import { Product } from "./product"

export type CreateCartItem = {
    product: Product | CartItem,
    quantity: number
}