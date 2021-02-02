import { Button, message, Input, Modal, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { getDataConfigList, addDataConfig, updateDataConfig, removeDataConfig } from '@/services';

const DataConfig = () => {
  const intl = useIntl();
  const actionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updateId, setUpdateId] = useState(null);

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
    const res = await removeDataConfig({ id: record.id });
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
    const func = updateId ? updateDataConfig : addDataConfig;
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
      title: <FormattedMessage id="pages.dataConfig.code" defaultMessage="近红外编码" />,
      dataIndex: 'code',
    },
    {
      title: <FormattedMessage id="pages.dataConfig.desc" defaultMessage="近红外描述" />,
      dataIndex: 'desc',
    },

    {
      title: <FormattedMessage id="pages.dataQuery.checkPoint" defaultMessage="检测点" />,
      dataIndex: 'checkPoint',
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
          desc: 1,
          code: 200,
          checkPoint: 34,
        },
      ],
    };
    const res = await getDataConfigList({
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
            label={<FormattedMessage id="pages.dataConfig.code" defaultMessage="近红外编码" />}
            name="code"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'pages.dataConfig.p_code' }) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.dataConfig.desc" defaultMessage="近红外描述" />}
            name="desc"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'pages.dataConfig.p_desc' }) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.dataQuery.checkPoint" defaultMessage="检测点" />}
            name="desc"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.dataQuery.p_checkPoint' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default DataConfig;
