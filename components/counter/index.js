import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Counter({ quantity, increment, decrement, price }) {
  return (
    <div className="absolute flex items-center right-5 top-[46%]">
      <AiOutlineMinusCircle
        className="cursor-pointer w-7 h-7"
        onClick={decrement}
      />
      <span className="mx-2">{quantity}</span>
      <AiOutlinePlusCircle
        className="cursor-pointer w-7 h-7"
        onClick={increment}
      />
      <span>{price * quantity} đ</span>
    </div>
  );
}
