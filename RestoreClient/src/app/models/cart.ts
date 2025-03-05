import { CartItem } from "./cartItem"

export type Cart = {
    id: string,
    items: CartItem[],
    clientSecret?: string,
    paymentIntentId?: string
}