// Signup.js (client/src/pages/authentication/Signup.js)
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import authService from '../../services/authService';

const Signup = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Call the register function from authService
      const response = await authService.register(values);

      // Handle successful registration
      console.log('Registration successful', response);
      // You can redirect the user or perform other actions as needed

    } catch (error) {
      // Handle registration failure
      console.error('Registration failed', error);
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
