import { CommonListing } from "@/components";
import { productByCategory } from "@/services/product";

const WomenAllProducts = async () => {
  const getWomenProducts = await productByCategory("women");

  return <CommonListing data={getWomenProducts && getWomenProducts.data} />;
};

export default WomenAllProducts;
