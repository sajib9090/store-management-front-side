import { useContext, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import SimpleLoader from "../../Components/SimpleLoader/SimpleLoader";
import { AuthContext } from "../../GlobalContext/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
const Account = () => {
  const { loading, setLoading, createNewUserWithEmail } =
    useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const normalUser = e.target.normalUser.value;
    const adminUser = e.target.adminUser.value;
    const password = e.target.password.value;

    const user = {
      email: email,
      isAdmin: JSON.parse(adminUser),
      isNormalUser: JSON.parse(normalUser),
      createdDate: new Date().toISOString(),
    };

    createNewUserWithEmail(email, password)
      .then((userCredential) => {
        if (userCredential?.user?.email) {
          axios
            .post(`${import.meta.env.VITE_API_URL}/api/add/user`, user)
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("New User Created");
                setLoading(false);
              }
            })
            .catch((err) => {
              if (err) {
                console.log(err);
                setLoading(false);
              }
            });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
          toast.error("User Already Exist");
          axios
            .post(`${import.meta.env.VITE_API_URL}/api/add/user`, user)
            .then((res) => {
              console.log(res.data.acknowledged);
              if (res.data.acknowledged) {
                toast.success("New User Created");
                setLoading(false);
              }
            })
            .catch((err) => {
              if (err) {
                console.log(err);
                setLoading(false);
              }
            });
        }
      });
  };
  return (
    <div className="max-w-md mx-auto shadow-2xl min-h-screen flex flex-col justify-center px-4">
      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-bold">Email *</label>
          <input
            className="w-[100%] h-[40px] px-2 border-2 border-blue-400 rounded focus:rounded-3xl duration-500"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-bold">Is Normal User?</label>
          <select
            name="normalUser"
            className="h-[40px] border-2 border-blue-400 rounded focus:rounded-3xl duration-500"
          >
            <option value="true" selected>
              Yes
            </option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-bold">Is Admin User?</label>
          <select
            name="adminUser"
            className="h-[40px] border-2 border-blue-400 rounded focus:rounded-3xl duration-500"
          >
            <option value="true">Yes</option>
            <option value="false" selected>
              No
            </option>
          </select>
        </div>
        <div className="flex flex-col space-y-2 relative">
          <label className="font-bold">Password *</label>
          <input
            className="w-[100%] h-[40px] px-2 border-2 border-blue-400 rounded focus:rounded-3xl duration-500"
            type={visible ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            required
          />
          {/*  */}
          {visible ? (
            <AiFillEyeInvisible
              onClick={() => setVisible(!visible)}
              className="w-5 h-5 absolute right-2 bottom-[11px] cursor-pointer"
            />
          ) : (
            <AiFillEye
              onClick={() => setVisible(!visible)}
              className="w-5 h-5 absolute right-2 bottom-[11px] cursor-pointer"
            />
          )}
        </div>
        <div>
          <button
            className="bg-blue-500 text-white w-full h-[40px] font-bold rounded hover:rounded-3xl duration-500"
            type="submit"
            disabled={loading}
          >
            {loading ? <SimpleLoader /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
