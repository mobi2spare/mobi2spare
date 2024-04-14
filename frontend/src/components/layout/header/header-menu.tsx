import classNames from "classnames";
import { Link } from "react-router-dom";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {data?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-4 ${
            item.subMenu ? "relative" : ""
          }`}
          key={item.id}
        >
          <Link
            to={item.path}
            className="relative inline-flex items-center px-3 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
