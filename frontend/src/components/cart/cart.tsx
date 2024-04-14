import { IoClose } from "react-icons/io5";
import { useCart } from "../../contexts/cart/cart.context";
import { useUI } from "../../contexts/ui.context";
import usePrice from "../../product/use-price";
import Scrollbar from "../common/scrollbar";
import CartItem from "./cart-item";
import { motion } from 'framer-motion';
import { fadeInOut } from "../../utils/motion/fade-in-out";
import EmptyCart from "./empty-cart";
import classNames from "classnames";



export default function Cart() {
  const { closeCart } = useUI();
  const { items, total, isEmpty } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
        <h2 className="m-0 pl-7 text-xl font-bold md:text-2xl text-heading">
          {/* @ts-ignore */}
          Shopping Cart
        </h2>
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeCart}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>
      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          variants={fadeInOut(0.25)}
          className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7"
        >
          <EmptyCart />
          <h3 className="pt-8 text-lg font-bold text-heading">
            {/* @ts-ignore */}
            Your cart is empty.
          </h3>
        </motion.div>
      )}

      <div
        className="flex flex-col px-5 pt-2 pb-5 md:px-7 md:pb-7"
        onClick={closeCart}
      >
        <a
          // href={isEmpty === false ? ROUTES.CHECKOUT : '/'}
          className={classNames(
            'w-full px-5 py-3 md:py-4 flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 ',
            isEmpty
              ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
              : 'bg-heading hover:bg-gray-600'
          )}
        >
          <span className="w-full ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
            {/* @ts-ignore */}
            Proceed to checkout
          </span>
          <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
            <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
            {cartTotal}
          </span>
        </a>
      </div>
    </div>
  );
}
