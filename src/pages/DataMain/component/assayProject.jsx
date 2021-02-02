import { Button, message, Input, Modal, Form } from 'antd';
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
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: (
        <FormattedMessage id="pages.dataMain.checkProjectCode" defaultMessage="检测项目编码" />
      ),
      dataIndex: 'checkProjectCode',
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.dataMain.checkProjectDesc" defaultMessage="检测项目描述" />
      ),
      dataIndex: 'checkProjectDesc',
    },
    {
      title: <FormattedMessage id="pages.remark" defaultMessage="备注" />,
      dataIndex: 'remark',
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
          checkProjectCode: 1,
          checkProjectDesc: '阿里',
          remark: '噗呲噗呲',
        },
      ],
    };
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
        rowKey="key"
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
            name="checkProjectCode"
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
            name="checkProjectDesc"
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
            name="remark"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AssayProject;
