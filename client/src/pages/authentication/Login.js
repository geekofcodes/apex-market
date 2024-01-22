// Login.js (client/src/pages/authentication/Login.js)
import React, { useState } from 'react';
import { Form, Input, Typography, Card } from 'antd';
import { Button } from '@mui/material'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import authService from '../../services/authService';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Call the login function from authService
      const response = await authService.login(values);

      // Handle successful login
      console.log('Login successful', response);
      // You can redirect the user or perform other actions as needed

    } catch (error) {
      // Handle login failure
      console.error('Login failed', error);
      // You might want to display an error message to the user
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust if needed
  };

  const cardStyle = {
    width: '300px', // Adjust the width as needed
  };

  return (
    <div style={containerStyle}>
      <Card className='color:' style={cardStyle} title={<Title level={2}>Login</Title>}>
        <Form form={form} onFinish={handleSubmit} style={{ width: '100%' }}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button variant="contained" htmlType="submit" style={{ width: '100%', display: 'block' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
