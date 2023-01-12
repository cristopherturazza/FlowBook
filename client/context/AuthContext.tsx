import { createContext, useReducer, useEffect, PropsWithChildren } from "react";

// Initial State
const user: User | null = null;

// Logged in status
let isLoggedIn: Boolean = false;

// Create Authcontext
export const AuthContext = createContext<{
  userData: User;
  dispatch: React.Dispatch<ActionType>;
}>({ userData: user, dispatch: () => {} });

// Reducer Types
type User = {
  email: String;
  token: String;
  id: String;
  location: {
    coordinates: [number, number] | [];
  } | null;
  isLoggedIn: Boolean;
} | null;

type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload?: User;
};

// Auth reducer

export const authReducer = (state: User, action: ActionType): User => {
  switch (action.type) {
    case "LOGIN":
      return {
        email: action.payload?.email ?? "",
        token: action.payload?.token ?? "",
        location: action.payload?.location ?? null,
        id: action.payload?.id ?? "",
        isLoggedIn: true,
      };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

// Context Component
export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [userData, dispatch] = useReducer(authReducer, user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
