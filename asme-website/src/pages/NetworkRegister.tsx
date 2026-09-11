import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Section from "../components/Section";

type Tier = {
  id: string;
  label: string;
  amount: number | null;
  currency: string;
};

type Company = {
  id: string;
  name: string;
};

const FALLBACK_TIERS: Tier[] = [
  { id: "no_meal", label: "No meal", amount: null, currency: "usd" },
  { id: "meal", label: "Meal", amount: null, currency: "usd" },
];

const MAX_RESUME_BYTES = 2 * 1024 * 1024;
const inputStyles =
  "min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

const priceOf = (tier: Tier | undefined) =>
  tier && tier.amount != null ? formatPrice(tier.amount, tier.currency) : null;

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const commaIndex = result.indexOf(",");
      if (commaIndex === -1) reject(new Error("Could not read the resume."));
      else resolve(result.slice(commaIndex + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the resume."));
    reader.readAsDataURL(file);
  });

function NetworkRegister() {
  const [searchParams] = useSearchParams();
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [tierId, setTierId] = useState(FALLBACK_TIERS[0].id);
  const [preferences, setPreferences] = useState(["", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/event-info")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load registration options.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.tiers) && data.tiers.length > 0) {
          setTiers(data.tiers);
          setTierId(data.tiers[0].id);
        }
        if (Array.isArray(data.companies)) setCompanies(data.companies);
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Could not load registration options.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedPrice = priceOf(tiers.find((tier) => tier.id === tierId));
  const selectedCompanies = useMemo(() => new Set(preferences.filter(Boolean)), [preferences]);

  const updatePreference = (index: number, value: string) => {
    setPreferences((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const resume = formData.get("resume");
    if (resume instanceof File && resume.size > 0) {
      if (!resume.name.toLowerCase().endsWith(".pdf") || resume.type !== "application/pdf") {
        setError("Your resume must be a PDF.");
        return;
      }
      if (resume.size > MAX_RESUME_BYTES) {
        setError("Your resume must be 2 MB or smaller.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const resumePayload = resume instanceof File && resume.size > 0
        ? {
            name: resume.name,
            size: resume.size,
            type: resume.type,
            base64: await fileToBase64(resume),
          }
        : null;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          tier: tierId,
          dietaryRestrictions: formData.get("dietaryRestrictions"),
          preference1: preferences[0],
          preference2: preferences[1],
          preference3: preferences[2],
          resume: resumePayload,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = data.url;
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Section className="bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] pt-10 pb-10 md:pt-44 md:pb-16">
        <div className="container mx-auto md:w-7/8 pb-5">
          <div className="bg-blue-900 rounded-[20px] flex justify-center md:rounded-[80px]">
              <h1 className="px-5 py-8 md:px-12 md:py-12 text-[40px] md:text-[64px] text-center font-bold tracking-tight text-blue-400">
                Register for Network With ASME
              </h1>
          </div>
        </div>   
        <div className="container mx-auto md:w-[55%] pb-5">
          <div className="bg-[#f1f0ea] rounded-[10px] flex justify-center md:rounded-[20px]">
              <p className="mt-3 mb-3 px-5 md:px-0 max-w-2xl font-helvetica font-bold leading-relaxed text-zinc-700 text-center ">
                Submit your information and/or resume, then continue to Stripe to complete payment. Your seat is confirmed only after payment succeeds.
              </p>
          </div>
        </div>  

        <div className="mx-auto max-w-3xl px-4 font-helvetica">       

          <form onSubmit={onSubmit} className="rounded-3xl border border-zinc-200 bg-[#f1f0ea] p-5 shadow-sm md:p-8">
            {searchParams.get("canceled") === "1" && (
              <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                Payment was canceled and you were not charged. Please submit the form again when you are ready.
              </div>
            )}

            <fieldset disabled={isSubmitting} className="space-y-7 disabled:opacity-70">
              <div>
                <h2 className="text-xl font-bold text-blue-950">Attendee information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                    First name
                    <input className={inputStyles} type="text" name="firstName" required maxLength={100} autoComplete="given-name" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                    Last name
                    <input className={inputStyles} type="text" name="lastName" required maxLength={100} autoComplete="family-name" />
                  </label>
                </div>
                <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                   Email
                  <input className={inputStyles} type="email" name="email" required maxLength={254} autoComplete="email" />
                  <span className="font-normal text-zinc-600">Stripe sends the payment receipt to this address.</span>
                </label>
              </div>

              <div>
                <h2 className="text-xl font-bold text-blue-950">Company preferences</h2>
                <p className="mt-1 text-sm text-zinc-600 text-center">Rank up to three different companies. Your rankings will be used to designate seating assignments.</p>
                <div className="mt-4 grid gap-4">
                  {["First choice", "Second choice (optional)", "Third choice (optional)"].map((label, index) => (
                    <label key={label} className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                      {label}
                      <select
                        className={inputStyles}
                        value={preferences[index]}
                        required={index === 0}
                        onChange={(event) => updatePreference(index, event.target.value)}
                        disabled={isLoading || companies.length === 0}
                      >
                        <option value="">{isLoading ? "Loading companies…" : index === 0 ? "Select a company" : "No preference"}</option>
                        {companies.map((company) => (
                          <option
                            key={company.id}
                            value={company.id}
                            disabled={selectedCompanies.has(company.id) && preferences[index] !== company.id}
                          >
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-blue-950">Resume</h2>
                <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                  Upload resume (optional)
                  <input
                    className="block w-full rounded-xl border border-dashed border-zinc-400 bg-zinc-50 px-4 py-5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-800"
                    type="file"
                    name="resume"
                    accept="application/pdf,.pdf"
                  />
                  <span className="font-normal text-zinc-600"> One PDF, maximum 2 MB.</span>
                </label>
              </div>

              <div>
                <h2 className="text-xl font-bold text-blue-950">Payment</h2>
                <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                  Ticket type
                  <select className={inputStyles} required value={tierId} onChange={(event) => setTierId(event.target.value)}>
                    {tiers.map((tier) => {
                      const price = priceOf(tier);
                      return (
                        <option key={tier.id} value={tier.id}>
                          {tier.label}{price ? ` — ${price}` : ""}
                        </option>
                      );
                    })}
                  </select>
                </label>
                {tierId === "meal" && (
                  <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-zinc-800">
                    Dietary restrictions (optional)
                    <input
                      className={inputStyles}
                      type="text"
                      name="dietaryRestrictions"
                      maxLength={500}
                      placeholder="Allergies or dietary needs"
                    />
                  </label>
                )}
              </div>
            </fieldset>

            {error && (
              <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800" role="alert" aria-live="polite">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading || companies.length === 0}
              className="mt-7 w-full rounded-xl bg-blue-900 px-6 py-4 text-base font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving registration…" : `Continue to payment${selectedPrice ? ` — ${selectedPrice}` : ""}`}
            </button>
          </form>
        </div>
      </Section>
    </Layout>
  );
}

export default NetworkRegister;
