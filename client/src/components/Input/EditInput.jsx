export const EditInput = ({ onChange, label, value, placeholder, id, className}) => {
    return (
        <div>
            {label && <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>}
            <input onChange={(e) => onChange(e, id)} id={id} type="text" placeholder={placeholder} value={value} className={className === undefined
                ? "shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                : className} />
        </div>
    );
}