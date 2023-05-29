import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAddToCart } from "./useAddToCart";
import store from "../redux/store";
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

describe("useAddToCart", () => {
  // Mock localStorage
  const spy = jest.spyOn(Storage.prototype, "setItem");

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds the game to the cart in redux state and localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAddToCart(), { wrapper });

    act(() => {
      result.current(mockGame);
    });

    // Check if the game was added to the cart in the redux state
    const { cart } = store.getState();
    const expectedGame = { ...mockGame, quantity: 1 }; // add quantity property
    expect(cart[0]).toEqual(expectedGame);

    // Check if localStorage was called with correct arguments
    expect(spy).toHaveBeenCalledWith("cart", JSON.stringify([expectedGame]));
  });
});
