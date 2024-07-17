import FloatingLabelInput from "./FloatingLabelInput";

const Login = ({ setAuthState }) => {
  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Log in
      </h2>
      <FloatingLabelInput labelText="Email Adress" type="email" id="email" />
      <FloatingLabelInput labelText="Password" type="password" id="password" />
      <a className="text-xs tracking-wide font-extrabold ml-auto -mt-8 cursor-pointer hover:border-b-2 border-black"
      onClick={() => setAuthState("recovery")}
      >
        Forgotten your password?
      </a>
      <button className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]">
        Log in
      </button>
      <p className="text-sm -mt-10">
        Don't have an account?
        <span
          className="uppercase font-bold cursor-pointer hover:border-b-2 border-black pb-1"
          onClick={() => setAuthState("signup")}
        >
          {" "}
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
