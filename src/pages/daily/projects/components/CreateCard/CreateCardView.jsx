import React, { useState } from 'react';
import { Button, Modal, Form, Input, Typography, Space, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import { HistoryOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

const teamMock = [
  { id: '1', userName: '李洋' },
  { id: '2', userName: '刘自杰' },
  { id: '3', userName: '周祖国' },
  { id: '4', userName: '黄磊' },
  { id: '5', userName: '毛俊钦' },
];
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建项目"
      // okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={360}
      footer={null}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
        <HistoryOutlined style={{ fontSize: '32px', color: '#666' }} />
        <Text strong style={{ margin: '5px 0 20px' }}>
          创建标准化事务工作流
        </Text>
      </Space>

      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="项目名称"
          rules={[{ required: true, message: '项目名称必填' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="项目简介">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="userId"
          label="选择成员"
          rules={[{ required: true, message: '项目成员必选' }]}
        >
          <Select placeholder="请选择一名成员" allowClear>
            {teamMock.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.userName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            确认创建
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateCardView = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  const handleCreateProject = () => {
    setVisible(true);
  };
  return (
    <div>
      <Button type="dashed" className={styles.newButton} onClick={handleCreateProject}>
        <PlusOutlined /> 新建项目
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default CreateCardView;
