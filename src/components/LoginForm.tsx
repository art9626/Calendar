import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/auth/authActions';
import { getError, getIsLoading } from '../redux/reducers/auth/authSelectors';
import { rules } from '../utils/rules';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    dispatch(login(username, password));
  }

  return (
    <Card>
      <Form
        onFinish={onSubmit}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[rules.required('Please input your username!')]}
        >
          <Input 
            onChange={(e) => setUsername(e.currentTarget.value)}
            value={username}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[rules.required('Please input your password!')]}
        >
          <Input.Password 
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
        {
          error && <div style={{ color: 'red' }}>{error}</div>
        }
      </Form>
    </Card>
  );
};

export default LoginForm;