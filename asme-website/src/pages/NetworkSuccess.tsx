import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

/*
Where Stripe drops the attendee after checkout. The payment is confirmed by reading the session back from Stripe
*/

type Confirmation = {
  paid: boolean;
  name: string | null;
  email: string | null;
  ticket: string | null;
};

function NetworkSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "paid" | "unpaid" | "error">("loading");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    let active = true;

    fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("lookup failed");
        return response.json();
      })
      .then((data: Confirmation) => {
        if (!active) return;
        setConfirmation(data);
        setStatus(data.paid ? "paid" : "unpaid");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [sessionId]);

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-6">
      {status === "loading" && <p className="font-semibold">Confirming your payment...</p>}

      {status === "paid" && (
        <>
          <p className="font-semibold">
            Thanks{confirmation?.name ? `, ${confirmation.name}` : ""} — your seat is booked.
          </p>
          {confirmation?.ticket && <p className="text-sm">Ticket: {confirmation.ticket}</p>}
          <p className="text-sm">
            A Stripe receipt is on its way to
            {confirmation?.email ? ` ${confirmation.email}` : " your email"}. We'll follow up
            with event details closer to the date.
          </p>
        </>
      )}

      {status === "unpaid" && (
        <>
          <p className="font-semibold">We haven't received your payment yet.</p>
          <p className="text-sm">
            If you just paid, give it a moment and refresh this page. Otherwise you can start
            the registration again.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <p className="font-semibold">We couldn't find that registration.</p>
          <p className="text-sm">
            If you were charged, email us and we'll sort it out — you won't lose your spot.
          </p>
        </>
      )}

      {status !== "paid" && status !== "loading" && (
        <Link to="/network/register" className="text-sm underline">
          Try again
        </Link>
      )}
    </div>
  );
}

export default NetworkSuccess;
 