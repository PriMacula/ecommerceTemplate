import FloatingLabelInput from "./FloatingLabelInput";

const Signup = ({setAuthState}) => {
  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Signup
      </h2>
      <FloatingLabelInput labelText="Email Adress" type="email" id="email" />
      <FloatingLabelInput labelText="Password" type="password" id="password" />
      <FloatingLabelInput
        labelText="Confirm Password"
        type="password"
        id="confirmPassword"
      />

      <button className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]">
        Create Accounts
      </button>
      <p className="text-sm -mt-10">
        Already have an account?
        <span
          className="uppercase font-bold cursor-pointer hover:border-b-2 border-black pb-1"
          onClick={() => setAuthState("login")}
        >
          {" "} Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
