import SearchField from "../../../SearchField/SearchField";
import AddProductsSearchList from "../../../AddProductsSearchList/AddProductsSearchList";
import { useFilterProductContext } from "../../../../GlobalContext/FilterContext";
import Table from "../../../Table/Table";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../../../Pages/Shared/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../../../GlobalContext/ProductContext";
import { usePurchaseCartContext } from "../../../../GlobalContext/PurchaseCartContext";

const AddProductsContent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refetchProducts } = useProductContext();
  const { handleInputChange, searchInput } = useFilterProductContext();
  const { purchaseCarts, handleRemoveFromPurchase } = usePurchaseCartContext();
  const [discountValue, setDiscountValue] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const subTotal =
    purchaseCarts?.length > 0
      ? purchaseCarts
          .reduce(
            (sum, item) =>
              item?.product_purchase_price_per_unit * item?.product_quantity +
              sum,
            0
          )
          .toFixed(2)
      : 0;

  const onDiscountInputChange = (event) => {
    setDiscountValue(event.target.value);
  };

  const handleDiscount = (discountAmount) => {
    setDiscountedAmount(discountAmount);
  };

  const postPurchaseInvoice = (
    invoice,
    totalDiscount,
    afterDiscountPrice,
    beforeDiscountPrice
  ) => {
    const invoiceData = [
      {
        invoice,
        totalDiscount: parseFloat(totalDiscount),
        afterDiscountPrice: parseFloat(afterDiscountPrice),
        beforeDiscountPrice: parseFloat(beforeDiscountPrice),
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text: "You want to post this invoice?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .patch(
            `${import.meta.env.VITE_API_URL}/api/increase/products/stock`,
            invoice
          )
          .then((response) => {
            if (response) {
              //
              axios
                .post(
                  `${import.meta.env.VITE_API_URL}/api/add/purchaseInvoice`,
                  invoiceData
                )
                .then((response) => {
                  if (response.data.insertedId) {
                    Swal.fire({
                      icon: "success",
                      title: "Posted",
                      text: `Your invoice has been posted for future use note this id "${response.data.insertedId}"`,
                    });
                    setLoading(false);
                    refetchProducts();
                    navigate(`/store/addProducts/${response.data.insertedId}`);
                  }
                })
                .catch((error) => {
                  if (error) {
                    toast.error("Something went wrong.");
                    setLoading(false);
                  }
                });
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Error updating stock");
              setLoading(false);
            } else {
              toast.error("An unexpected error occurred");
              setLoading(false);
            }
          });
      }
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="lg:max-w-5xl bg-gray-100 shadow-2xl h-screen lg:h-full mx-auto">
      <SearchField
        handleInputChange={handleInputChange}
        searchInput={searchInput}
      />
      <AddProductsSearchList />
      <div>
        <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
          <tr className="bg-blue-300 w-full">
            <th className="hidden md:block text-center p-[8px] border border-white">
              No.
            </th>
            <th className="text-center p-[8px] border border-white w-[60%]">
              Name
            </th>
            <th className=" border border-white w-[15%]"></th>
            <th className="text-center p-[8px] border border-white w-[10%]">
              Price
            </th>
            <th className="text-center p-[8px] border border-white w-[5%]"></th>
          </tr>
          {purchaseCarts?.map((item, index) => (
            <Table
              key={index}
              serial={index + 1}
              title={item.product_name}
              quantity={item.product_quantity}
              price_per_unit={item.product_purchase_price_per_unit}
              total_price={(
                parseFloat(item.product_quantity) *
                parseFloat(item.product_purchase_price_per_unit)
              ).toFixed(2)}
              buttonClick={() => handleRemoveFromPurchase(item)}
            />
          ))}
        </table>
      </div>
      <div className="my-2">
        <div className="border-t border-gray-400 text-end">
          <div className="max-w-sm ml-auto bg-slate-200 shadow-xl px-4 py-4 space-y-3 ">
            <div className="">
              <p className="flex justify-between">
                <span className="text-start">Total Price:</span>
                <span className="text-end">{subTotal}</span>
              </p>
            </div>
            <p className="border-b border-gray-400"></p>
            <div className="">
              <p className="flex justify-between">
                <span className="text-start">
                  Discount:{" "}
                  <input
                    type="number"
                    placeholder="amount"
                    className="w-[70px] px-2"
                    value={discountValue}
                    onChange={onDiscountInputChange}
                  />
                  <button
                    onClick={() => handleDiscount(discountValue)}
                    className="bg-gray-700 text-white px-2"
                  >
                    Give
                  </button>
                </span>
                <span className="text-end">{discountedAmount}</span>
              </p>
            </div>
            <p className="border-b border-gray-400"></p>
            <div className="">
              <p className="flex justify-between font-bold">
                <span className="text-start">Grand Total:</span>
                <span className="text-end">{subTotal - discountedAmount}</span>
              </p>
            </div>
            <p className="border-b-2 border-black"></p>
            <div className="text-end">
              <button
                disabled={purchaseCarts == 0}
                onClick={() =>
                  postPurchaseInvoice(
                    purchaseCarts,
                    discountedAmount,
                    subTotal - discountedAmount,
                    subTotal
                  )
                }
                className="bg-blue-600 px-4 py-1 text-white hover:bg-gray-900 duration-500 rounded-md"
              >
                Post Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsContent;
