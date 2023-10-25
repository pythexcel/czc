import bgImage from '../assets/zappychatImg.jpg';


function BackgroundSection({ children }) {
    return (
        <div
            className="bg-cover bg-no-repeat h-[65vh] -mt-[5%]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
        {children}
        </div>
    )
}

export default BackgroundSection;
