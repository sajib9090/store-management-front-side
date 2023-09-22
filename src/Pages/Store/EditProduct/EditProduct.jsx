import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../GlobalContext/ProductContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import SimpleLoader from "../../../Components/SimpleLoader/SimpleLoader";
import { AuthContext } from "../../../GlobalContext/AuthProvider";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { products } = useProductContext();
  const [foundedItem, setFoundedItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { refetchProducts } = useProductContext();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    setLoading(true);
    e.preventDefault();
    const purchase_price = parseFloat(e.target.purchasePrice.value);
    const sell_price = parseFloat(e.target.sellPrice.value);
    const available_stock = parseInt(e.target.availableStock.value);
    const editedDate = new Date();
    const productData = {
      product_purchase_price: purchase_price,
      stock: available_stock,
      price: sell_price,
      last_edited_date: editedDate,
      last_editor_email: user?.email,
    };

    if (purchase_price < 0 || sell_price < 0 || available_stock < 0) {
      toast.error("Value cannot be negative");
      return;
    } else {
      axios
        .patch(
          `${import.meta.env.VITE_API_URL}/api/update/product/${id}`,
          productData
        )
        .then((res) => {
          if (res.status) {
            toast.success("Updated Successfully");
            refetchProducts();
            setLoading(false);
            navigate("/store/stock/find_stock_by_company");
          }
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 404") {
            toast.error("Something went wrong");
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    const matchedProduct = products.find((item) => item._id == id);
    setFoundedItem(matchedProduct);
  }, [id, products]);
  return (
    <div>
      <div className="max-w-xl shadow-2xl min-h-screen mx-auto flex flex-col justify-center items-center">
        <form onSubmit={handleEdit} className="space-y-4">
          <p className="text-xl">
            Name: <span className="ml-2 capitalize">{foundedItem?.title}</span>
          </p>
          <p className="text-xl">
            Group:{" "}
            <span className="ml-2 capitalize">{foundedItem?.generic_name}</span>
          </p>
          <p className="text-xl">
            Company:
            <span className="capitalize ml-2">{foundedItem?.company_name}</span>
          </p>
          <div className="flex flex-col">
            <label>Purchase Price: (Editable)</label>
            <input
              className="px-4 py-2 w-[100%] text-lg my-2 border-2 border-gray-400 rounded"
              type="number"
              name="purchasePrice"
              defaultValue={foundedItem?.product_purchase_price}
            />
          </div>

          <div className="flex flex-col">
            <label>Sell Price: (Editable)</label>
            <input
              className="px-4 py-2 w-[100%] text-lg my-2 border-2 border-gray-400 rounded"
              type="number"
              name="sellPrice"
              defaultValue={foundedItem?.price}
            />
          </div>
          <div className="flex flex-col">
            <label>Available Stock: (Editable)</label>
            <input
              className="px-4 py-2 w-[100%] text-lg my-2 border-2 border-gray-400 rounded"
              type="number"
              name="availableStock"
              defaultValue={foundedItem?.stock}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 rounded text-white w-[300px] h-[50px] font-medium text-lg"
            >
              {loading ? <SimpleLoader /> : "Edit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
