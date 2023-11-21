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
import {
  ComponentLevelLoader,
  Product,
  User,
  Address,
} from "@/interface/types";
import {
  initialAddressFormData,
  initialCheckoutFormData,
  protectedAdminRoutes,
  protectedRoutes,
} from "@/constants";
import { usePathname, useRouter } from "next/navigation";

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
  addresses: Address[];
  setAddresses: Dispatch<SetStateAction<Address[]>>;
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
  addresses: [],
  setAddresses: () => {},
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
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState(
    initialAddressFormData
  );
  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );
  const [componentLevelLoader, setComponentLevelLoader] =
    useState<ComponentLevelLoader>({
      loading: false,
      id: "",
    });

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (Cookies.get("token") !== undefined && storedUserData !== null) {
      setIsAuthUser(true);
      const userData = JSON.parse(storedUserData) || {};
      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setUser(userData);
      setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);

  useEffect(() => {
    if (
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName)
    )
      router.push("/login");
  }, [user, pathName]);
  
  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);

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
        checkoutFormData,
        setCheckoutFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
