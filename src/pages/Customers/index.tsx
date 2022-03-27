import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, getLocale, useIntl, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import columns from './columns';
import { Customer } from '@/types/customer';
import { listCustomers } from '@/services/customer';
import { useEffect } from 'react';

export default function Page() {
  const { disable, update, clearResult, result } = useModel('customer');

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (result?.success) {
      message.success(formatMessage({ id: 'messages.success.operation' }));

      clearResult();
    }
  }, [result]);

  return (
    <PageContainer style={{ minHeight: '90vh' }}>
      <ProTable<Customer>
        rowKey="id"
        headerTitle={<FormattedMessage id="table.customer.title" />}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 5 }}
        dateFormatter="string"
        locale={getLocale()}
        columns={columns}
        request={listCustomers}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            <FormattedMessage id="table.new" />
          </Button>,
        ]}
        editable={{
          type: 'multiple',
          deletePopconfirmMessage: <FormattedMessage id="table.confirm" />,
          deleteText: <FormattedMessage id="table.disable" />,
          onDelete: async (key) => disable(key as string),
          onSave: async (_, record) => update(record),
        }}
      />
    </PageContainer>
  );
}
