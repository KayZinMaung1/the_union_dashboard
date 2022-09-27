import React, { useEffect } from "react";
import {
    Form,
    Typography,
    Space,
    Spin,
    Row,
    Col,
    Input,
    message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { SaveOutlined } from "@ant-design/icons";
import LargeButton from "../../components/LargeButton";
import { createState } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { successCreateMessage } from "../../utils/messages";
const { Title } = Typography;

const CreateState = () => {
    const [form] = Form.useForm();
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        error.message !== null && message.error(error.message);

        return () => error.message;
    }, [error.message]);

    useEffect(() => {
        if (status.success) {
            form.resetFields();
            message.success(successCreateMessage);
        }

        return () => status.success;
    }, [form, status.success]);

    const onFinish = async (values) => {
        await dispatch(createState(values));
    }

    return (
        <Spin spinning={status.loading}>
            <Layout style={{ margin: "20px 40px" }} >
                <Space direction="vertical">
                    <Title level={3}>
                        "Create a State"
                    </Title>

                    <Row >
                        <Col span={12} >
                            <Form
                                colon={false}
                                labelCol={{
                                    xl: {
                                        span: 8,
                                    },
                                }}
                                wrapperCol={{
                                    xl: {
                                        span: 24,
                                    },
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                form={form}
                                layout={"vertical"}
                            >
                                <Form.Item
                                    name="name"
                                    label="State Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter state's name",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="State's Name"
                                        style={{ borderRadius: "10px" }}
                                        size="large"
                                    />
                                </Form.Item>


                                <Form.Item style={{ textAlign: "right" }}>
                                    <LargeButton icon={<SaveOutlined />} text="Save" />
                                </Form.Item>
                            </Form>
                        </Col>


                        <Col span={12}>

                        </Col>
                    </Row>


                </Space>


            </Layout>
        </Spin>
    );
};

export default CreateState;
