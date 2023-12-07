

const Icons = ({
    handleClick,
    icon,
    text,
    textClassName,
    containerClassName
}) => {
    return (
        <div
            onClick={handleClick}
            className={`${containerClassName} border border-gray-400 p-2 rounded-md text-white shadow-lg cursor-pointer`}>
            {icon}
            <span
                className={`${textClassName}`}>{text}</span>
        </div>
    );
};

export default Icons;
