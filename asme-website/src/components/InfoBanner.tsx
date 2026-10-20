import { useState } from "react";
//import { Link } from "react-router-dom";

// Change this text whenever you want to update the banner.
const BANNER_MESSAGE = "NETWORK WITH ASME TICKETS SOLD OUT! WE HOPE YOU ENJOY THE EVENT!";

// Change the version when you want everyone to see a new announcement.
const BANNER_VERSION = "fall-w4_1";
const DISMISSED_KEY = `asme-info-banner-dismissed-${BANNER_VERSION}`;

function InfoBanner() {
  const [isVisible, setIsVisible] = useState(
    () => sessionStorage.getItem(DISMISSED_KEY) !== "true",
  );

  const dismissBanner = () => {
    sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 md:top-1 left-0 z-[90] w-full px-4">
      <div
        className="mx-auto grid max-w-5xl grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center rounded-xl bg-blue-300 px-3 py-3 text-black shadow-lg sm:px-5"
        role="status"
      >
        <span aria-hidden="true" />

        <p className="font-helvetica text-center text-sm font-semibold sm:text-base">
          {BANNER_MESSAGE}
            {/*<Link to="/network/register" className="underline">
              Register Now
            </Link>*/}
        </p>

        <button
          type="button"
          onClick={dismissBanner}
          className="justify-self-end rounded-md px-2 py-1 font-helvetica text-xl leading-none transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Dismiss announcement"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default InfoBanner;
