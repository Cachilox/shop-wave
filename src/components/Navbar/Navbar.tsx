"use client";
import { Fragment, useEffect } from "react";
import { useGlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import NavbarButton from "../UI/NavbarButton";
import NavItems from "./NavItems";
import CommonModal from "./CommonModal";
import { CartModal } from "..";

const Navbar = () => {
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    showNavModal,
    setShowNavModal,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useGlobalContext();

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if(pathName !== "/admin-view/add-product" && currentUpdatedProduct !== null) setCurrentUpdatedProduct(null)
  }, [pathName])
  

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span
              onClick={() => router.push("/")}
              className="self-center text-2xl font-semibold whitespace-nowrap"
            >
              Shop wave
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <NavbarButton onClick={() => router.push("/account")}>Account</NavbarButton>
                <NavbarButton onClick={() => setShowCartModal(true)}>Cart</NavbarButton>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <NavbarButton onClick={() => router.push("/")}>
                  Client View
                </NavbarButton>
              ) : (
                <NavbarButton onClick={() => router.push("/admin-view")}>
                  Admin Wiew
                </NavbarButton>
              )
            ) : null}
            {isAuthUser ? (
              <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
            ) : (
              <NavbarButton onClick={() => router.push("/login")}>
                Login
              </NavbarButton>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} router={router} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            isModalWiew={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
