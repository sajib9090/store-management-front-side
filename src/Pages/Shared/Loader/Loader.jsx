import { Watch } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="h-screen flex items-center pl-[45%]">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#60A5FA"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
