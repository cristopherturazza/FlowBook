import { createContext, useReducer, useEffect, PropsWithChildren } from "react";

const user: User | null = {
  email: "",
  token: "",
  id: "",
};
export const AuthContext = createContext<{
  userData: User;
  dispatch: React.Dispatch<ActionType>;
}>({ userData: user, dispatch: () => {} });

type User = {
  email: String;
  token: String;
  id: String;
} | null;

type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload?: User;
};

export const authReducer = (state: User, action: ActionType): User => {
  switch (action.type) {
    case "LOGIN":
      return action.payload ?? null;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [userData, dispatch] = useReducer(authReducer, user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
