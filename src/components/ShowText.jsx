import { Typography } from "antd";
const { Text } = Typography;
const ShowText = ({ text, color = "var(--black-color)" }) => {
    return (
        <Text style={{ padding: "10px", fontSize: "14px", color: color }}> {text} </Text>
    );
}
export default ShowText;