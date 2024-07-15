const governorates = [
  "Tunis",
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Zaghouan",
];

const CartForm = () => {
  return (
    <div className="bg-[#f6fff8] flex flex-col gap-8 rounded-md md:mt-0 ">
      <div className="flex flex-col  gap-8  p-4 sm:p-12">
        <div className="flex  gap-8 w-full  justify-center ">
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
            />
          </div>
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
            />
          </div>
        </div>
        <div className="flex gap-8 w-full  justify-center ">
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="">Address Line</label>
            <input
              type="text"
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
            />
          </div>
          <div className="flex flex-col w-[45%] gap-2 mt-1">
            <label htmlFor="">City</label>
            <select
              className="w-full  border-b-2 border-black outline-none bg-transparent focus:border-[#00b27d] "
              name=""
              id=""
            >
              {governorates.map((governorat) => (
                <option>{governorat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#e4f7f8b0]  p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg">1 Article</h3>
          <h2 className="text-lg font-bold">99 TND</h2>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <h3 className="text-lg">Delivery Fees</h3>
          <h2 className="text-lg font-bold">0 TND</h2>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Total</h3>
          <h2 className="text-xl font-bold">99 TND</h2>
        </div>
        <div className="flex items-center justify-center ">
          <button className="bg-[#00b27d] text-white text-xl font-semibold w-full p-3 rounded-md ">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
