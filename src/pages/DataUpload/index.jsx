import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { getDataQueryList } from '@/services';
import moment from 'moment';

const today = [
  moment(`${moment().format('YYYY-MM-DD')} 00:00:00`),
  moment(`${moment().format('YYYY-MM-DD')} 23:59:59`),
];
const DataUpload = () => {
  const intl = useIntl();
  const actionRef = useRef(null);
  const columns = [
    {
      title: <FormattedMessage id="pages.dataQuery.checkPoint" defaultMessage="检测点" />,
      dataIndex: 'checkPoint',
      // renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      //   return (
      //     <Select
      //       onFocus={allProblemList.length === 0 && queryAllProblemList}
      //       placeholder="请选择就诊内容"
      //     >
      //       {allProblemList.map((item) => (
      //         <Select.Option value={item.id} key={item.id}>
      //           {item.name}
      //         </Select.Option>
      //       ))}
      //     </Select>
      //   );
      // },
    },
    {
      title: <FormattedMessage id="pages.dataQuery.materialCode" defaultMessage="物料编码" />,
      dataIndex: 'materialCode',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.materialName" defaultMessage="物料名称" />,
      dataIndex: 'materialName',
    },
    {
      title: <FormattedMessage id="pages.dataUpload.batch" defaultMessage="批次" />,
      dataIndex: 'batch',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.project" defaultMessage="检测项目" />,
      dataIndex: 'project',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.max" defaultMessage="最大值" />,
      dataIndex: 'max',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.min" defaultMessage="最小值" />,
      dataIndex: 'min',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.checkNumber" defaultMessage="检测值" />,
      dataIndex: 'checkNumber',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.dataQuery.checkTime" defaultMessage="检测时间" />,
      dataIndex: 'checkTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        defaultValue: today,
      },
      render: (_, record) => {
        return moment(record.checkTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const queryList = async (params) => {
    const res = await getDataQueryList({
      ...params,
      startTime: params.checkTime
        ? moment(params.checkTime[0]).valueOf()
        : moment(today[0]).valueOf(),
      endTime: params.checkTime
        ? moment(params.checkTime[1]).valueOf()
        : moment(today[1]).valueOf(),
    });
    if (res) {
      return res;
    }
  };

  const handleExport = () => {};

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button key="upload" type="primary" onClick={handleExport}>
            <FormattedMessage id="pages.dataUpload.upload" defaultMessage="上传" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryList({ ...params })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default DataUpload;
