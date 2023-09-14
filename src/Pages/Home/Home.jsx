import Lottie from "lottie-react";
import doctor from "../../../src/assets/animation_lmjfe7q6.json";

const Home = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Lottie animationData={doctor} loop={true} />
    </div>
  );
};

export default Home;
