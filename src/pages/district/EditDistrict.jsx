import React, { useEffect } from "react";
import {
    Form,
    Typography,
    Space,
    Spin,
    Row,
    Col,
    Input,
    message,
    Select,

} from "antd";
import Layout from "antd/lib/layout/layout";
import { SaveOutlined } from "@ant-design/icons";
import LargeButton from "../../components/LargeButton";
import { editDistrict, getDistrict, getDistricts, getStates } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { successEditMessage } from "../../utils/messages";
import { useParams } from "react-router-dom";
const { Title } = Typography;
const { Option } = Select;
const EditDistrict = () => {
    const [form] = Form.useForm();
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const states = useSelector((state) => state.state.states);
    const district = useSelector((state) => state.district.district);
    const districts = useSelector((state) => state.district.districts);

    const dispatch = useDispatch();

    const params = useParams();
    const id = params.id;


    useEffect(() => {
        dispatch(getDistrict(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getStates());
        dispatch(getDistricts());
    }, [dispatch])

    useEffect(() => {
        error.message !== null && message.error(error.message);

        return () => error.message;
    }, [error.message]);

    useEffect(() => {
        if (status.success) {
            form.resetFields();
            message.success(successEditMessage);
        }

        return () => status.success;
    }, [form, status.success]);

    useEffect(() => {
        form.setFieldsValue({ name: district.name });
        form.setFieldsValue({ state_id: district.state });
    }, [form, district])

    const onFinish = async (values) => {
        if (typeof values.state_id === 'string') {
            const index = districts.find((district) => district.state === values.state_id);
            values = {
                ...values,
                state_id: districts[index]
            }
        }

        await dispatch(editDistrict(id, values));
    }

    return (
        <Spin spinning={status.loading}>
            <Layout style={{ margin: "20px 40px" }} >
                <Space direction="vertical">
                    <Title level={3}>
                        "Edit District"
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
                                    label="District Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter district's name",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="District's Name"
                                        style={{ borderRadius: "10px" }}
                                        size="large"
                                    />

                                </Form.Item>
                                <Form.Item
                                    name="state_id"
                                    label="State"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please choose a state!",
                                        },
                                    ]}
                                >

                                    <Select
                                        showSearch
                                        placeholder="Choose a state"
                                        optionFilterProp="children"
                                        allowClear={true}
                                        size="large"
                                        style={{ borderRadius: "10px" }}
                                    >

                                        {states.map((state) => (
                                            <Option value={state.id} key={state.id}>
                                                {state.name}
                                            </Option>
                                        ))}

                                    </Select>

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

export default EditDistrict;
