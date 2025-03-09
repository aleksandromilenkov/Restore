import { useClearCartMutation, useFetchCartQuery } from "../../features/cart/cartApi";

export const useCart = () => {
      const { data: cart, isLoading: isLoadingCart } = useFetchCartQuery();
      const [clearCart] = useClearCartMutation();
      const subtotal = cart?.items?.reduce((acc, val) => acc + val.price * val.quantity, 0) ?? 0;
      const deliveryFee = subtotal / 100 > 100 ? 0 : 500;
      const total = subtotal + deliveryFee;
      return {cart, isLoadingCart, subtotal, deliveryFee, total, clearCart};
}