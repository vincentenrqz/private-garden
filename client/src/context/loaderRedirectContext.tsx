import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useFetchData } from "../utils/queries";

interface RedirectContextValue {
  redirect: boolean;
  setRedirect: Dispatch<SetStateAction<boolean>>;
  loaderPage: boolean;
}

const RedirectContext = createContext<RedirectContextValue | undefined>(
  undefined
);

export const useRedirectContext = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error(
      "useRedirectContext must be used within a RedirectProvider"
    );
  }
  return context;
};

export const RedirectProvider = ({ children }: { children: ReactNode }) => {
  const [redirect, setRedirect] = useState(false);
  const { loading } = useFetchData();

  const loaderPage = !redirect || loading;

  return (
    <RedirectContext.Provider value={{ redirect, setRedirect, loaderPage }}>
      {children}
    </RedirectContext.Provider>
  );
};
