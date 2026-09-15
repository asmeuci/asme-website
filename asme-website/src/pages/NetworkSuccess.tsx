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

/*
"error" means Stripe is sure this registration does not exist. "unavailable"
means we could not reach Stripe to ask. They have to stay apart: only the first
one can safely offer to start the registration over, because the second one may
be hiding a payment that already went through.
*/
type Status = "loading" | "paid" | "unpaid" | "unavailable" | "error";

function NetworkSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
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
        if (!active) return;

        if (response.status === 400 || response.status === 404) {
          setStatus("error");
          return;
        }

        if (!response.ok) {
          setStatus("unavailable");
          return;
        }

        const data: Confirmation = await response.json();
        setConfirmation(data);
        setStatus(data.paid ? "paid" : "unpaid");
      })
      .catch(() => {
        // A network failure tells us nothing about whether the payment landed.
        if (active) setStatus("unavailable");
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

      {status === "unavailable" && (
        <>
          <p className="font-semibold">We couldn't confirm your payment just now.</p>
          <p className="text-sm">
            This is a problem on our end, not with your card.{" "}
            <strong>Please don't pay again</strong> — if your payment went through it is already
            recorded, and Stripe has emailed you a receipt. Refresh in a moment to check.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <p className="font-semibold">We couldn't find that registration.</p>
          <p className="text-sm">
            If you were charged, email us and we'll sort it out — you won't lose your spot, and
            you don't need to pay again.
          </p>
        </>
      )}

      {status === "unavailable" && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-sm underline self-start"
        >
          Refresh
        </button>
      )}

      {(status === "unpaid" || status === "error") && (
        <Link to="/network/register" className="text-sm underline">
          Try again
        </Link>
      )}
    </div>
  );
}

export default NetworkSuccess;
