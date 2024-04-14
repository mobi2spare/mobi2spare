import { CategoryFilter } from "./CategoryFilter";
// import isEmpty from "lodash/isEmpty";
// import { useTranslation } from "next-i18next";

export const ShopFilters: React.FC = () => {
	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						Filters
					</h2>
				</div>
			</div>
			<CategoryFilter />
		</div>
	);
};
