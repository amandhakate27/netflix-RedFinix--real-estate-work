const FloatingLabelInput = ({ placeholder, type = "text" }) => {
    return (
        <div className="relative flex-1">
            <input
                type={type}
                className="peer w-full rounded border border-white/40 bg-white/2.5 px-4 pb-2 pt-6 text-sm text-white outline-none sm:px-5 sm:text-base md:text-base"
                placeholder=" "
            />
            <label className="absolute left-4 top-4 text-sm text-white/60 transition-all duration-200
                peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-white/80
                peer-[:not(:placeholder-shown)]:top-1.5
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:text-white/80
                sm:left-5">
                {placeholder}
            </label>
        </div>
    );
};

export default FloatingLabelInput;
