import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceFooter from "../../Components/InvoiceFooter/InvoiceFooter";
import InvoiceTableContent from "../../Components/InvoiceTableContent/InvoiceTableContent";
import InvoiceTitle from "../../Components/InvoiceTitle/InvoiceTitle";
import InvoiceTableHead from "../../Components/InvoiceTable/InvoiceTableHead";
import { useProductContext } from "../../GlobalContext/ProductContext";
import { usePurchaseCartContext } from "../../GlobalContext/PurchaseCartContext";

const PurchaseInvoice = () => {
  const { id } = useParams();
  const [purchaseInvoice, setPurchaseInvoice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { handleRemoveAllPurchaseCart, purchaseCarts } =
    usePurchaseCartContext();
  const { refetchProducts } = useProductContext();
  const printableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && id !== null) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/get/purchaseInvoice/${id}`)
        .then((res) => {
          setPurchaseInvoice(res.data);
          setIsLoading(false);
          refetchProducts();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const purchaseItems = purchaseInvoice.invoice
    ? purchaseInvoice.invoice[0]
    : [];

  const handlePrint = () => {
    //grab the content that want to print
    const content = printableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleRefresh = () => {
    handleRemoveAllPurchaseCart(purchaseCarts);
    navigate("/store/add/add_products");
  };

  return (
    <div>
      <div
        ref={printableRef}
        className="max-w-lg bg-blue-50 mx-auto shadow-2xl"
      >
        <InvoiceTitle id={id} category={"Purchase Invoice"} />
        <div className="shadow-md">
          <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
            <InvoiceTableHead />
            {!isLoading &&
              purchaseItems &&
              purchaseItems?.invoice?.map((item, index) => (
                <InvoiceTableContent
                  key={index}
                  serial={index + 1}
                  productName={item?.product_name}
                  price={(
                    item?.product_quantity *
                    item?.product_purchase_price_per_unit
                  ).toFixed(2)}
                  quantity={item?.product_quantity}
                  pricePerUnit={item?.product_purchase_price_per_unit}
                />
              ))}
          </table>
          <InvoiceFooter
            price={purchaseItems?.beforeDiscountPrice}
            discount={purchaseItems?.totalDiscount}
            finalPrice={purchaseItems?.afterDiscountPrice}
          />
        </div>
        <div className="max-w-[16rem] flex items-center justify-between ml-auto py-6 px-4">
          <button
            onClick={handleRefresh}
            className="bg-gray-500 px-2 py-1 text-white"
          >
            Back to Store
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

export default PurchaseInvoice;
