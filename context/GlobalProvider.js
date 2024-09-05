import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

// createContext: Creates a new context, GlobalContext, which will hold the global state for the user's authentication status and information.
// useContext: Allows components to consume the context created by GlobalContext.
// useEffect, useState: React hooks used for managing side effects and state within the component.
// getCurrentUser: A function imported from an external module that likely interacts with Appwrite's API to fetch the current logged-in user.

// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalContext: The context object created by createContext().
// useGlobalContext: A custom hook that makes it easier for other components to access the context by simply calling useGlobalContext().
//
export default function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // GlobalProvider: A context provider component that wraps around the parts of the app where you want the global state to be accessible.
  // isLoggedIn: A state that tracks whether a user is logged in (true or false).
  // user: A state that stores the current user’s details if they are logged in.
  // IsLoading: A state that indicates whether the app is currently checking the user's login status.

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //   useEffect: Runs when the component mounts, triggering a check for the current user's status.
  // getCurrentUser(): Called to fetch the current logged-in user.
  // then block:
  // If getCurrentUser() returns a result (res), it means the user is logged in. The state isLoggedIn is set to true, and user is updated with the user’s information.
  // If res is falsy, it means no user is logged in. The state isLoggedIn is set to false, and user is reset to null.
  // catch block: Logs any errors that occur during the fetch process.
  // finally block: Ensures that the IsLoading state is set to false, signaling that the check is complete.

  return (
    <GlobalContext.Provider
      value={{
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        isLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
