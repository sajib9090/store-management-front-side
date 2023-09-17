import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useProductContext } from "../../../GlobalContext/ProductContext";
import { useFilterProductContext } from "../../../GlobalContext/FilterContext";
import TableData from "./TableData";

const FindProductsByCompany = () => {
  const { companies } = useProductContext();
  const { setSelectedOption, filterProductsByCompany, selectedOption } =
    useFilterProductContext();
  const companyOptions = companies?.map((item) => ({
    value: item.company,
    label: item.company,
  }));
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setSelectedOption(data.company.value);
  };
  filterProductsByCompany.sort((a, b) => a.stock - b.stock);

  return (
    <div>
      <div className="bg-blue-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto shadow-2xl py-6"
        >
          <div className="flex flex-col  px-4">
            <label className="py-2">Select Company*</label>
            <Controller
              name="company"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select options={companyOptions} {...field} />
              )}
            />
            {errors.company?.type === "required" && (
              <p className="text-red-600 pt-1" role="alert">
                Company is required
              </p>
            )}
          </div>
          <div className="px-4">
            <button
              className="bg-blue-600 py-2 mt-4 text-white w-full hover:bg-blue-400 duration-500"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-center text-2xl mt-6 mb-2 uppercase">
          {selectedOption} <span className="ml-2">Stock</span>
        </h1>
        {filterProductsByCompany?.length < 1 ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <h1
              className="text-4xl font-bold
            "
            >
              No product found
            </h1>
          </div>
        ) : (
          <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
            <tr className="bg-blue-300 w-full">
              <th className="hidden md:block text-center p-[8px] border border-white">
                No.
              </th>
              <th className="text-start p-[8px] border border-white w-[50%]">
                Name
              </th>
              <th className=" border border-white w-[20%]">Stock</th>
              <th className=" border border-white w-[20%]"></th>
            </tr>
            {filterProductsByCompany?.map((item, index) => (
              <tr key={index} className="bg-blue-200 w-full">
                <TableData index={index} item={item} />
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default FindProductsByCompany;
