import { CommonListing } from "@/components";
import { productByCategory } from "@/services/product";

const MenAllProducts = async () => {
  const getMenProducts = await productByCategory("men");

  return <CommonListing data={getMenProducts && getMenProducts.data} />;
};

export default MenAllProducts;
