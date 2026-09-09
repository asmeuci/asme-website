import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/*
Really simple registreration form feel free to change the UI as needed
*/

type Tier = {
  id: string;
  label: string;
  amount: number | null;
  currency: string;
};

const FALLBACK_TIERS: Tier[] = [
  { id: "member", label: "ASME member", amount: null, currency: "usd" },
  { id: "nonmember", label: "Non-member", amount: null, currency: "usd" },
];

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

const priceOf = (tier: Tier | undefined) =>
  tier && tier.amount != null ? formatPrice(tier.amount, tier.currency) : null;

const inputStyles = "p-2 border rounded";

function NetworkRegister() {
  const [searchParams] = useSearchParams();
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS);
  const [tierId, setTierId] = useState(FALLBACK_TIERS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/event-info")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!active || !Array.isArray(data?.tiers) || data.tiers.length === 0) return;
        setTiers(data.tiers);
        setTierId(data.tiers[0].id);
      })
      .catch(() => {
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedPrice = priceOf(tiers.find((tier) => tier.id === tierId));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6">
      {searchParams.get("canceled") === "1" && (
        <p className="text-sm">
          Payment canceled — you have not been charged. You can register below.
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm">
        Ticket type
        <select
          name="tier"
          required
          value={tierId}
          onChange={(event) => setTierId(event.target.value)}
          className={inputStyles}
        >
          {tiers.map((tier) => {
            const price = priceOf(tier);
            return (
              <option key={tier.id} value={tier.id}>
                {tier.label}
                {price ? ` — ${price}` : ""}
              </option>
            );
          })}
        </select>
      </label>

      <input type="text" name="name" required maxLength={100} placeholder="Full name" className={inputStyles} />
      <input type="email" name="email" required maxLength={200} placeholder="Email" className={inputStyles} />
      <input type="tel" name="phone" required maxLength={30} placeholder="Phone number" className={inputStyles} />
      <input type="text" name="major" required maxLength={100} placeholder="Major" className={inputStyles} />
      <input type="text" name="gradYear" required maxLength={10} placeholder="Graduation year" className={inputStyles} />
      <textarea name="dietary" rows={3} maxLength={300} placeholder="Dietary restrictions (optional)" className={inputStyles} />

      <button type="submit" disabled={isSubmitting} className="p-2 rounded font-semibold border disabled:opacity-60">
        {isSubmitting ? "Redirecting..." : `Continue to payment${selectedPrice ? ` — ${selectedPrice}` : ""}`}
      </button>

      {error && <p className="text-center text-sm font-medium">{error}</p>}
    </form>
  );
}

export default NetworkRegister;
