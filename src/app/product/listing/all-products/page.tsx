import { CommonListing } from "@/components";
import { getAllAdminProducts } from "@/services/product";

const AllProducts = async () => {
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
};

export default AllProducts;
