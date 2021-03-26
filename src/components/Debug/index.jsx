/**
 * Debug组件系列，用于本地化调试各种开关
 * @author liyang
 * 2021/03/01
 */

import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import { DB } from '@/utils/DB';
import Cookie from '@/utils/Cookie';
const CollectionCreateForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const onCreate = (fields) => {
    const { auth, userInfo = '{}' } = fields;
    DB.set('userInfo', JSON.parse(userInfo));
    Cookie.setToken(auth);
    onCancel();
  };
  return (
    <Modal
      visible={visible}
      title="本地调试录入token"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item name="auth" label="auth">
          <Input placeholder={`粘贴work-dev.gaojin.com.cn域名下的cookit auth`} />
        </Form.Item>
        <Form.Item name="userInfo" label="userInfo">
          <Input.TextArea placeholder={`粘贴work-dev.gaojin.com.cn域名下的localStorage userInfo`} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const DebugInsertToken = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        // type="primary"
        onClick={() => {
          setVisible(true);
        }}
        style={{ position: 'fixed', right: '10px', top: '10px' }}
      >
        <BugOutlined />
        录入token{' '}
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
