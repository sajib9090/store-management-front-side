import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceTableHead from "../../Components/InvoiceTable/InvoiceTableHead";
import InvoiceTableContent from "../../Components/InvoiceTableContent/InvoiceTableContent";
import InvoiceTitle from "../../Components/InvoiceTitle/InvoiceTitle";
import InvoiceFooter from "../../Components/InvoiceFooter/InvoiceFooter";
import { useCartContext } from "../../GlobalContext/CartContext";
import { useProductContext } from "../../GlobalContext/ProductContext";

const SoldInvoice = () => {
  const { id } = useParams();
  const [soldInvoice, setSoldInvoice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { handleRemoveAllSoldCart } = useCartContext();
  const { refetchProducts } = useProductContext();
  const printableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && id !== null) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/get/soldInvoice/${id}`)
        .then((res) => {
          setSoldInvoice(res.data);
          refetchProducts();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const soldItems = soldInvoice.invoice ? soldInvoice.invoice[0] : [];

  const handlePrint = () => {
    //grab the content that want to print
    const content = printableRef.current.innerHTML;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = content;

    window.print();

    document.body.innerHTML = originalContents;
  };

  const handleRefresh = () => {
    handleRemoveAllSoldCart();
    navigate("/sell");
  };

  return (
    <div>
      <div
        ref={printableRef}
        className="max-w-lg bg-blue-50 mx-auto shadow-2xl"
      >
        <InvoiceTitle id={id} category={"Sold Invoice"} />
        <div className="shadow-md">
          <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
            <InvoiceTableHead />
            {!isLoading &&
              soldItems?.soldProducts &&
              soldItems?.soldProducts?.map((item, index) => (
                <InvoiceTableContent
                  key={index}
                  serial={index + 1}
                  productName={item?.product_name}
                  price={item?.product_quantity * item?.product_price_per_unit}
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
                ? soldItems.discountedPrice.toFixed(2)
                : "0.00"
            }
          />
        </div>
        <div className="max-w-[15rem] flex items-center justify-between ml-auto py-6 px-4">
          <button
            onClick={handleRefresh}
            className="bg-gray-500 px-2 py-1 text-white"
          >
            Back to Sell
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-500 px-2 py-1 text-white"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoldInvoice;
