import { Button, message, Input, Modal, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import ProTable from '@ant-design/pro-table';

import {
  getMaterialMainDataList,
  addMaterialMainData,
  updateMaterialMainData,
  removeMaterialMainData,
} from '@/services';

const Main = () => {
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
  const handleExport = () => {};
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
    const res = await removeMaterialMainData({ id: record.id });
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
    const func = updateId ? updateMaterialMainData : addMaterialMainData;
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
      title: <FormattedMessage id="pages.dataQuery.materialCode" defaultMessage="物料编码" />,
      dataIndex: 'materialCode',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataMain.mapCode" defaultMessage="映射编码" />,
      dataIndex: 'mapCode',
      search: false,
    },

    {
      title: <FormattedMessage id="pages.dataMain.materialDesc" defaultMessage="物料描述" />,
      dataIndex: 'materialDesc',
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
          materialCode: 1,
          mapCode: 200,
          materialDesc: 34,
        },
      ],
    };
    const res = await getMaterialMainDataList({
      ...params,
    });
    if (res) {
      return res;
    }
  };

  return (
    <>
      <ProTable
        style={{ marginBottom: 40 }}
        headerTitle={intl.formatMessage({
          id: 'pages.dataMain.dataMainSetting',
          defaultMessage: '物料主数据设置',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            <FormattedMessage id="pages.add" defaultMessage="增加" />
          </Button>,
          <Button key="export" onClick={handleExport}>
            <FormattedMessage id="pages.export" defaultMessage="导出" />
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
            label={<FormattedMessage id="pages.dataQuery.materialCode" defaultMessage="物料编码" />}
            name="materialCode"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.dataQuery.p_materialCode' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.dataMain.mapCode" defaultMessage="映射编码" />}
            name="mapCode"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'pages.dataMain.p_mapCode' }) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="pages.dataMain.materialDesc" defaultMessage="物料描述" />}
            name="materialDesc"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.dataMain.p_materialDesc' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Main;
