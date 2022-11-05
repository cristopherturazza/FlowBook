import { createContext, useReducer, useEffect, PropsWithChildren } from "react";

const user: User | null = {
  email: "",
  token: "",
};
export const AuthContext = createContext<{
  state: User;
  dispatch: React.Dispatch<ActionType>;
}>({ state: user, dispatch: () => {} });

type User = {
  email: String;
  token: String;
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
  const [state, dispatch] = useReducer(authReducer, user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
