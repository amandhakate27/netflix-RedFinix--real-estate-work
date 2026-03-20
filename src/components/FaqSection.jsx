import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqItems = [
    {
        question: "How does Redfinix help me find the right property?",
        answer:
            "Redfinix curates verified listings, premium developments, and trusted neighborhood insights so you can compare options faster and shortlist homes with confidence.",
    },
    {
        question: "Can I schedule a site visit directly from the platform?",
        answer:
            "Yes. You can connect with our team to schedule property visits, coordinate timings, and explore shortlisted homes without losing track of your preferences.",
    },
    {
        question: "Do you only feature luxury properties?",
        answer:
            "No. While Redfinix highlights luxury and premium spaces, we also showcase apartments, family homes, investment-ready properties, and new developments across different budgets.",
    },
    {
        question: "Are the listings and agents verified?",
        answer:
            "We focus on trusted listings and verified agent connections so you spend less time filtering unreliable information and more time exploring real opportunities.",
    },
    {
        question: "Can Redfinix support investors as well as homebuyers?",
        answer:
            "Absolutely. Whether you're searching for your next residence or evaluating high-potential investments, Redfinix helps you compare locations, pricing, and property value clearly.",
    },
    {
        question: "What happens after I choose a property I like?",
        answer:
            "Once you shortlist a property, we help you take the next step through guided follow-ups, visit coordination, and smoother conversations with trusted representatives.",
    },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (index) => {
        setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
    };

    return (
        <section className="bg-black px-4 pb-4 pt-2 sm:px-8 md:px-12 lg:px-16 mb-10">
            <div className="mx-auto w-full max-w-7xl">
                <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl sm:font-semibold">
                    Frequently Asked Questions
                </h2>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                    {faqItems.map(({ question, answer }, index) => {
                        const isOpen = index === openIndex;

                        return (
                            <div key={question} className="overflow-hidden bg-[#2d2d2d] transition-colors duration-200">
                                <button
                                    type="button"
                                    onClick={() => toggleItem(index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg text-white sm:px-8 sm:py-6 sm:text-2xl hover:bg-[#414141] transition-colors duration-200"
                                    aria-expanded={isOpen}
                                >
                                    <span>{question}</span>
                                    {isOpen ? (
                                        <X className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" strokeWidth={1.75} />
                                    ) : (
                                        <Plus className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" strokeWidth={1.75} />
                                    )}
                                </button>

                                <div
                                    className={`transition-all duration-400 ease-in-out border-t border-black/70 px-6 text-lg text-white sm:px-8 sm:text-2xl overflow-hidden w-full bg-[#2d2d2d] ${isOpen ? 'max-h-[1000px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                    style={{
                                        transitionProperty: 'max-height, opacity, padding',
                                    }}
                                >
                                    <p className="w-full m-0 p-0">{answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
