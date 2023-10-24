import { CommonListing } from "@/components"
import { getAllAdminProducts } from "@/services/product"

const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts()
  
  return <CommonListing data={allAdminProducts && allAdminProducts.data} />
}

export default AdminAllProducts