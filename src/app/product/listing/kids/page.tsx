import { CommonListing } from "@/components";
import { productByCategory } from "@/services/product";

const KidsAllProducts = async () => {
  const getKidsProducts = await productByCategory("kids");

  return <CommonListing data={getKidsProducts && getKidsProducts.data} />;
};

export default KidsAllProducts;
