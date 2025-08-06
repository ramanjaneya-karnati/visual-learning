import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Avatar,
  Divider,
  Statistic,
  Tag
} from 'antd';
import { 
  ArrowLeftOutlined, 
  CodeOutlined, 
  BulbOutlined,
  StarOutlined,
  TrophyOutlined,
  FireOutlined,
  RocketOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  SafetyOutlined,
  SettingOutlined,
  BookOutlined,
  PlayCircleOutlined,
  UserOutlined,
  GlobalOutlined,
  AimOutlined
} from '@ant-design/icons';
import UnifiedFooter from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <EyeOutlined />,
      title: "Visual Learning",
      description: "We believe that complex concepts become simple when explained through visual metaphors and real-world analogies.",
      color: "#1890ff"
    },
    {
      icon: <BulbOutlined />,
      title: "AI-Powered Innovation",
      description: "Leveraging cutting-edge AI to create personalized learning experiences that adapt to individual needs.",
      color: "#722ed1"
    },
    {
      icon: <HeartOutlined />,
      title: "User-Centric Design",
      description: "Every feature is designed with the learner in mind, ensuring an intuitive and engaging experience.",
      color: "#eb2f96"
    },
    {
      icon: <TrophyOutlined />,
      title: "Excellence in Education",
      description: "Committed to delivering the highest quality learning content that makes programming accessible to everyone.",
      color: "#faad14"
    }
  ];

  const team = [
    {
      name: "Ramanjaneya Karnati",
      role: "Founder & Lead Developer",
      avatar: <UserOutlined />,
      bio: "Passionate about making programming education accessible through innovative visual learning techniques.",
      expertise: ["Full-Stack Development", "AI Integration", "Educational Technology"]
    },
    {
      name: "AI Assistant",
      role: "Content Generation",
      avatar: <BulbOutlined />,
      bio: "Advanced AI systems that generate personalized learning content and interactive stories.",
      expertise: ["OpenAI GPT-4", "Anthropic Claude", "Content Creation"]
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Layout.Header style={{ 
        background: '#ffffff', 
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #f0f0f0',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            style={{ 
              color: '#12715b', 
              marginRight: '16px',
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: '600'
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <BookOutlined style={{ fontSize: '24px', color: '#12715b', marginRight: '12px' }} />
          <Title level={4} style={{ 
            color: '#1a1a1a', 
            margin: 0, 
            fontWeight: 'bold',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            About Us
          </Title>
        </div>
      </Layout.Header>
        
      <Content style={{ padding: '0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
          {/* Hero Section */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '24px',
              fontSize: '3rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              About Learnify
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              We're revolutionizing programming education through visual metaphors and interactive learning experiences. 
              Our mission is to make complex programming concepts accessible to everyone.
            </Paragraph>
          </div>

          {/* Mission Section */}
          <div style={{ 
            marginBottom: '80px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ 
              color: '#1a1a1a', 
              marginBottom: '16px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Our Mission
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 60px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              To transform the way people learn programming by making complex concepts accessible through visual metaphors and interactive experiences.
            </Paragraph>
            
            <Row gutter={[24, 24]} justify="center">
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Interactive Concepts"
                  value={50}
                  suffix="+"
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Visual Stories"
                  value={100}
                  suffix="+"
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Learning Hours"
                  value={200}
                  suffix="+"
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Success Rate"
                  value={95}
                  suffix="%"
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
            </Row>
          </div>

          {/* Team Section */}
          <div style={{ 
            marginBottom: '80px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ 
              color: '#1a1a1a', 
              marginBottom: '16px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Meet Our Team
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 60px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              The passionate individuals behind Learnify's mission to transform programming education.
            </Paragraph>
            
            <Row gutter={[32, 32]} justify="center">
              {team.map((member, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card 
                    style={{ 
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      background: '#ffffff'
                    }}
                    bodyStyle={{ padding: '32px' }}
                    hoverable
                  >
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <Avatar 
                        size={80} 
                        icon={member.avatar}
                        style={{ 
                          background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                          fontSize: '32px'
                        }}
                      />
                    </div>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      textAlign: 'center',
                      marginBottom: '8px',
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      {member.name}
                    </Title>
                    <Paragraph style={{ 
                      color: '#12715b', 
                      textAlign: 'center',
                      marginBottom: '16px',
                      fontWeight: '500',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      {member.role}
                    </Paragraph>
                    <Paragraph style={{ 
                      color: '#666', 
                      textAlign: 'center',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      {member.bio}
                    </Paragraph>
                    <div style={{ textAlign: 'center' }}>
                      {member.expertise.map((skill, skillIndex) => (
                        <Tag 
                          key={skillIndex}
                          color="blue" 
                          style={{ 
                            margin: '4px', 
                            fontWeight: '500',
                            fontFamily: '"Open Sans", sans-serif'
                          }}
                        >
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Values Section */}
          <div style={{ 
            marginBottom: '80px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ 
              color: '#1a1a1a', 
              marginBottom: '16px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Our Values
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 60px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              The principles that guide everything we do at Learnify.
            </Paragraph>
            
            <Row gutter={[24, 24]} justify="center">
              {values.map((value, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card 
                    style={{ 
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      background: '#ffffff'
                    }}
                    bodyStyle={{ padding: '32px' }}
                    hoverable
                  >
                    <div style={{ 
                      width: '56px', 
                      height: '56px', 
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}dd 100%)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px',
                      margin: '0 auto 24px'
                    }}>
                      <div style={{ fontSize: '28px', color: 'white' }}>
                        {value.icon}
                      </div>
                    </div>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      marginBottom: '16px', 
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif',
                      textAlign: 'center'
                    }}>
                      {value.title}
                    </Title>
                    <Paragraph style={{ 
                      color: '#666', 
                      margin: 0, 
                      lineHeight: '1.6',
                      fontFamily: '"Open Sans", sans-serif',
                      textAlign: 'center'
                    }}>
                      {value.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
      
      <UnifiedFooter />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Responsive Design for About Page */
          @media (max-width: 768px) {
            .ant-layout-header {
              padding: 0 16px !important;
            }
            
            .ant-typography h1 {
              font-size: 2.5rem !important;
              line-height: 1.1 !important;
            }
            
            .ant-typography h2 {
              font-size: 2rem !important;
            }
            
            .ant-typography h3 {
              font-size: 1.5rem !important;
            }
            
            .ant-typography h4 {
              font-size: 1.25rem !important;
            }
            
            .content-section {
              padding: 40px 16px !important;
            }
            
            .ant-btn {
              height: 48px !important;
              padding: 0 24px !important;
              font-size: 16px !important;
            }
            
            .ant-card {
              margin-bottom: 16px !important;
            }
            
            .ant-row {
              margin: 0 -8px !important;
            }
            
            .ant-col {
              padding: 0 8px !important;
            }
            
            .ant-statistic-title {
              font-size: 14px !important;
            }
            
            .ant-statistic-content {
              font-size: 2rem !important;
            }
          }
          
          @media (max-width: 576px) {
            .ant-layout-header {
              padding: 0 12px !important;
              height: 60px !important;
            }
            
            .ant-typography h1 {
              font-size: 2rem !important;
            }
            
            .ant-typography h2 {
              font-size: 1.75rem !important;
            }
            
            .content-section {
              padding: 30px 12px !important;
            }
            
            .ant-btn {
              height: 44px !important;
              padding: 0 20px !important;
              font-size: 14px !important;
            }
            
            .ant-statistic-title {
              font-size: 12px !important;
            }
            
            .ant-statistic-content {
              font-size: 1.5rem !important;
            }
            
            .ant-avatar {
              width: 60px !important;
              height: 60px !important;
            }
          }
          
          @media (max-width: 480px) {
            .ant-layout-header {
              padding: 0 8px !important;
            }
            
            .ant-typography h1 {
              font-size: 1.75rem !important;
            }
            
            .content-section {
              padding: 20px 8px !important;
            }
            
            .ant-btn {
              height: 40px !important;
              padding: 0 16px !important;
              font-size: 13px !important;
            }
            
            .ant-card-body {
              padding: 20px !important;
            }
          }
          
          /* Tablet Styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .content-section {
              padding: 60px 40px !important;
            }
            
            .ant-typography h1 {
              font-size: 3rem !important;
            }
          }
          
          /* Large Desktop Styles */
          @media (min-width: 1200px) {
            .content-section {
              padding: 80px 60px !important;
            }
            
            .ant-typography h1 {
              font-size: 4rem !important;
            }
          }
          
          /* Hover Effects */
          .ant-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
          }
          
          /* Smooth Transitions */
          .ant-card,
          .ant-btn,
          .ant-statistic {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
        `
      }} />
    </Layout>
  );
};

export default About; 