import { Hourglass } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="h-screen flex items-center pl-[45%]">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#60A5FA", "#60A5FA"]}
      />
    </div>
  );
};

export default Loader;
