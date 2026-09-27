import { useState } from "react";
import { Link } from "react-router-dom";

// Change this text whenever you want to update the banner.
const BANNER_MESSAGE = "ASME Week 1 GM will be at DCE270! Wednesday 9/30 at 6:30PM. Board members will be at Brandywine @ 6:10 to lead the way! Meetings will be in MDEA moving forward. ";

// Change the version when you want everyone to see a new announcement.
const BANNER_VERSION = "fall-w1";
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
    <div className="fixed top-16 md:top-36 left-0 z-[90] w-full px-4">
      <div
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-xl bg-blue-300 px-5 py-3 text-black shadow-lg"
        role="status"
      >
        <p className="font-helvetica text-sm font-semibold text-center sm:text-base">
          {BANNER_MESSAGE}
            {/*<Link to="/network/register" className="underline">
              Register Now
            </Link>*/}
        </p>

        <button
          type="button"
          onClick={dismissBanner}
          className="shrink-0 rounded-md px-2 py-1 text-xl leading-none transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Dismiss announcement"
        >
          <p className ="font-helvetica">
            X
          </p>
        </button>
      </div>
    </div>
  );
}

export default InfoBanner;
