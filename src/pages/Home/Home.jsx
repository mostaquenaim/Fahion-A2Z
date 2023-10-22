import { useContext } from "react";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";
import Banner from "../../Components/Home/Banner";
import Brands from "../../Components/Home/Brands";
import Gallery from "../../Components/Home/Gallery/Gallery";
import Trending from "../../Components/Home/Trending/Trending";

const Home = () => {
    // const [theme, setTheme] = useState('luxury'); // Default theme is 'luxury'

    // // Function to toggle the theme
    // const toggleTheme = () => {
    //     if (theme === 'luxury') {
    //         setTheme('cupcake');
    //     } else {
    //         setTheme('luxury');
    //     }
    // };

    const {theme} = useContext(ThemeContext)
    return (

        <div data-theme={theme} >
            <Banner></Banner>
            <Gallery></Gallery>
            <Brands></Brands>
            <Trending></Trending>

        </div>
    );
};

export default Home;