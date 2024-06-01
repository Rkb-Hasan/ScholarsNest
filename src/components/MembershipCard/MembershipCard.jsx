import { RiPoliceBadgeLine } from "react-icons/ri";
import { BiSolidBadge } from "react-icons/bi";
import { GiPoliceBadge } from "react-icons/gi";
import { Link } from "react-router-dom";
const MembershipCard = ({ badge }) => {
  return (
    <Link to="/checkout">
      <div className="h-[685px]  bg-slate-100 bg-opacity-50 pt-2  flex flex-col rounded-md shadow-md  ">
        <div>
          {badge === "silver" && (
            <BiSolidBadge className="object-cover object-center w-full rounded-t-md h-72 text-slate-400" />
          )}
          {badge === "gold" && (
            <GiPoliceBadge className="object-cover object-center w-full rounded-t-md h-72 text-yellow-500" />
          )}
          {badge === "platinum" && (
            <RiPoliceBadgeLine className="object-cover object-center w-full rounded-t-md h-72 text-violet-600" />
          )}
        </div>

        <div className="border-t-2 border-slate-400 flex-1 p-0 space-y-8 bg-slate-200  m-0">
          <div className=" m-0">
            <h2 className="text-3xl font-semibold tracking-wide text-center border-red-500 border-b-2 py-2  uppercase">
              {badge}
            </h2>
            <div className="m-0">
              {badge === "silver" && (
                <div className="m-0">
                  <h2 className="p-2 font-semibold text-center border-red-500 border-b-2 ">
                    Upgrade your package to <span>{badge}</span> at only $300
                    /month
                  </h2>

                  <div className="p-6 pt-3">
                    <h3 className="text-lg font-bold">Facilities :</h3>
                    <ul className="list-disc ps-6">
                      <li className="font-semibold">Shared Room</li>
                      <li className="font-semibold"> High-Speed Wi-Fi</li>
                      <li className="font-semibold">Gym Access</li>
                      <li className="font-semibold">Study Lounge Access</li>
                    </ul>
                  </div>
                </div>
              )}
              {badge === "gold" && (
                <div className="m-0">
                  <h2 className="p-2 font-semibold text-center border-red-500 border-b-2 ">
                    Upgrade your package to <span>{badge}</span> at only $600
                    /month
                  </h2>

                  <div className="p-6 pt-3">
                    <h3 className="text-lg font-bold">Facilities :</h3>
                    <ul className="list-disc ps-6">
                      <li className="font-semibold">Shared Room</li>
                      <li className="font-semibold"> High-Speed Wi-Fi</li>
                      <li className="font-semibold">Gym Access</li>
                      <li className="font-semibold">Study Lounge Access</li>
                      <li className="font-semibold"> Bi-Weekly Housekeeping</li>
                      <li className="font-semibold">Laundry Services</li>
                      <li className="font-semibold">Community Events Access</li>
                    </ul>
                  </div>
                </div>
              )}
              {badge === "platinum" && (
                <div className="m-0">
                  <h2 className="py-2 font-semibold text-center border-red-500 border-b-2 ">
                    Upgrade your package to <span>{badge}</span> at only $900
                    /month
                  </h2>

                  <div className="p-6 pt-3">
                    <h3 className="text-lg font-bold">Facilities :</h3>
                    <ul className="list-disc ps-6">
                      <li className="font-semibold">Shared Room</li>
                      <li className="font-semibold"> High-Speed Wi-Fi</li>
                      <li className="font-semibold">
                        {" "}
                        Full Gym Access with Personal Trainer Sessions
                      </li>
                      <li className="font-semibold">Study Lounge Access</li>
                      <li className="font-semibold">Weekly Housekeeping</li>
                      <li className="font-semibold">Laundry Services</li>
                      <li className="font-semibold">Community Events Access</li>
                      <li className="font-semibold">Meal Plan</li>
                      <li className="font-semibold">24/7 Concierge Service</li>
                      <li className="font-semibold">
                        Shuttle Service to Campus
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MembershipCard;
