
const CustomizeProduct = ({ sizeIndex, setSizeIndex, sizes}) => {

  return (
    <div className="flex flex-col gap-6 border-y-[1px] border-black border-opacity-50 py-4">
      <h3 className="font-medium">Choose a Size</h3>
      <ul className="flex items-center gap-3">
        {sizes.map((size) => (
          <li
            key={size.id}
            className={`ring-1 ring-black rounded-sm py-1 px-4 text-sm cursor-pointer
            hover:bg-black hover:text-white ${
              size.id === sizeIndex && "bg-black text-white"
            }`}
            onClick={() => setSizeIndex(size.id)}
          >
            {size.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizeProduct;
