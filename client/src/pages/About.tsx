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
  Timeline,
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

const { Header, Content, Footer } = Layout;
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

  const milestones = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "Visual Learning platform goes live with comprehensive React, Angular, and Advanced Patterns content."
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Successfully integrated OpenAI GPT-4 and Anthropic Claude 3 for dynamic content generation."
    },
    {
      year: "2024",
      title: "Framework Expansion",
      description: "Added Next.js framework and expanded to 16+ interactive concepts with visual metaphors."
    },
    {
      year: "2024",
      title: "Security Enhancement",
      description: "Implemented enterprise-grade security with JWT authentication and comprehensive data protection."
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header style={{ 
        background: '#ffffff', 
        padding: '0 50px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #f0f0f0',
        height: '80px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            style={{ 
              color: '#666', 
              marginRight: '16px',
              fontSize: '16px',
              fontWeight: '500'
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <BookOutlined style={{ fontSize: '28px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: '#1a1a1a', margin: 0, fontWeight: 'bold' }}>
            Visual Learning
          </Title>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button 
              type="text" 
              style={{ color: '#666', fontWeight: '500' }}
              onClick={() => navigate('/features')}
            >
              Features
            </Button>
            <Button 
              type="text" 
              style={{ color: '#666', fontWeight: '500' }}
              onClick={() => navigate('/about')}
            >
              About
            </Button>
          </div>
        </div>
      </Header>
      
      <Content style={{ padding: '0', background: '#ffffff' }}>
        {/* Hero Section */}
        <div style={{ 
          background: '#ffffff',
          padding: '120px 50px 80px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '24px',
              fontSize: '4rem',
              fontWeight: 'bold',
              lineHeight: '1.1'
            }}>
              About Visual Learning
            </Title>
            
            <Paragraph style={{ 
              fontSize: '20px', 
              color: '#666', 
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              We're on a mission to transform how people learn programming. By combining visual metaphors, 
              interactive stories, and AI-powered content generation, we make complex programming concepts 
              accessible to everyone.
            </Paragraph>

            {/* Stats Row */}
            <Row gutter={[48, 24]} justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Col xs={12} md={6}>
                <Statistic
                  title="Interactive Concepts"
                  value={16}
                  suffix="+"
                  valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} md={6}>
                <Statistic
                  title="Programming Frameworks"
                  value={4}
                  valueStyle={{ color: '#52c41a', fontSize: '2.5rem' }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} md={6}>
                <Statistic
                  title="AI Models"
                  value={2}
                  suffix=""
                  valueStyle={{ color: '#722ed1', fontSize: '2.5rem' }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} md={6}>
                <Statistic
                  title="Learning Satisfaction"
                  value={100}
                  suffix="%"
                  valueStyle={{ color: '#fa541c', fontSize: '2.5rem' }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
            </Row>
          </div>
        </div>

        {/* Mission Section */}
        <div style={{ 
          background: '#fafafa',
          padding: '80px 50px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Row gutter={[48, 32]} align="middle">
              <Col xs={24} md={12}>
                <Title level={2} style={{ 
                  color: '#1a1a1a', 
                  marginBottom: '24px',
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}>
                  Our Mission
                </Title>
                <Paragraph style={{ 
                  fontSize: '18px', 
                  color: '#666',
                  lineHeight: '1.8',
                  marginBottom: '24px'
                }}>
                  To democratize programming education by making complex concepts accessible through 
                  intuitive visual metaphors and interactive learning experiences.
                </Paragraph>
                <Paragraph style={{ 
                  fontSize: '16px', 
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  We believe that everyone deserves access to high-quality programming education, 
                  regardless of their background or experience level. Our platform combines the power 
                  of AI with human creativity to create engaging, memorable learning experiences.
                </Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Card style={{ 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                  color: 'white'
                }}>
                  <div style={{ padding: '32px', textAlign: 'center' }}>
                    <AimOutlined style={{ fontSize: '64px', color: 'white', marginBottom: '24px' }} />
                    <Title level={3} style={{ color: 'white', marginBottom: '16px' }}>
                      Vision Statement
                    </Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: '1.6' }}>
                      To become the world's leading platform for visual programming education, 
                      empowering millions of learners to master programming through intuitive, 
                      engaging, and effective learning experiences.
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Values Section */}
        <div style={{ 
          padding: '80px 50px', 
          background: '#ffffff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ 
                color: '#1a1a1a', 
                marginBottom: '16px',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                Our Values
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                The principles that guide everything we do at Visual Learning.
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]} justify="center">
              {values.map((value, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card 
                    style={{ 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      height: '100%',
                      transition: 'all 0.3s ease'
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
                      marginBottom: '24px'
                    }}>
                      <div style={{ fontSize: '28px', color: 'white' }}>
                        {value.icon}
                      </div>
                    </div>
                    <Title level={4} style={{ color: '#1a1a1a', marginBottom: '16px', fontWeight: '600' }}>
                      {value.title}
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                      {value.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Team Section */}
        <div style={{ 
          background: '#fafafa',
          padding: '80px 50px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ 
                color: '#1a1a1a', 
                marginBottom: '16px',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                Meet Our Team
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                The passionate individuals behind Visual Learning's mission to transform programming education.
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]} justify="center">
              {team.map((member, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card 
                    style={{ 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      height: '100%'
                    }}
                    bodyStyle={{ padding: '32px' }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <Avatar 
                        size={80} 
                        icon={member.avatar}
                        style={{ 
                          background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                          fontSize: '32px'
                        }}
                      />
                    </div>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      textAlign: 'center',
                      marginBottom: '8px',
                      fontWeight: '600'
                    }}>
                      {member.name}
                    </Title>
                    <Paragraph style={{ 
                      color: '#1890ff', 
                      textAlign: 'center',
                      marginBottom: '16px',
                      fontWeight: '500'
                    }}>
                      {member.role}
                    </Paragraph>
                    <Paragraph style={{ 
                      color: '#666', 
                      textAlign: 'center',
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                      {member.bio}
                    </Paragraph>
                    <div style={{ textAlign: 'center' }}>
                      {member.expertise.map((skill, skillIndex) => (
                        <Tag 
                          key={skillIndex}
                          color="blue" 
                          style={{ margin: '4px', fontWeight: '500' }}
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
        </div>

        {/* Timeline Section */}
        <div style={{ 
          padding: '80px 50px', 
          background: '#ffffff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ 
                color: '#1a1a1a', 
                marginBottom: '16px',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                Our Journey
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Key milestones in Visual Learning's development and growth.
              </Paragraph>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Timeline
                mode="left"
                items={milestones.map((milestone, index) => ({
                  children: (
                    <Card 
                      style={{ 
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        marginBottom: '16px'
                      }}
                      bodyStyle={{ padding: '20px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <Tag color="blue" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                          {milestone.year}
                        </Tag>
                      </div>
                      <Title level={4} style={{ color: '#1a1a1a', marginBottom: '8px', fontWeight: '600' }}>
                        {milestone.title}
                      </Title>
                      <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                        {milestone.description}
                      </Paragraph>
                    </Card>
                  )
                }))}
              />
            </div>
          </div>
        </div>
      </Content>
      
      <Footer style={{ 
        background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        padding: '40px 50px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <BookOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
                <Title level={4} style={{ color: '#1a1a1a', margin: 0, fontWeight: 'bold' }}>
                  Visual Learning
                </Title>
              </div>
              <Paragraph style={{ color: '#666', margin: 0 }}>
                Making programming concepts accessible through visual metaphors and interactive learning experiences.
              </Paragraph>
            </Col>
          </Row>
          <Divider style={{ margin: '32px 0 16px 0' }} />
        </div>
      </Footer>
    </Layout>
  );
};

export default About; 