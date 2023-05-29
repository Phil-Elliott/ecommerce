import { useRemoveFromWishList } from "./useRemoveFromWishList";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
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

describe("useRemoveFromWishList", () => {
  it("removes the game from the wishlist in redux state and localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const spy = jest.spyOn(window.localStorage.__proto__, "setItem");
    spy.mockImplementation(() => {});

    const { result } = renderHook(() => useRemoveFromWishList(), {
      wrapper,
    });

    act(() => {
      result.current(mockGame.id);
    });

    // Check if the game was removed from the wishlist in the redux state
    const { wishList } = store.getState();
    expect(wishList).toEqual([]);

    // Check if localStorage was called with correct arguments
    expect(spy).toHaveBeenCalledWith("wishList", JSON.stringify([]));
  });
});
