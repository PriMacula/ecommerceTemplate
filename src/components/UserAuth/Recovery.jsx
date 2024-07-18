import FloatingLabelInput from "./FloatingLabelInput";

const Signup = ({ setAuthState }) => {
  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Recover Account
      </h2>
      <p className="text-sm text-gray-700 w-3/4 mx-auto">
        We'll send you instructions by email so that you can reset it
      </p>
      <FloatingLabelInput labelText="Email Adress" type="email" id="email" />

      <button className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]">
        Reset
      </button>
      <p className="text-sm -mt-10">
        Want to sign in instead?
        <span
          className="uppercase font-bold cursor-pointer hover:border-b-2 border-black"
          onClick={() => setAuthState("login")}
        >
          {" "}
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
