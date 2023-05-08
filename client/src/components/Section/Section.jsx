export const Section = ({ title, children }) => {
    return (
        <div>
            <h2>{title}</h2>
            <hr />
            <div>
                {children}
            </div>
        </div>
    );
}