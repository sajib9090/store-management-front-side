import Lottie from "lottie-react";
import animation from "../../../assets/animation_lmqqgrfl.json";
const StoreGreetings = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[55%]">
        <Lottie animationData={animation} loop={true} />
      </div>
    </div>
  );
};

export default StoreGreetings;
