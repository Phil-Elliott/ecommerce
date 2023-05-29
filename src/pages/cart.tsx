import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../../redux/slices/cartSlice";
import { addToList } from "redux/slices/wishListSlice";

import { RootState } from "../../redux/store";
import { useRemoveFromCart } from "utils/useRemoveFromCart/useRemoveFromCart";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = useRemoveFromCart();

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen pb-10 pt-32 bg-gray-100">
      <h1 className="text-4xl mb-5">Shopping Cart</h1>
      <div className="w-full flex flex-col items-center pt-10">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center w-full mb-6 p-4 bg-white rounded shadow-lg"
            >
              <img
                className="w-16 h-16"
                src={`/images/${product.image}`}
                alt={product.name}
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">${product.price} each</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  className="border rounded w-20 text-center mr-2"
                  value={product.quantity}
                  onChange={(e) =>
                    dispatch(
                      changeQuantity({
                        id: product.id,
                        quantity: parseInt(e.target.value),
                      })
                    )
                  }
                />
                <BsTrash
                  className="text-xl cursor-pointer text-red-500"
                  onClick={() => removeFromCart(product.id)}
                />
              </div>
              <div className="flex items-center">
                <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                <AiOutlineHeart
                  className="ml-4 text-xl cursor-pointer text-red-500"
                  onClick={() => dispatch(addToList(product))}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

/*

Product List: This is a list or grid display of all the products in the cart. Each item in the list might display the product name, image, price, and quantity.

Quantity Selector: For each item in the cart, you should allow the user to adjust the quantity. This can be a simple input field or a pair of buttons to increase or decrease the quantity.

Remove from Cart Button: You can include a button to remove an item from the cart.

Total Price Calculation: Display the total price of all the items in the cart. Remember to update this whenever an item is added, removed, or when the quantity is changed.

Proceed to Checkout Button: This is a button that allows the user to proceed to the checkout process. This button can be disabled if the cart is empty.

Continue Shopping Button: A button to navigate the user back to the shopping page.


*/
