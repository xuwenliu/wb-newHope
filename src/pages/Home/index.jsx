import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Typography } from 'antd';
import { useIntl, FormattedMessage, history } from 'umi';
import styles from './index.less';

import { arrTrans, getRoutes } from '@/utils/utils';

export default () => {
  const routes = arrTrans(3, getRoutes());
  return (
    <PageContainer>
      <Card>
        {routes.map((item, index) => (
          <Row gutter={16} key={index}>
            {item.map((sub) => (
              <Col span={8} key={sub.path}>
                <div
                  className={styles.card}
                  onClick={() => {
                    history.push(sub.path);
                  }}
                >
                  <Typography.Text>{sub.label}</Typography.Text>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Card>
    </PageContainer>
  );
};
