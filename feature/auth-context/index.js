import { onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { getItem } from "../firebase/firebaseAuth";

const AuthContext = createContext({
  userInfo: null,
  loggedIn: false,
  signOut: () => {},
  quantityCart: null,
  increment: null,
  decrement: null,
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const increment = (value) => {
    setQuantity(value + 1);
  };

  const decrement = (value) => {
    setQuantity(value - 1);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let total = 0;
        setUser(user);
        const res = await getItem("cart", user.uid);
        if (res !== null) {
          for (const key in res.arrayCart) {
            total += res.arrayCart[key].quantity;
          }
          setQuantity(total);
        } else {
          setQuantity(0);
        }
      } else {
        setUser(null);
        setQuantity(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // const context = {
  //   userInfo: user,
  //   signOut: signOut(),
  // };

  const isLoggedIn = user?.uid != null;

  return (
    <AuthContext.Provider
      value={{
        increment,
        decrement,
        quantityCart: quantity,
        userInfo: user,
        loggedIn: isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
