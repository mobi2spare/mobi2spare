import { useContext, useState } from "react";
import Counter from "../components/common/counter";
import Button from "../components/ui/button";
import { AuthContext } from "../contexts/auth/auth.context";
import { useCart } from "../contexts/cart/cart.context";
import { useUI } from "../contexts/ui.context";
import { generateCartItem } from "../utils/generate-cart-item";
import usePrice from "./use-price";


export default function ProductPopup() {
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'INR',
  });
  const { image, name } = data;
  const { authenticated } = useContext(AuthContext);


    function addToCart() {
      // to show btn feedback while product carting
      setAddToCartLoader(true);
      setTimeout(() => {
        setAddToCartLoader(false);
        setViewCartBtn(true);
      }, 600);
      const item = generateCartItem(data);
      addItemToCart(item as any, quantity);
      console.log(item, 'item');
    }

  function navigateToProductPage() {
    closeModal();
    /* router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
      locale: router.locale,
    }); */
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          <img
            src={
              image ??
              '/assets/placeholder/products/product-thumbnail.svg'
            }
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {/* {description} */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde officiis ducimus perferendis aut quam. Similique, voluptas a ipsa iusto eum officiis quam sint quia. Autem ducimus voluptates alias quae vel.
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {authenticated &&
            <div className="pt-2 md:pt-4">
              <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
                <Counter
                  quantity={quantity}
                  onIncrement={() => setQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disableDecrement={quantity === 1}
                />
                <Button
                  onClick={addToCart}
                  variant="flat"
                  /*  className={`w-full h-11 md:h-12 px-1.5 ${
                    !isSelected && 'bg-gray-400 hover:bg-gray-400'
                   }`} */
                  // disabled={!isSelected}
                  loading={addToCartLoader}
                >
                  {/* {t('text-add-to-cart')} */}
                  Add to cart
                </Button>
              </div>

              {viewCartBtn && (
                <button
                  onClick={navigateToCartPage}
                  className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
                >
                  {/* {t('text-view-cart')} */}
                  view cart
                </button>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
