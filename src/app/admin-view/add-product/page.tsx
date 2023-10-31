"use client";
import { useEffect, useState } from "react";
import {
  InputComponent,
  Loader,
  Notification,
  SelectComponent,
  TileComponent,
} from "@/components";
import { adminAddProductformControls, AvailableSizes } from "@/constants";
import { Product, Size } from "@/interface/types";
import { addNewProduct, updateAProduct } from "@/services/product";
import { useGlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { helperForUploadingImageToFirebase } from "@/firebase";

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AdminAddNewProduct = () => {
  const [formData, setFormData] = useState<Product>(initialFormData);
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const extractImageUrl = await helperForUploadingImageToFirebase(
        event.target.files[0]
      );
      if (extractImageUrl !== "") {
        setFormData({
          ...formData,
          imageUrl: extractImageUrl,
        });
      }
      console.log(extractImageUrl);
    }
  };

  function handleTileClick(getCurrentItem: Size) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex(
      (item: Size) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item: Size) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  const handleAddProduct = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);
    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1300);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  };

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              data={AvailableSizes}
              selected={formData.sizes}
              onClick={handleTileClick}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
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
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                key={controlItem.id}
                label={controlItem.label}
                options={controlItem.options}
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
            onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <Loader
                text={
                  currentUpdatedProduct !== null
                    ? "Updating Product"
                    : "Adding Product"
                }
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
