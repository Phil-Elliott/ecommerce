import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "redux/slices/userSlice";
import {
  addToCartLocal,
  fetchCart,
  setCartFromLocal,
} from "redux/slices/cartSlice";
import { AppDispatch } from "redux/store";
import { GameProps } from "components/shared/Types/Types";
import {
  fetchWishList,
  setWishListFromLocal,
} from "redux/slices/wishListSlice";

type LayoutProps = {
  children: React.ReactNode;
  signInButton: VoidFunction;
};

type CartItem = GameProps & { quantity: number };

const Layout = ({ children, signInButton }: LayoutProps) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const setCartFromLocalStorage = (cartItems: CartItem[]) => {
    dispatch(setCartFromLocal(cartItems));
  };

  const setWishListFromLocalStorage = (wishListItems: GameProps[]) => {
    dispatch(setWishListFromLocal(wishListItems));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me",
          { withCredentials: true }
        );

        console.log(response.data.data.data);

        if (response.data.status === "success") {
          dispatch(setUser(response.data.data.data));
          // get server stuff
          dispatch(fetchCart());
          dispatch(fetchWishList());
        }
      } catch (err) {
        const cartFromLocalStorage: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        setCartFromLocalStorage(cartFromLocalStorage);

        const wishListFromLocalStorage: GameProps[] = JSON.parse(
          localStorage.getItem("wishList") || "[]"
        );
        setWishListFromLocalStorage(wishListFromLocalStorage);
      }
    };
    if (!user.email) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Header signInButton={signInButton} />
      <main className="" style={{ minHeight: "90vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
