import { useAddToWishList } from "../utils/useAddToWishList";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { GameProps } from "components/shared/Types/Types";

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

describe("useAddToWishList", () => {
  it("adds the game to the wishlist in redux state and localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const spy = jest.spyOn(window.localStorage.__proto__, "setItem");
    spy.mockImplementation(() => {});

    const { result } = renderHook(() => useAddToWishList(), {
      wrapper,
    });

    act(() => {
      result.current(mockGame);
    });

    // Check if the game was added to the wishlist in the redux state
    const { wishList } = store.getState();
    expect(wishList[0]).toEqual(mockGame);

    // Check if localStorage was called with correct arguments
    expect(spy).toHaveBeenCalledWith("wishList", JSON.stringify([mockGame]));
  });
});
