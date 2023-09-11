import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SimpleLoader from "../../../SimpleLoader/SimpleLoader";
import { useProductContext } from "../../../../GlobalContext/ProductContext";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const { companies, generics, categories } = useProductContext();

  const genericOptions = generics?.map((item) => ({
    value: item.generic,
    label: item.generic,
  }));
  const companyOptions = companies?.map((item) => ({
    value: item.company,
    label: item.company,
  }));
  const categoryOptions = categories?.map((item) => ({
    value: item.category,
    label: item.category,
  }));
  const strengthCategoryOptions = [
    { value: "mg", label: "mg" },
    { value: "ml", label: "ml" },
    { value: "mcg", label: "mcg" },
    { value: "kg", label: "kg" },
    { value: "kg", label: "kg" },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm();

  const isPositiveNumber = (value) => {
    return parseFloat(value) > 0;
  };

  const isPurchasePriceValid = (purchasePrice, sellingPrice) => {
    return parseFloat(purchasePrice) <= parseFloat(sellingPrice);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const product = {
        title:
          data.name.toLowerCase().replace(/\s+/g, "_") +
          data.strength +
          data.strengthCategory.value,
        product_id:
          data.name.toLowerCase().replace(/\s+/g, "_") +
          data.strength +
          data.strengthCategory.value +
          786,
        product_match_id:
          data.name.toLowerCase().replace(/\s+/g, "_") +
          data.strength +
          data.strengthCategory.value +
          786,
        company_name: data.company.value,
        generic_name: data.generic.value,
        category_name: data.category.value,
        product_purchase_price: parseFloat(data.purchasePrice),
        price: parseFloat(data.sellingPrice),
        strength: data.strength + data.strengthCategory.value,
        stock: 0,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/add/product`,
        product
      );
      if (response.data.acknowledged) {
        toast.success("New Product Added Successfully.");
        reset();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };
  const sellingPrice = watch("sellingPrice", 0);
  return (
    <div>
      <h3 className="text-center text-2xl text-black font-semibold mb-6">
        Add Brand New Product
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-slate-300 shadow-2xl py-6"
      >
        <div className="flex flex-col px-4 ">
          <label className="py-2">Write New Product Name*</label>
          <input
            className="px-4 py-2"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Product Name is required
            </p>
          )}
        </div>
        <div className="flex flex-col  px-4">
          <label className="py-2">Select Generic*</label>
          <Controller
            name="generic"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select options={genericOptions} {...field} />
            )}
          />
          {errors.generic?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Generic is required
            </p>
          )}
        </div>
        <div className="flex flex-col  px-4">
          <label className="py-2">Select Category*</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select options={categoryOptions} {...field} />
            )}
          />
          {errors.category?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Category is required
            </p>
          )}
        </div>
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
        <div className="flex flex-col  px-4">
          <label className="py-2">Add Strength*</label>
          <div className="flex items-center w-full justify-between">
            <div className="w-[100%]">
              <input
                className="px-4 py-2 flex flex-col"
                type="number"
                step="any"
                placeholder="Weight/Strength"
                {...register("strength", {
                  required: true,
                  validate: {
                    isPositive: (value) => isPositiveNumber(value),
                  },
                })}
                aria-invalid={errors.strength ? "true" : "false"}
              />
              {errors.strength?.type === "required" && (
                <p className="text-red-600 pt-1" role="alert">
                  Strength is required
                </p>
              )}
              {errors.strength?.type === "isPositive" && (
                <p className="text-red-600 pt-1" role="alert">
                  Strength must be positive
                </p>
              )}
            </div>

            <div className="flex flex-col w-[100%]">
              <Controller
                name="strengthCategory"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select options={strengthCategoryOptions} {...field} />
                )}
              />
              {errors.strengthCategory?.type === "required" && (
                <p className="text-red-600 pt-1" role="alert">
                  Strength category is required
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <label className="py-2">Purchase Price Per Unit*</label>
          <input
            className="px-4 py-2"
            type="number"
            step="any"
            placeholder="Purchase Price Per Unit"
            {...register("purchasePrice", {
              required: true,
              validate: {
                isPositive: (value) => isPositiveNumber(value),
                isPurchasePriceValid: (value) =>
                  isPurchasePriceValid(value, sellingPrice),
              },
            })}
            aria-invalid={errors.purchasePrice ? "true" : "false"}
          />
          {errors.purchasePrice?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Purchase Price is required
            </p>
          )}
          {errors.purchasePrice?.type === "isPositive" && (
            <p className="text-red-600 pt-1" role="alert">
              Purchase Price must be positive
            </p>
          )}
          {errors.purchasePrice?.type === "isPurchasePriceValid" && (
            <p className="text-red-600 pt-1" role="alert">
              Purchase price cannot be greater than selling price
            </p>
          )}
        </div>
        <div className="flex flex-col px-4">
          <label className="py-2">Selling Price Per Unit*</label>
          <input
            className="px-4 py-2"
            type="number"
            step="any"
            placeholder="Selling Price Per Unit"
            {...register("sellingPrice", {
              required: true,
              validate: {
                isPositive: (value) => isPositiveNumber(value),
              },
            })}
            aria-invalid={errors.sellingPrice ? "true" : "false"}
          />
          {errors.sellingPrice?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Selling Price is required
            </p>
          )}
          {errors.sellingPrice?.type === "isPositive" && (
            <p className="text-red-600 pt-1" role="alert">
              Selling Price must be positive
            </p>
          )}
        </div>
        <div className="px-4">
          <button
            className="bg-blue-600 py-2 mt-4 text-white w-full hover:bg-blue-400 duration-500"
            type="submit"
            disabled={loading}
          >
            {loading ? <SimpleLoader /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
