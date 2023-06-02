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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me",
          { withCredentials: true }
        );

        if (response.data.status === "success") {
          dispatch(setUser(response.data.data.user));
          // get server stuff
          dispatch(fetchCart());
        }
      } catch (err) {
        const cartFromLocalStorage: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        setCartFromLocalStorage(cartFromLocalStorage);
      }
    };

    if (!user.email) {
      console.log("User not logged in");
      fetchUser();
    } else {
      console.log("User already logged in");
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

/*

// function SyncLocalStorageWithStore() {
//   const [isClient, setClient] = useState(false);
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     setClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       const cartFromLocalStorage = JSON.parse(
//         localStorage.getItem("cart") || "[]"
//       );
//       const wishlistFromLocalStorage = JSON.parse(
//         localStorage.getItem("wishList") || "[]"
//       );

//       cartFromLocalStorage.forEach((item: GameProps) =>
//         dispatch(addToCart(item))
//       );
//       wishlistFromLocalStorage.forEach((item: GameProps) =>
//         dispatch(addToList(item))
//       );
//     }
//   }, [dispatch, isClient]);

//   return null;
// }

*/
