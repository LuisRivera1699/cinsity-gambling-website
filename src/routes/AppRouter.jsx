import { BrowserRouter, Route, Routes } from "react-router-dom";
import FAQs from "../pages/FAQs";
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Rules from "../pages/Rules";

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* HOME PAGE */}
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                {/* RULES */}
                <Route path="/rules/:game" element={<Rules/>}/>
                {/* RESOURCES */}
                <Route path="/resources/:res" element={<Resources/>}/>
                {/* FAQS */}
                <Route path="/faqs" element={<FAQs/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;