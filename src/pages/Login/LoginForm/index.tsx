import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { formatMessage, FormattedMessage, useModel } from 'umi';

const NormalLoginForm = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: any) => {
    const user = await initialState?.login?.(values.username, values.password);

    if (user) {
      setInitialState((state: any) => ({
        ...state,
        currentUser: user,
      }));
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,

            message: formatMessage({ id: 'login.alert.username' }),
          },
        ]}
      >
        <Input
          id="username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={formatMessage({ id: 'login.placeholder.username' })}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,

            message: formatMessage({ id: 'login.alert.password' }),
          },
        ]}
      >
        <Input
          id="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={formatMessage({ id: 'login.placeholder.password' })}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          id="loginbtn"
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          <FormattedMessage id="login.form.login" />
        </Button>
        <FormattedMessage id="login.form.or" />{' '}
        <a href="">
          <FormattedMessage id="login.form.register" />!
        </a>
      </Form.Item>
    </Form>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-normal-login">
      <NormalLoginForm />
    </div>
  </div>
);
