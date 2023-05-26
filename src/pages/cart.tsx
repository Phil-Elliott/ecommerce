import React from "react";

const cart = () => {
  return (
    <div>
      <h1 className="text-4xl">Cart</h1>
    </div>
  );
};

export default cart;

/*

Product List: This is a list or grid display of all the products in the cart. Each item in the list might display the product name, image, price, and quantity.

Quantity Selector: For each item in the cart, you should allow the user to adjust the quantity. This can be a simple input field or a pair of buttons to increase or decrease the quantity.

Remove from Cart Button: You can include a button to remove an item from the cart.

Total Price Calculation: Display the total price of all the items in the cart. Remember to update this whenever an item is added, removed, or when the quantity is changed.

Proceed to Checkout Button: This is a button that allows the user to proceed to the checkout process. This button can be disabled if the cart is empty.

Continue Shopping Button: A button to navigate the user back to the shopping page.


*/
