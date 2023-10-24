import { adminNavOptions, navOptions } from "@/constants";

interface NavItemsProps {
  isModalWiew?: boolean;
  isAdminView?: boolean;
  router?: any
}

const NavItems = ({ isModalWiew = false, isAdminView, router }: NavItemsProps) => {

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalWiew ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 bg-white ${
          isModalWiew ? "" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default NavItems;
