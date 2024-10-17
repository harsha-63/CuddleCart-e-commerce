import babyImage from '../assets/baby.jpg';
import Collection from './Collection';


const Home = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full pb-24">
                <div className="w-full md:w-6/7 mt-4 p-6 text-black font-serif text-center">
                    <h1 className="text-4xl md:text-6xl font-medium leading-snug">
                        Welcome to CuddleCart
                    </h1>
                    <h2 className="text-lg md:text-2xl mt-2">
                        – Where Every Little Moment Matters!
                    </h2>
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                    <img
                        src={babyImage}
                        alt="Baby Products"
                        className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover"
                    />
                </div>
            </div>
            <Collection />
        </>
    );
};

export default Home;