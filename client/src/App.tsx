import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space } from 'antd';
import { BookOutlined, CodeOutlined, BulbOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <BookOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Visual Learning
          </Title>
        </div>
      </Header>
      
      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} lg={16}>
              <Card style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ color: '#1890ff', marginBottom: '16px' }}>
                  Learn Programming Concepts the Fun Way
                </Title>
                <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
                  Discover complex programming concepts through intuitive metaphors and interactive examples
                </Paragraph>
                
                <Space size="large">
                  <Button type="primary" size="large" icon={<CodeOutlined />}>
                    Start Learning
                  </Button>
                  <Button size="large" icon={<BulbOutlined />}>
                    Explore Concepts
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={8}>
              <Card title="React Concepts" hoverable>
                <Paragraph>
                  Master React fundamentals with visual metaphors and interactive examples.
                </Paragraph>
                <Button type="link">Learn More →</Button>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Angular Concepts" hoverable>
                <Paragraph>
                  Understand Angular patterns through real-world analogies and step-by-step guides.
                </Paragraph>
                <Button type="link">Learn More →</Button>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Advanced Patterns" hoverable>
                <Paragraph>
                  Explore advanced programming patterns with visual explanations and code examples.
                </Paragraph>
                <Button type="link">Learn More →</Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Visual Learning Platform ©2024 Created by Ramanjaneya
      </Footer>
    </Layout>
  );
}

export default App;
