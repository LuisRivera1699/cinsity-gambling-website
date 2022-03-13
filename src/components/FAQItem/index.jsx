import { useEffect, useState } from "react";
import "./index.css";

const FAQItem = (props) => {

    const [isHover, setIsHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleHover = () => {
        setIsHover(!isHover);
    }

    const getColor = () => {
        if (isSelected) {
            return "pink";
        }

        if (isHover) {
            return "blue";
        }
        return "";
    }

    const handleClick = () => {
        setIsSelected(!isSelected);
    }

    useEffect(() => {

    }, [isSelected]);

    return(
        <div className="faq-container">
            <div className={`question ${getColor()}`} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleClick}>
                <h4>{props.question}</h4>
            </div>
            <div className="answer" hidden={!isSelected}>
                <p>{props.answer}</p>
            </div>
        </div>
    );
}

export default FAQItem;