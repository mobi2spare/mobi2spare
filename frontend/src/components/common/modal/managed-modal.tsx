import Modal from "./modal";
import FilterModal from "../filter-modal";
import { useUI } from "../../../contexts/ui.context";
// import ProductPopup from "../../../product/product-popup";

const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "DISPLAY_FILTER" && <FilterModal />}
			{modalView === "PRODUCT_VIEW" && <FilterModal />}

		</Modal>
	);
};

export default ManagedModal;
