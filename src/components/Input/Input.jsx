export const Input = ({ onChange, label, placeholder, className}) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
                {label}
            </label>
            <input onChange={(e) => onChange(e, label)} id={label} type="text" placeholder={placeholder} className={className === undefined
                ? "shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                : className} />
        </div>
    );
}