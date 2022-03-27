import React from 'react';
import styles from './index.less';
import { history, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { Opportunity } from '@/types/opportunity';
import columns from '../Opportunities/columns';

export default function Page() {
  const { query } = history.location;
  const { code } = query as { code: string };

  const { initialState } = useModel('@@initialState');

  alert(`code=${code}`);

  return (
    <PageContainer
      header={{ title: undefined }}
      style={{ minHeight: '90vh' }}
      content={
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar
              alt="avatar"
              className={styles.avatarComponent}
              size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
              icon={<UserOutlined />}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.contentTitle}>
              <FormattedMessage id="greetings.hello" />{' '}
              {initialState?.currentUser?.name},{' '}
              <FormattedMessage id="greetings.welcome" />.{' '}
            </div>
            <div>
              {initialState?.currentUser?.role?.title} |{' '}
              {initialState?.currentUser?.company}
            </div>
          </div>
        </div>
      }
    >
      <div style={{ width: '100%' }}>
        <ProTable<Opportunity>
          headerTitle={<FormattedMessage id="home.recents" />}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          search={false}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
