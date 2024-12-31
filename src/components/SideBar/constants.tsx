import {
  FaUser,
  FaCog,
  FaShoppingCart,
  FaShopify,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const userLinks = [
  { href: "/profile", label: "Posts", icon: <FaUser /> },
  {
    href: "/profile/received-claim-requests",
    label: "Received Claim Request",
    icon: <FaBoxOpen />,
  },
  { href: "/profile/settings", label: "Settings", icon: <FaCog /> },
];

export const vendorLinks = [
  { href: "/vendor", label: "Vendor", icon: <FaShoppingCart /> },
  { href: "/vendor/order", label: "All Orders", icon: <FaBoxOpen /> },
  { href: "/vendor/createShop", label: "Create Shop", icon: <FaShopify /> },
  { href: "/vendor/addProduct", label: "Add Product", icon: <MdAdd /> },
  { href: "/vendor/yourShop", label: "My Shop", icon: <FaShopify /> },
];

export const adminLinks = [
  { href: "/admin", label: "Admin", icon: <FaUsers /> },
  { href: "/admin/user", label: "All Users", icon: <BsFillPersonFill /> },
  { href: "/admin/addCategory", label: "Add Category", icon: <MdAdd /> },
  { href: "/admin/CreateVendor", label: "Create Vendor", icon: <FaShopify /> },
  { href: "/admin/allShop", label: "All Shops", icon: <FaBoxOpen /> },
  { href: "/admin/profile", label: "Profile", icon: <CgProfile /> },
];
