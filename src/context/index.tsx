"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { ComponentLevelLoader, User } from "@/interface/types";

interface GlobalContextInterface {
  showNavModal: boolean;
  setShowNavModal: Dispatch<SetStateAction<boolean>>;
  isAuthUser: boolean;
  setIsAuthUser: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<null>>;
  pageLevelLoader: boolean;
  setPageLevelLoader: Dispatch<SetStateAction<boolean>>;
  componentLevelLoader: ComponentLevelLoader;
  setComponentLevelLoader: Dispatch<SetStateAction<ComponentLevelLoader>>;
  currentUpdatedProduct: null;
  setCurrentUpdatedProduct: Dispatch<SetStateAction<null>>;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  showNavModal: false,
  setShowNavModal: () => {},
  isAuthUser: false,
  setIsAuthUser: () => {},
  user: null,
  setUser: () => {},
  pageLevelLoader: false,
  setPageLevelLoader: () => {},
  componentLevelLoader: { loading: false, id: "" },
  setComponentLevelLoader: () => {},
  currentUpdatedProduct: null,
  setCurrentUpdatedProduct: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider."
    );
  }
  return context;
};

export default function GlobalState({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (Cookies.get("token") !== undefined && storedUserData !== null) {
      const userData = JSON.parse(storedUserData) || {};
      setIsAuthUser(true);
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
