import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SimpleLoader from "../../../SimpleLoader/SimpleLoader";

const AddCompanyContent = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const companyData = {
        company: data.company.toLowerCase(),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/add/company`,
        companyData
      );
      if (response.data.acknowledged) {
        toast.success("New Company Added Successfully.");
        reset();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 className="text-center text-2xl text-black font-semibold mb-6">
        Add Brand New Company
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex flex-col bg-slate-300 py-6 px-4 shadow-2xl">
          <label className="py-2">Write New Company*</label>
          <input
            className="px-4 py-2"
            type="text"
            placeholder="Company"
            {...register("company", { required: true })}
            aria-invalid={errors.company ? "true" : "false"}
          />
          {errors.company?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Company name is required
            </p>
          )}
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

export default AddCompanyContent;
