import { FormData } from "@/interface/types";

export const registerUser = async (formData: FormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
