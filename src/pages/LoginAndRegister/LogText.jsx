
const LogText = ({title, desc}) => {
    return (
        <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">
                {desc}
            </p>
        </div>
    );
};

export default LogText;