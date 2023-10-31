"use client";
import { CommonCart, Notification } from "@/components";
import { useGlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useGlobalContext();
  console.log(pageLevelLoader);

  const extractAllCartItems = async () => {
    setPageLevelLoader(true);
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      setCartItems(res.data);
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  const handleDeleteCartItem = async (getCartItemID: any) => {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  };

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <CommonCart
      cartItems={cartItems}
      handleDeleteCartItem={handleDeleteCartItem}
      componentLevelLoader={componentLevelLoader}
    />
  );
};

export default Cart;
