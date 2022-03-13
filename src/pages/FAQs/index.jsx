import FAQItem from "../../components/FAQItem";
import MainLayout from "../../components/MainLayout";
import "./index.css";

const FAQs = () => {
    return(
        <MainLayout>
            <div className="page-section faqs">
                <h1 className="wo-banner-h1">    
                    <span className="text-blue">FA</span>
                    <span className="text-pink">Qs</span>
                </h1>
                <div className="faqs-container">
                    <FAQItem
                        question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a. Mauris dapibus ante eu turpis pharetra, et commodo tellus eleifend. Sed vestibulum elit in."
                    />
                    <FAQItem
                        question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a. Mauris dapibus ante eu turpis pharetra, et commodo tellus eleifend. Sed vestibulum elit in."
                    />
                    <FAQItem
                        question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a. Mauris dapibus ante eu turpis pharetra, et commodo tellus eleifend. Sed vestibulum elit in."
                    />
                    <FAQItem
                        question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a. Mauris dapibus ante eu turpis pharetra, et commodo tellus eleifend. Sed vestibulum elit in."
                    />
                    <FAQItem
                        question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a. Mauris dapibus ante eu turpis pharetra, et commodo tellus eleifend. Sed vestibulum elit in."
                    />
                </div>
            </div>
        </MainLayout>
    );
}

export default FAQs;