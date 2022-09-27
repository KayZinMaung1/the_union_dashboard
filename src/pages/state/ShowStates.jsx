import React, { useEffect } from "react";
import {
    Typography,
    Space,
    Row,
    Col,
    Table,
    Spin,
    Popconfirm,
    message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
    EditOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons";
import IconButton from "../../components/IconButton";
import MediumButton from "../../components/MediumButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteState, getStates } from "../../store/actions";
import { successDeleteMessage } from "../../utils/messages";
const { Title } = Typography;


const ShowStates = () => {
    const navigate = useNavigate();
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const states = useSelector((state) => state.state.states);
    const dispatch = useDispatch();

    useEffect(() => {
        error.message !== null && message.error(error.message);

        return () => error.message;
    }, [error.message]);

    useEffect(() => {
        if (status.success) {
            message.success(successDeleteMessage);
        }
        return () => status.success;
    }, [status.success]);

    useEffect(() => {
        dispatch(getStates());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await dispatch(deleteState(id));
    }
    console.log("states:", states)
    const columns = [
        {
            title: "State",
            dataIndex: "name",
        },
        {
            title: "Actions",
            dataIndex: "id",
            render: (id) => (
                <Space direction="horizontal">
                    <IconButton icon={<EditOutlined />} onClick={() => { navigate(`/admin/edit-states/${id}`) }} bgColor="var(--green-color)"> </IconButton>
                    <Popconfirm
                        title="Delete"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => { handleDelete(id) }}
                    >
                        <IconButton icon={<DeleteOutlined />} onClick={() => { }} bgColor="var(--red-color)"> </IconButton>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={status.loading}>
            <Layout style={{ margin: "20px 40px" }}>
                <Space direction="vertical" size="middle">
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 21 }} md={{ span: 18 }}>
                            <Title level={3}> State List</Title>
                        </Col>
                        <Col xl={{ span: 3 }} md={{ span: 6 }}>
                            <MediumButton icon={<PlusSquareOutlined />} text="Add New" bgColor="var(--primary-color)" onClick={() => { navigate("/admin/create-state") }} />
                        </Col>
                    </Row>

                    <Table
                        bordered
                        columns={columns}
                        pagination={{ defaultPageSize: 10 }}
                        dataSource={states}
                    />
                </Space>
            </Layout>
        </Spin>
    );
};

export default ShowStates;
