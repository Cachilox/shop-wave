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
import { ComponentLevelLoader, Product, User } from "@/interface/types";

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
  showCartModal: boolean;
  setShowCartModal: Dispatch<SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  showNavModal: false,
  setShowNavModal: () => {},
  isAuthUser: false,
  setIsAuthUser: () => {},
  user: null,
  setUser: () => {},
  pageLevelLoader: true,
  setPageLevelLoader: () => {},
  componentLevelLoader: { loading: false, id: "" },
  setComponentLevelLoader: () => {},
  currentUpdatedProduct: null,
  setCurrentUpdatedProduct: () => {},
  showCartModal: false,
  setShowCartModal: () => {},
  cartItems: [],
  setCartItems: () => {},
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
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] =
    useState<ComponentLevelLoader>({
      loading: false,
      id: "",
    });
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });

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
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
