import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

interface ProductDetailsProps {
  params: {
    details: string;
  };
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const productDetailsData = await productById(params.details);

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
};

export default ProductDetails;
