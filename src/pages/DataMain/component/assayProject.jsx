import { Button, message, Input, Modal, Form, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import ProTable from '@ant-design/pro-table';

import {
  getMaterialAssayProjectList,
  addMaterialAssayProject,
  updateMaterialAssayProject,
  removeMaterialAssayProject,
} from '@/services';

const AssayProject = () => {
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
    const res = await removeMaterialAssayProject({ id: record.id });
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
    const func = updateId ? updateMaterialAssayProject : addMaterialAssayProject;
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
    }
    setSubmitting(false);
  };

  const columns = [
    {
      title: (
        <FormattedMessage id="pages.dataMain.checkProjectCode" defaultMessage="检测项目编码" />
      ),
      dataIndex: 'inspectionCode',
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.dataMain.checkProjectDesc" defaultMessage="检测项目描述" />
      ),
      dataIndex: 'inspectionDesc',
    },
    {
      title: <FormattedMessage id="pages.remark" defaultMessage="备注" />,
      dataIndex: 'inspectionRemark',
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
    const res = await getMaterialAssayProjectList({
      ...params,
    });
    if (res) {
      return res;
    }
  };

  return (
    <>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.dataMain.materialAssayProjectSetting',
          defaultMessage: '化验项目设置',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
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
            label={
              <FormattedMessage
                id="pages.dataMain.checkProjectCode"
                defaultMessage="检测项目编码"
              />
            }
            name="inspectionCode"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.dataMain.p_checkProjectCode' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <FormattedMessage
                id="pages.dataMain.checkProjectDesc"
                defaultMessage="检测项目描述"
              />
            }
            name="inspectionDesc"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.dataMain.p_checkProjectDesc' }),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<FormattedMessage id="pages.remark" defaultMessage="备注" />}
            name="inspectionRemark"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AssayProject;
