import Image from "next/image";
import type { ApiResponse } from "@/src/types/axios";
import type { QuestionAnswer } from "@/src/redux/api/questionAnswerApi";
import FaqAccordion from "./FaqAccordion";

async function getActiveFaqs(): Promise<QuestionAnswer[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/question-answers/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<QuestionAnswer[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const FaqSection = async () => {
  const faqs = await getActiveFaqs();

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Good to Know
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[480px]">
            <Image
              src="/images/experiences/exp-dubai-tour.avif"
              alt="Guests relaxing aboard an Eco Yachts charter"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
