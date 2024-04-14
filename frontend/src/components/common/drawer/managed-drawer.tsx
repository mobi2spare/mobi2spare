import Drawer from "rc-drawer";
import { useUI } from "../../../contexts/ui.context";
import motionProps from "./motion";
import Cart from "../../cart/cart";

const ManagedDrawer = () => {
	const { displayCart, closeCart } = useUI();
	// const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };
	return (
		<Drawer
			open={displayCart}
			// placement={dir === 'rtl' ? 'left' : 'right'}
			onClose={closeCart}
			// contentWrapperStyle={contentWrapperCSS}
			{...motionProps}
		>
			<Cart />
		</Drawer>
	);
};

export default ManagedDrawer;
