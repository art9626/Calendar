import { Layout, Row } from 'antd';
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Row
        justify='center'
        align='middle'
        style={{
          height: 'calc(100vh - 64px)'
        }}
      >
        <LoginForm />
      </Row>
    </Layout>
  );
};

export default LoginPage;