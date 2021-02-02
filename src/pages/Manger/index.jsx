import { Button, message, Input, Modal, Form, Checkbox } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { getUserList, addUser, updateUser, removeUser } from '@/services';
import { getRoutes } from '@/utils/utils';

const Manger = () => {
  const intl = useIntl();
  const actionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [roles, setRoles] = useState(getRoutes());

  const [title, setTitle] = useState(
    intl.formatMessage({
      id: 'pages.add',
    }),
  );

  const [form] = Form.useForm();

  const handleAdd = () => {
    setVisible(true);
    setTitle(
      intl.formatMessage({
        id: 'pages.add',
      }),
    );
  };
  const handleUpdate = (record) => {
    setVisible(true);
    setTitle(
      intl.formatMessage({
        id: 'pages.update',
      }),
    );
    setUpdateId(record.id);
    form.setFieldsValue(record);
  };
  const handleRemove = async (record) => {
    const res = await removeUser({ id: record.id });
    if (res) {
      message.success(
        intl.formatMessage({
          id: 'pages.success',
        }),
      );
      actionRef?.current?.reload();
    }
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setUpdateId(null);
  };

  const handleOk = async () => {
    await form.validateFields();
    let values = form.getFieldsValue();
    setSubmitting(true);
    const func = updateId ? updateUser : addUser;
    const res = await func({
      id: updateId,
      ...values,
    });
    if (res) {
      message.success(
        intl.formatMessage({
          id: 'pages.success',
        }),
      );
      handleCancel();
      actionRef?.current?.reload();
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: <FormattedMessage id="pages.user.userName" defaultMessage="用户名称" />,
      dataIndex: 'userName',
    },
    {
      title: <FormattedMessage id="pages.user.password" defaultMessage="用户密码" />,
      dataIndex: 'password',
      search: false,
    },

    {
      title: <FormattedMessage id="pages.user.role" defaultMessage="可使用模块" />,
      dataIndex: 'role',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="update" size="small" onClick={() => handleUpdate(record)} type="success">
          <FormattedMessage id="pages.update" defaultMessage="修改" />
        </Button>,
        <Button key="delete" size="small" onClick={() => handleRemove(record)} type="danger">
          <FormattedMessage id="pages.delete" defaultMessage="删除" />
        </Button>,
      ],
    },
  ];

  const queryList = async (params) => {
    return {
      data: [
        {
          id: 1001,
          userName: '哈哈哈',
          password: '123456',
          role: '1,2,3',
        },
      ],
    };
    const res = await getUserList({
      ...params,
    });
    if (res) {
      return res;
    }
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            <FormattedMessage id="pages.add" defaultMessage="增加" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryList({ ...params })}
        columns={columns}
      />

      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={submitting}
      >
        <Form form={form} labelCol={{ span: 6 }}>
          <Form.Item
            label={<FormattedMessage id="pages.user.userName" defaultMessage="用户名称" />}
            name="userName"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'pages.user.p_userName' }) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.user.password" defaultMessage="用户密码" />}
            name="password"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'pages.user.p_password' }) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.user.role" defaultMessage="可使用模块" />}
            name="role"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.user.p_role' }),
              },
            ]}
          >
            <Checkbox.Group options={roles} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Manger;
