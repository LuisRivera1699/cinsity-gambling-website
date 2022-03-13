import Footer from "./Footer";
import Header from "./Header";
import "./index.css";

const MainLayout = (props) => {
    return(
        <div>
            <Header/>
            {props.children}
            <Footer/>            
        </div>
    );
}

export default MainLayout;