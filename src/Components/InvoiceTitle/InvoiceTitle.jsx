/* eslint-disable react/prop-types */
const InvoiceTitle = ({ id, category, createdDate, time }) => {
  return (
    <div className="flex justify-between px-4 py-6">
      <div>
        <h3 className="font-bold text-xl">Medicated Zone</h3>
        <address>Naria, Shariatpur</address>
        <div className="flex flex-col">
          <small>{new Date().toLocaleString()}</small>
          <small>
            {createdDate} {time}
          </small>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Invoice: {id}</h3>
        <p className="font-bold">{category}</p>
      </div>
    </div>
  );
};

export default InvoiceTitle;
