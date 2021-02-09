import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Typography } from 'antd';
import { useIntl, FormattedMessage, history } from 'umi';
import styles from './index.less';

import { arrTrans, getRoutes } from '@/utils/utils';

export default () => {
  const targetMenus = getRoutes();
  const currentMenus = JSON.parse(localStorage.getItem('user')).menu.split(',');
  let showMenus = [];
  targetMenus.forEach((item) => {
    if (currentMenus.includes(item.value.toString())) {
      showMenus.push(item);
    }
  });

  const routes = arrTrans(3,showMenus);
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
