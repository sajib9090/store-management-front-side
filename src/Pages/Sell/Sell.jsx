import { useState } from "react";
import SearchProductList from "../../Components/SearchProductList/SearchProductList";
import Table from "../../Components/Table/Table";
import { useCartContext } from "../../GlobalContext/CartContext";
import { useFilterProductContext } from "../../GlobalContext/FilterContext";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const [loading, setLoading] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const navigate = useNavigate();
  const { handleInputChange, searchInput, filteredProducts } =
    useFilterProductContext();
  const { carts, itemRemove } = useCartContext();
  const subTotal =
    carts?.length > 0
      ? carts
          .reduce(
            (sum, item) =>
              item?.product_price_per_unit * item?.product_quantity + sum,
            0
          )
          .toFixed(2)
      : 0;
  // Step 2: Function to handle changes in the input field value
  const onDiscountInputChange = (event) => {
    setDiscountValue(event.target.value);
  };

  const handleDiscount = (discount, total) => {
    let discountedAmount = (parseFloat(total) / 100) * parseFloat(discount);
    setDiscountedAmount(discountedAmount);
  };

  const handleSellingInvoice = (
    soldProducts,
    totalPrice,
    discountedPrice,
    totalDiscount
  ) => {
    // sold product data
    const invoiceData = [
      {
        discountedPrice,
        totalPrice,
        totalDiscount,
        soldProducts,
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sell those items?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sell it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .patch(
            `${import.meta.env.VITE_API_URL}/api/decrease/products/stock`,
            soldProducts
          )
          .then((response) => {
            if (response) {
              axios
                .post(
                  `${import.meta.env.VITE_API_URL}/api/add/soldInvoice`,
                  invoiceData
                )
                .then((response) => {
                  if (response.data.insertedId) {
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: `Your sold invoice has been created for future use note this id "${response.data.insertedId}"`,
                    });
                    setLoading(false);
                    navigate(`/sell/invoice/${response.data.insertedId}`);
                  }
                })
                .catch((error) => {
                  if (error) {
                    toast.error("Something went wrong");
                    setLoading(false);
                  }
                });
            }
          })
          .catch((error) => {
            if (error) {
              toast.error(error.message);
              setLoading(false);
            }
          });
      }
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-white w-full h-full mt-6 lg:mt-0">
      <div className="lg:max-w-5xl bg-gray-100 shadow-2xl h-screen lg:h-full mx-auto">
        <div className="py-6 px-1 md:px-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="py-2 w-full border-2 border-gray-400 rounded-md px-4"
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div>
          <SearchProductList filteredProducts={filteredProducts} />
        </div>
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
            {carts?.map((currEle, index) => (
              <Table
                key={index}
                serial={index + 1}
                title={currEle.product_name}
                price_per_unit={currEle.product_price_per_unit}
                quantity={currEle.product_quantity}
                total_price={(
                  parseFloat(currEle.product_price_per_unit) *
                  parseFloat(currEle.product_quantity)
                ).toFixed(2)}
                buttonClick={() => itemRemove(currEle)}
              />
            ))}
          </table>
          <div className="mt-2">
            <div className="border-t border-gray-400 text-end">
              <div className="max-w-sm ml-auto bg-slate-200 shadow-xl px-4 py-4 space-y-3 ">
                <div className="">
                  <p className="flex justify-between">
                    <span className="text-start">Total Price:</span>
                    <span className="text-end">{subTotal}</span>
                  </p>
                </div>
                <div className="">
                  <p className="flex justify-between">
                    <span className="text-start">
                      Discount:{" "}
                      <span className="mx-2">
                        <span>
                          <input
                            className="w-14 px-2 border-2 border-gray-600"
                            type="number"
                            placeholder="%"
                            value={discountValue}
                            onChange={onDiscountInputChange}
                          />
                          <button
                            onClick={() =>
                              handleDiscount(discountValue, subTotal)
                            }
                            className="bg-gray-700 px-2 text-white border-2 border-gray-700"
                          >
                            give
                          </button>
                        </span>
                      </span>
                      <span>{discountValue}%</span>
                    </span>
                    <span className="text-end">
                      {discountedAmount.toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="border-b border-gray-400"></p>
                <div className="">
                  <p className="flex justify-between font-bold">
                    <span className="text-start">Grand Total:</span>
                    <span className="text-end">
                      {(subTotal - discountedAmount).toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="border-b-2 border-black"></p>
                <div className="text-end">
                  <button
                    disabled={carts.length == 0}
                    onClick={() =>
                      handleSellingInvoice(
                        carts,
                        subTotal,
                        subTotal - discountedAmount,
                        discountedAmount
                      )
                    }
                    className="bg-blue-600 px-4 py-1 text-white hover:bg-gray-900 duration-500 rounded-md"
                  >
                    Make Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
