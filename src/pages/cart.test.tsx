import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./cart";


const mockStore = configureStore([]);
const store = mockStore({
  cart: [
    {
      _id: "1",
      name: "Product 1",
      platform: "Platform 1",
      image: ["image1"],
      price: 10,
      quantity: 1,
    },
    {
      _id: "2",
      name: "Product 2",
      platform: "Platform 2",
      image: ["image2"],
      price: 20,
      quantity: 2,
    },
  ],
});

describe("Cart", () => {
    it("renders the correct number of items", () => {
      const { getAllByTestId } = render(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
      const items = getAllByTestId("cart-item");
      expect(items.length).toBe(2);
    });
  
    it("displays the correct total price", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
      const totalPrice = getByTestId("total-price");
      expect(totalPrice.textContent).toBe("$50");
    });
  });