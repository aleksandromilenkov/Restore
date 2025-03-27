import { CartItem } from "./cartItem"

export type Cart = {
    id: string,
    items: CartItem[],
    clientSecret?: string,
    paymentIntentId?: string,
    coupon?: Coupon
}

export type Coupon = {
    couponId: number,
    name: string,
    amountOff?: number,
    percentOff?:number,
    promotionCode: number
}
