import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import FloatingLabelInput from "./common/FloatingLableInput.jsx";

const BottomCtaSection = () => {
    const desktopEmailRef = useRef(null);
    const mobileEmailRef = useRef(null);

    const focusIfEmpty = (inputRef) => {
        if (!inputRef.current) return;
        if (!inputRef.current.value.trim()) {
            inputRef.current.focus();
        }
    };

    return (
        <section className="bg-black px-4 pb-16 pt-2 sm:px-8 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-7xl">
                <p className="max-w-[28rem] text-left text-[1.05rem] font-medium leading-10 text-white sm:max-w-none sm:text-center sm:text-base md:text-lg">
                    Ready to explore? Enter your email to create or restart your membership.
                </p>

                <div className="mt-5 w-full max-w-xs sm:mx-auto sm:mt-5 sm:max-w-xl md:max-w-2xl">
                    <div className="hidden sm:flex sm:flex-row sm:items-stretch sm:gap-3">
                        <div className="flex-1">
                            <FloatingLabelInput ref={desktopEmailRef} placeholder="Email address" type="email" />
                        </div>
                        <button
                            type="button"
                            onClick={() => focusIfEmpty(desktopEmailRef)}
                            className="flex items-center justify-center gap-2 rounded bg-[#E50914] px-7 text-lg font-semibold text-white transition hover:bg-[#c11119] md:px-8 md:text-xl"
                        >
                            Get Started
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="flex flex-col items-start gap-4 sm:hidden">
                        <div className="w-full">
                            <FloatingLabelInput ref={mobileEmailRef} placeholder="Email address" type="email" />
                        </div>
                        <button
                            type="button"
                            onClick={() => focusIfEmpty(mobileEmailRef)}
                            className="flex items-center justify-center gap-2 rounded bg-[#E50914] px-5 py-3 text-[1.05rem] font-semibold text-white transition hover:bg-[#c11119]"
                        >
                            Get Started
                            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BottomCtaSection;
