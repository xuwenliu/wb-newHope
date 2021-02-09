import { Button, message, Input, Modal, Form, Checkbox, Tag, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { getUserList, addUser, updateUser, removeUser } from '@/services';
import { getRoutes } from '@/utils/utils';

const Manger = () => {
  const initMenus = getRoutes();
  const intl = useIntl();
  const actionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [roles, setRoles] = useState(initMenus);

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
      menu: values.menu.join(),
    });
    if (res) {
      message.success(
        intl.formatMessage({
          id: 'pages.success',
        }),
      );
      handleCancel();
      actionRef?.current?.reload();
    }
    setSubmitting(false);
  };

  const columns = [
    {
      title: <FormattedMessage id="pages.user.userName" defaultMessage="用户名称" />,
      dataIndex: 'userAccount',
    },
    {
      title: <FormattedMessage id="pages.user.password" defaultMessage="用户密码" />,
      dataIndex: 'password',
      search: false,
    },

    {
      title: <FormattedMessage id="pages.user.role" defaultMessage="可使用模块" />,
      dataIndex: 'menu',
      search: false,
      render: (_, record) => {
        const menus = record.menu.split(',');
        let menuNames = [];
        initMenus.forEach((item) => {
          if (menus.includes(item.value.toString())) {
            menuNames.push(item.label);
          }
        });

        return menuNames.map((item) => <Tag key={item}>{item}</Tag>);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="update" size="small" onClick={() => handleUpdate(record)} type="success">
          <FormattedMessage id="pages.update" defaultMessage="修改" />
        </Button>,
        <Popconfirm
          key="delete"
          title={<FormattedMessage id="pages.delete_confirm" />}
          onConfirm={() => handleRemove(record)}
        >
          <Button size="small" type="danger">
            <FormattedMessage id="pages.delete" defaultMessage="删除" />
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const queryList = async (params) => {
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
        rowKey="id"
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
            name="userAccount"
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
            name="menu"
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
