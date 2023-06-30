import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRemoveFromCart } from "utils/useRemoveFromCart/useRemoveFromCart";
import { useAddToWishList } from "utils/useAddToWishList/useAddToWishList";
import { useChangeCartQuantity } from "utils/useeChangeCartQuantity/useeChangeCartQuantity";
import CartSummary from "components/Cart/CartSummary";
import CartItem from "components/Cart/CartItem";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto xl:grid grid-cols-3 gap-5 items-start min-h-screen pb-10 pt-28 ">
        <div className="bg-white w-full col-span-2 rounded">
          <h1 className="text-3xl mb-0 p-4">Your Shopping Cart</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 items-center w-full p-4 border-b-2 border-gray-200">
            <p className="col-span-2">Item</p>
            <p className="hidden lg:block">Price</p>
            <p className="hidden sm:block">Quantity</p>
            <p className="hidden sm:block">Total</p>
          </div>
          <div>
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartItem key={product._id} product={product} />
              ))
            ) : (
              <p className="p-20 text-center">Your cart is empty</p>
            )}
          </div>
        </div>
        <CartSummary cart={cart} />
      </div>
    </div>
  );
};

export default Cart;
