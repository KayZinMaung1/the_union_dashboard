import {
    Button
} from "antd";
const IconButton = ({ icon, onClick, bgColor ,text=""}) => {
    return (
        <Button icon={icon} size="small" style={{ backgroundColor: bgColor, color: "white", borderRadius: "5px" }} onClick={onClick} >{text}</Button>
    );
}
export default IconButton;