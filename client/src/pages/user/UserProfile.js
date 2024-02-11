import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Row, Col, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const UserProfile = () => {

  const userName = sessionStorage.getItem('userName')
  const userEmail = sessionStorage.getItem('userEmail')
  console.log(userName)

  return (
    <React.Fragment>
      <div className='m-10 h-full'>
      <Title level={2}>User Profile</Title>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Title level={3}>
                  {/* {userName ? userName : 'Loading...'} */}
                  {userName}
                </Title>
              </div>
              <Paragraph style={{ textAlign: 'center' }}>
                {/* {userEmail ? `Email: ${userEmail}` : 'Loading...'} <br /> */}
                {/* You can add additional details here if needed */}
                {`Email: ${userEmail}`}
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
