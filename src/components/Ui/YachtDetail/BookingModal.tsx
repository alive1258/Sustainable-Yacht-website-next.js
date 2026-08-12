"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Landmark,
  Lock,
  Users,
  Wallet,
  X,
} from "lucide-react";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: Wallet },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
] as const;

type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

interface BookingModalProps {
  yachtName: string;
  heroImage: string;
  priceFrom: string;
  priceUnit: string;
  triggerLabel?: string;
  triggerClassName: string;
}

// TODO: no backend/payment gateway yet — submitting only shows a
// confirmation state. Wire this up to a real booking/CRM + deposit
// invoicing flow once one exists.
const BookingModal = ({
  yachtName,
  heroImage,
  priceFrom,
  priceUnit,
  triggerLabel = "Send an Inquiry",
  triggerClassName,
}: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("card");

  /* lock background scroll while the modal is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setSubmitted(false);
    setPaymentMethod("card");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
        <ArrowRight size={16} />
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-900/70 backdrop-blur-md" />

            <div className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl md:grid-cols-2 md:overflow-hidden">
              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-900 shadow-sm transition hover:bg-white"
              >
                <X size={16} />
              </button>

              {/* IMAGE SIDE */}
              <div className="relative hidden min-h-[220px] md:block">
                <Image
                  src={heroImage}
                  alt={yachtName}
                  fill
                  sizes="50vw"
                  className=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    Booking Request
                  </p>
                  <p className="mt-1 text-xl font-bold">{yachtName}</p>
                </div>
              </div>

              {/* FORM SIDE */}
              <div className="p-6 sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <CheckCircle2 size={32} className="text-brand-600" />
                    <h3 className="text-lg font-bold text-brand-900">
                      Inquiry Sent
                    </h3>
                    <p className="max-w-xs text-sm text-brand-900/60">
                      A charter specialist will confirm availability for{" "}
                      {yachtName} and follow up with deposit details within one
                      business day.
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                      Book This Yacht
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-brand-900">
                      {yachtName}
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            Full Name
                          </span>
                          <input
                            type="text"
                            required
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            Email
                          </span>
                          <input
                            type="email"
                            required
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            <CalendarDays size={13} />
                            Check-In
                          </span>
                          <input
                            type="date"
                            required
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            <CalendarDays size={13} />
                            Check-Out
                          </span>
                          <input
                            type="date"
                            required
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          <Users size={13} />
                          Guests
                        </span>
                        <input
                          type="number"
                          min={1}
                          required
                          className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          Message (optional)
                        </span>
                        <textarea
                          rows={3}
                          placeholder="Anything else we should know?"
                          className="w-full resize-none rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                        />
                      </label>

                      {/* PAYMENT METHOD */}
                      <div>
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          Payment Method
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {PAYMENT_METHODS.map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setPaymentMethod(method.id)}
                              className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                                paymentMethod === method.id
                                  ? "border-brand-600 bg-brand-50 text-brand-700"
                                  : "border-brand-900/10 text-brand-900/60 hover:border-brand-900/20"
                              }`}
                            >
                              <method.icon size={16} />
                              {method.label}
                            </button>
                          ))}
                        </div>

                        {paymentMethod === "card" && (
                          <div className="mt-4 space-y-4">
                            <label className="block">
                              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                                Name on Card
                              </span>
                              <input
                                type="text"
                                required
                                autoComplete="cc-name"
                                className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                                Card Number
                              </span>
                              <div className="relative">
                                <CreditCard
                                  size={15}
                                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-900/40"
                                />
                                <input
                                  type="text"
                                  required
                                  inputMode="numeric"
                                  autoComplete="cc-number"
                                  placeholder="1234 1234 1234 1234"
                                  maxLength={19}
                                  className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 py-2.5 pl-9 pr-3 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                                />
                              </div>
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                                  Expiry
                                </span>
                                <input
                                  type="text"
                                  required
                                  inputMode="numeric"
                                  autoComplete="cc-exp"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                                  CVC
                                </span>
                                <input
                                  type="text"
                                  required
                                  inputMode="numeric"
                                  autoComplete="cc-csc"
                                  placeholder="CVC"
                                  maxLength={4}
                                  className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                                />
                              </label>
                            </div>

                            <p className="flex items-center gap-1.5 text-[11px] text-brand-900/50">
                              <Lock size={11} className="shrink-0" />
                              Preview only — card details are never
                              transmitted or stored. Secure Stripe checkout
                              is coming soon.
                            </p>
                          </div>
                        )}

                        {paymentMethod === "paypal" && (
                          <div className="mt-4 rounded-lg border border-brand-900/10 bg-brand-50/50 p-4 text-sm text-brand-900/60">
                            You&apos;ll be redirected to PayPal to complete
                            payment securely once online payment is enabled.
                          </div>
                        )}

                        {paymentMethod === "bank" && (
                          <div className="mt-4 rounded-lg border border-brand-900/10 bg-brand-50/50 p-4 text-sm text-brand-900/60">
                            Bank transfer instructions are included in your
                            deposit invoice after our team confirms
                            availability.
                          </div>
                        )}
                      </div>

                      {/* DEPOSIT & PAYMENT SUMMARY */}
                      <div className="rounded-xl border border-brand-900/10 bg-brand-50/50 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          <CreditCard size={14} className="text-gold-500" />
                          Deposit &amp; Payment
                        </div>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">
                              Charter Rate
                            </span>
                            <span className="font-semibold text-brand-900">
                              {priceFrom} {priceUnit}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">
                              Deposit to Confirm
                            </span>
                            <span className="font-semibold text-brand-900">
                              30% — invoiced after inquiry
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">
                              Balance Due
                            </span>
                            <span className="font-semibold text-brand-900">
                              Before departure
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-[11px] leading-relaxed text-brand-900/50">
                          No payment is collected here. Submitting sends a
                          booking request — our team confirms availability and
                          sends a secure deposit invoice separately.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
                      >
                        Confirm Booking Request
                        <ArrowRight size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default BookingModal;
