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
import { useSelector, useDispatch } from "react-redux";
import { editState, getState } from "../../store/actions";
import { useParams } from "react-router-dom";
import { successEditMessage } from "../../utils/messages";
const { Title } = Typography;

const EditState = () => {
    const [form] = Form.useForm();
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const state = useSelector((state) => state.state.state);

    const dispatch = useDispatch();

    const params = useParams();
    const id = params.id;


    useEffect(() => {
        dispatch(getState(id))
    }, [dispatch, id])

    useEffect(() => {
        error.message !== null && message.error(error.message);

        return () => error.message;
    }, [error.message]);

    useEffect(() => {
        if (status.success) {
            message.success(successEditMessage);
        }

        return () => status.success;
    }, [form, status.success]);

    useEffect(() => {
        form.setFieldsValue({ name: state.name });
    }, [form, state])

    const onFinish = async (values) => {
        await dispatch(editState(id, values));
    }

    return (
        <Spin spinning={status.loading}>
            <Layout style={{ margin: "20px 40px" }} >
                <Space direction="vertical">
                    <Title level={3}>
                        "Edit State's Name"
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
                                    label="State's Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter state's name!"
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter State's Name"
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

export default EditState;
