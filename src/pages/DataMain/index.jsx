import { PageContainer } from '@ant-design/pro-layout';

import Main from './component/Main';
import CheckProject from './component/CheckProject';
import AssayProject from './component/AssayProject';

const DataMain = () => {
  return (
    <PageContainer>
      <Main />
      <CheckProject />
      <AssayProject />
    </PageContainer>
  );
};

export default DataMain;
