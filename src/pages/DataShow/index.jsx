import { Card, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

const DataShow = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card title="物料名称：xxx  检测点：xxx"></Card>
    </PageContainer>
  );
};

export default DataShow;
