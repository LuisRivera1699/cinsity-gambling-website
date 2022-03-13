import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import { RC_CONTENT } from "./utils/content.jsx";
import "./index.css";

const RCLayout = (props) => {

    const { game, res } = useParams();
    const [content, setContent] = useState();

    useEffect(() => {
        if (game) {
            setContent(RC_CONTENT[game]);
        } else {
            setContent(RC_CONTENT[res]);
        }
    }, [game, res, setContent]);

    if (content === undefined) {
        return (
            <MainLayout/>
        );
    }

    return (
        <MainLayout>
            <div className={`rc-banner ${game ? game : res}`}>
                {console.log(content)}
                {
                    content.rules ?
                    <h1>
                        <span className="text-blue">{content.title} </span>
                        <span className="text-pink">Rules</span>       
                    </h1> 
                    :
                    <h1>
                        <span className="text-blue">{content.blue} </span>
                        <span>{content.white} </span>
                        <span className="text-pink">{content.pink}</span>   
                    </h1>
                }
            </div>
            <div className="page-section rc-content">
                <div className="rc-text">
                    {
                        content.content ?
                        content.content.map((v, i) => {
                            return <div key={i}>{v}</div>;
                        }) :
                        RC_CONTENT.none.content.map((v, i) => {
                            return <div key={i}>{v}</div>;
                        })
                    }
                </div>
                {props.children}
            </div>
        </MainLayout>
    );
}

export default RCLayout;