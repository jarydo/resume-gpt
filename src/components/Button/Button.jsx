export const Button = ({ onClick, children, className}) => {
    return (
        <button onClick={onClick} className={className === undefined
            ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            : className}>
            {children}
        </button>
    );
}