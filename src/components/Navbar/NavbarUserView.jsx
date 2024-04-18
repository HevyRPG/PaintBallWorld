import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenuDemo } from "./NavbarUserDropdown";
import Cookies from "js-cookie";

const NavbarUserView = () => {
  const username = Cookies.get("username");
  const role = Cookies.get("role");
  return (
    <>
      <div className="flex  gap-2 items-center">
        <Link to="/profile">
          <Avatar>
            <AvatarImage
              src="https://avatar.iran.liara.run/public/36"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        {/* czy user czy owner */}
        <div className="text-sm mr-2">
          <p>{username}</p>
          <p className="text-primary">@{role}</p>
        </div>

        <DropdownMenuDemo />
      </div>
    </>
  );
};

export default NavbarUserView;
