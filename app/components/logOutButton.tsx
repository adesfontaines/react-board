import { PiSignOut } from "react-icons/pi";
import { signOut } from "next-auth/react";

const LogoutButton: React.FC = () => {
  "use client";
  return (
    <button
      onClick={() => signOut()}
      className="p-2 pl-4 text-left hover:bg-slate-200 flex items-center"
    >
      <PiSignOut className="pr-2" size={32} />
      Disconnect
    </button>
  );
};
export default LogoutButton;
