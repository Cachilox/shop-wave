"use client";
import { useEffect, useState } from "react";
import { FormData } from "@/interface/types";
import { registrationFormControls } from "@/constants";
import { registerUser } from "@/services/register";
import { isFormValidate } from "@/utils/formValidate.utility";
import { useGlobalContext } from "@/context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Notification,
  Loader,
  SelectComponent,
  InputComponent,
} from "@/components";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

const RegisterPage = () => {
  const { isAuthUser, componentLevelLoader, setComponentLevelLoader } =
    useGlobalContext();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const data = await registerUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(initialFormData);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser, router]);

  return (
    <div className="bg-white relative mt-[50px]">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successful!"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 mt-5 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        key={controlItem.id}
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    onClick={handleRegister}
                    disabled={!isFormValidate(formData, "register")}
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black mt-[1.7rem] px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                      <Loader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default RegisterPage;
