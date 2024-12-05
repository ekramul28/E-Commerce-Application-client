"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Image from "next/image";

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 ">
          <button className="w-9 h-9 md:w-14 md:h-14 object-cover rounded-full overflow-hidden focus:outline-none">
            {user?.imageUrl && (
              <Image
                src={user?.imageUrl}
                alt="Profile Image"
                layout="responsive"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover object-center"
              />
            )}
          </button>

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{user?.role}</strong>

              <span> {user?.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
