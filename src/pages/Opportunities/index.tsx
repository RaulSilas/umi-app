import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, getLocale, useIntl, useModel, useAccess } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import columns from './columns';
import { Opportunity } from '@/types/opportunity';
import { listOpportunities } from '@/services/opportunity';
import { useEffect } from 'react';

export default function Page() {
  const { disable, update, clearResult, result } = useModel('opportunity');
  const { canAdmin } = useAccess();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (result?.success) {
      message.success(formatMessage({ id: 'messages.success.operation' }));

      clearResult();
    }
  }, [result]);

  return (
    <PageContainer style={{ minHeight: '90vh' }}>
      <ProTable<Opportunity>
        rowKey="id"
        headerTitle={<FormattedMessage id="table.opportunity.title" />}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 5 }}
        dateFormatter="string"
        locale={getLocale()}
        columns={columns}
        request={listOpportunities}
        rowSelection={canAdmin && { onChange: () => {} }}
        tableAlertOptionRender={() => <a>Assign</a>}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            <FormattedMessage id="table.new" />
          </Button>,
        ]}
        editable={{
          type: 'multiple',
          deletePopconfirmMessage: <FormattedMessage id="table.confirm" />,
          saveText: <span id="save">save</span>,
          deleteText: <FormattedMessage id="table.disable" />,
          onDelete: async (key) => disable(key as string),
          onSave: async (_, record) => update(record),
        }}
      />
    </PageContainer>
  );
}
