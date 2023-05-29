import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRemoveFromCart } from "./useRemoveFromCart";
import store from "../../redux/store";
import { GameProps } from "components/shared/Types/Types";

// Mock game data for testing
const mockGame: GameProps = {
  id: 1,
  name: "Test Game",
  image: "test-game.jpg",
  price: 50,
  description: "Test game for testing",
  category: "Test",
  publisher: "Test Publisher",
  releaseDate: "2023-05-17",
  rating: 4.5,
  playerCount: 2,
  platform: "PC",
  gameModes: ["Singleplayer", "Multiplayer"],
};

describe("useRemoveFromCart", () => {
  // Mock localStorage
  const spy = jest.spyOn(Storage.prototype, "setItem");

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("removes the game from the cart in redux state and localStorage", () => {
    const wrapper = ({ children }: { children: any }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    // Manually adding the game to cart before trying to remove
    store.dispatch({ type: "cart/addToCart", payload: mockGame });
    localStorage.setItem("cart", JSON.stringify([mockGame]));

    act(() => {
      result.current(mockGame.id);
    });

    // Check if the game was removed from the cart in the redux state
    const { cart } = store.getState();
    expect(cart).toEqual([]);

    // Check if localStorage was called with correct arguments
    expect(spy).toHaveBeenCalledWith("cart", JSON.stringify([]));
  });
});
