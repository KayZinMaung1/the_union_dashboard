import React, { useState } from "react";
// ant design styles
import { Layout, Menu, Avatar, Space, Popover, Button, Typography } from "antd";
import "antd/dist/antd.css";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ant design icons
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import ShowStates from "../pages/state/ShowStates";
import ShowDistrcts from "../pages/district/ShowDistricts";
import ShowTownships from "../pages/township/ShowTownships";
import showUsers from "../pages/user/ShowUsers";
import ShowDistricts from "../pages/district/ShowDistricts";
import CreateState from "../pages/state/CreateState";
import EditState from "../pages/state/EditState";
import CreateDistrict from "../pages/district/CreateDistrict";
import EditDistrict from "../pages/district/EditDistrict";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const text = (
    <Title level={4} style={{ textAlign: "center" }}>
        Profile
    </Title>
);

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const content = (
        <Space direction="vertical" style={{ textAlign: "center", width: "100%" }}>
            <Title level={5}>User Name</Title>
            <Button danger onClick={() => { }} size="small">
                Logout
            </Button>
        </Space>
    );


    return (
        <Layout>
            <Header
                style={{ paddingTop: "13px", backgroundColor: "var(--primary-color)" }}
            >
                <Button
                    style={{
                        float: "left",
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)",
                        marginRight: "3px",
                    }}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        { style: { color: "#ffffff" } }
                    )}
                </Button>
                <Popover
                    placement="bottom"
                    content={content}
                    title={text}
                    trigger="click"
                >
                    <Avatar
                        style={{ float: "right", backgroundColor: "var(--primary-color)" }}
                        icon={<UserOutlined />}
                        size="large"
                    />
                </Popover>
                <Title style={{ color: "#ffffff" }} level={3} onClick={() => navigate("/")}>
                    THE UNION
                </Title>
            </Header>
            <Layout>
                <Sider
                    collapsed={collapsed}
                    style={{ backgroundColor: "var(--white-color)" }}
                >
                    <Menu mode="inline">
                        <Menu.Item
                            key="StateList"
                        >
                            <Link to="/admin/show-states">State List</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="DistrictList"
                        >
                            <Link to="/admin/show-districts">District List</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="TownshipList"
                        >
                            <Link to="/admin/show-townships">Township List</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="UserList"
                        >
                            <Link to="/admin/show-users">User List</Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ minHeight: "520px" }}>
                        <Routes>
                            <Route path="show-states" element={<ShowStates />} />
                            <Route path="create-state" element={<CreateState />} />
                            <Route path="edit-states/:id" element={<EditState />} />

                            <Route path="show-districts" element={<ShowDistricts />} />
                            <Route path="create-district" element={<CreateDistrict />} />
                            <Route path="edit-districts/:id" element={<EditDistrict />} />


                            <Route path="show-townships" element={<ShowTownships />} />

                            <Route path="show-users" element={<showUsers />} />
                        </Routes>
                    </Content>
                    <Footer
                        style={{
                            backgroundColor: "var(--white-color)",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "var(--primary-color)",
                        }}
                    ></Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Admin;
