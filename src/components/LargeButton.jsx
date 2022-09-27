import { Button } from "antd";
const LargeButton = ({icon ,  text }) => {
    return (
        <Button
            style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
            }}
            size="large"
            htmlType="submit"
        >
           {icon}
            {text}
        </Button>
    );
}
export default LargeButton;