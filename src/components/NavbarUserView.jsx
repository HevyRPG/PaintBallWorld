import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenuDemo } from "./NavbarUserDropdown";

const NavbarUserView = () => {
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
          <p>Janek</p>
          <p className="text-primary">@user</p>
        </div>

        <DropdownMenuDemo />
      </div>
    </>
  );
};

export default NavbarUserView;
