import axios from "axios";
import { useState } from "react";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import InvoiceFooter from "../InvoiceFooter/InvoiceFooter";
import InvoiceTableContent from "../InvoiceTableContent/InvoiceTableContent";
import InvoiceTableHead from "../InvoiceTable/InvoiceTableHead";
import InvoiceTitle from "../InvoiceTitle/InvoiceTitle";

const FindSoldInvoice = () => {
  const [findInvoice, setFindInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    const inputValue = e.target.form.searchValue.value;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/get/soldInvoice/${inputValue}`)
      .then((res) => {
        setFindInvoice(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const soldItems = findInvoice.invoice ? findInvoice.invoice[0] : [];

  return (
    <div>
      <div className="max-w-xl bg-slate-200 mx-auto">
        <form className="p-4 w-full flex items-center">
          <input
            className="px-4 py-2 w-[70%]"
            type="text"
            name="searchValue"
            placeholder="Write invoice id"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="bg-blue-400 px-4 py-2 w-[30%] text-white font-bold"
          >
            {loading ? <SimpleLoader /> : "Search"}
          </button>
        </form>
        {loading ? (
          <div className="h-[100vh] flex mt-[30%] justify-center">
            <SimpleLoader />
          </div>
        ) : (
          <div className="min-h-screen">
            <div className="max-w-lg bg-blue-50 mx-auto shadow-2xl">
              <InvoiceTitle
                id={findInvoice._id}
                category={"Sold Invoice"}
                createdDate={"Created Date:"}
                time={findInvoice?.createdTime}
              />
              <div className="shadow-md">
                <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
                  <InvoiceTableHead />
                  {soldItems?.soldProducts &&
                    soldItems?.soldProducts?.map((item, index) => (
                      <InvoiceTableContent
                        key={index}
                        serial={index + 1}
                        productName={item?.product_name}
                        price={
                          item?.product_quantity * item?.product_price_per_unit
                        }
                        quantity={item?.product_quantity}
                        pricePerUnit={item?.product_price_per_unit}
                      />
                    ))}
                </table>
                <InvoiceFooter
                  price={soldItems?.totalPrice}
                  discount={
                    soldItems?.totalDiscount
                      ? soldItems.totalDiscount.toFixed(2)
                      : "0.00"
                  }
                  finalPrice={
                    soldItems?.discountedPrice
                      ? soldItems?.discountedPrice.toFixed(2)
                      : "0.00"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSoldInvoice;
