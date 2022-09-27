import { Button } from "antd";
const MediumButton = ({ icon, text, bgColor , onClick }) => {
    return (
        <Button
            style={{
                backgroundColor: bgColor,
                color: "var(--white-color)",
                borderRadius: "5px",
            }}
            size="medium"
            onClick={onClick}
        >
            {icon}
            {text}
        </Button>
    );
}
export default MediumButton;