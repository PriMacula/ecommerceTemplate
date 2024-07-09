import Image from "next/image";

const Benefits = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Image src="guarantee" alt="" height={24} width={24} />
        <h3>Guranteed high quality</h3>
      </div>
      <div className="flex items-center gap-2">
        <Image src="guarantee" alt="" height={24} width={24} />
        <h3>Delivered in maxium 2 days</h3>
      </div>
    </div>
  );
};

export default Benefits;
