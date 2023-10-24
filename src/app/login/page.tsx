"use client";
import { useEffect, useState } from "react";
import { loginFormControls } from "@/constants";
import { useRouter } from "next/navigation";
import { FormData } from "@/interface/types";
import { isFormValidate } from "@/utils/formValidate.utility";
import { loginUser } from "@/services/login";
import { useGlobalContext } from "@/context";
import Cookies from "js-cookie";
import InputComponent from "@/components/FormElements/InputComponent";
import Loader from "@/components/UI/Loader";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useGlobalContext();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleLogin = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const data = await loginUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(data?.finalData?.user);
      setFormData(initialFormData);
      Cookies.set("token", data?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(data?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser, router]);

  return (
    <div className="bg-white relative mt-[58px]">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}

                <button
                  onClick={handleLogin}
                  disabled={!isFormValidate(formData, "login")}
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black mt-[1.7rem] px-6 py-4 text-lg 
              text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <Loader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default LoginPage;
