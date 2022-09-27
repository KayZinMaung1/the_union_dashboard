import { Typography } from "antd";
const {Text} = Typography;
const Label = ({text}) => {
    return (
        <Text
            style={{
                backgroundColor: "var(--label-color)",
                padding: "6px",
                color: "var(--white-color)",
                borderRadius: "3px"
            }}
        >
            {text}
        </Text>
    );
}
export default Label;