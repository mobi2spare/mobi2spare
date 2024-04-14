import { useEffect, useState } from "react";
import { CheckBox } from "../../ui/checkbox";
import { TOKEN } from "../../../helper/constants/constants";
import http from "../../../utils/http";
import { Option } from "../../../utils/types/dropdown";

export const CategoryFilter = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);

  useEffect(() => {
    const tokenData = localStorage.getItem(TOKEN);

    if (tokenData) {
      const { token } = JSON.parse(tokenData);

      http
        .get("/api/categories", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            const categories = res.data.data.map((item: any) => {
              const categoriesOption = {
                name: item.name,
                value: item.name,
              };
              return categoriesOption;
            });
            setCategoriesOptions(categories);
          }
        });
    }
  }, []);
  const items = [...categoriesOptions];

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        Category
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.name}
            label={item.name}
            name={item.name.toLowerCase()}
            // checked={formState.includes(item.slug)}
            value={item.slug}
            // onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
