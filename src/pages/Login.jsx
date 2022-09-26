import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, Spin, message } from "antd";
import Layout from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/actions";
const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        error.message !== null && message.error(error.message);
        return () => error.message;
    }, [error.message]);

    const onFinish = async (values) => {
        await dispatch(authUser(values));
    }

    return (
        <Spin spinning={status.loading}>
            <Layout
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Space direction="vertical" size="middle">
                    <Title style={{ textAlign: "center" }}>The Union</Title>

                    <Form form={form} className="login-form" onFinish={onFinish}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email!",
                                },
                            ]}
                        >
                            <Input
                                name="email"
                                placeholder="Enter your email!"
                                size="large"
                                style={{ borderRadius: "10px" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                name="password"
                                placeholder="Enter your password!"
                                size="large"
                                style={{ borderRadius: "10px" }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                size="large"
                                style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "var(--white-color)",
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Layout>
        </Spin>

    );
};

export default Login;
