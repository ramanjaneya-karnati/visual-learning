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
  Tag,
  Avatar,
  Divider,
  List,
  Statistic
} from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
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
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import UnifiedFooter from '../components/Footer';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const Features: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOutlined />,
      title: "Visual Metaphors",
      description: "Complex programming concepts explained through intuitive real-world analogies that make learning engaging and memorable.",
      benefits: [
        "Restaurant and kitchen analogies for React concepts",
        "Real-world scenarios for Angular patterns", 
        "Interactive character-driven narratives",
        "Step-by-step visual explanations"
      ],
      color: "#12715b"
    },
    {
      icon: <BulbOutlined />,
      title: "AI-Powered Learning",
      description: "Advanced AI generates personalized content and suggests learning paths tailored to your skill level and interests.",
      benefits: [
        "OpenAI GPT-4 integration for content generation",
        "Anthropic Claude 3 Sonnet fallback system",
        "Automatic concept suggestions",
        "Personalized learning recommendations"
      ],
      color: "#12715b"
    },
    {
      icon: <EyeOutlined />,
      title: "Interactive Stories",
      description: "Character-driven narratives that guide you through programming concepts with step-by-step explanations and real-world scenarios.",
      benefits: [
        "Character mapping to programming concepts",
        "Scene-based learning progression",
        "Problem-solution storytelling",
        "Real-world application examples"
      ],
      color: "#12715b"
    },
    {
      icon: <CodeOutlined />,
      title: "Code Examples",
      description: "Syntax-highlighted code examples with both basic and advanced implementations for every programming concept.",
      benefits: [
        "Prism.js syntax highlighting",
        "Basic and advanced code examples",
        "Copy-to-clipboard functionality",
        "Language-agnostic highlighting"
      ],
      color: "#12715b"
    },
    {
      icon: <TeamOutlined />,
      title: "Framework Management",
      description: "Comprehensive admin dashboard for managing frameworks, concepts, and learning content with full CRUD operations.",
      benefits: [
        "Add, edit, and delete frameworks",
        "Conditional deletion (only if empty)",
        "Concept association management",
        "Real-time content updates"
      ],
      color: "#12715b"
    },
    {
      icon: <SafetyOutlined />,
      title: "Enterprise Security",
      description: "Robust security implementation with JWT authentication, rate limiting, and comprehensive data protection.",
      benefits: [
        "SHA-256 password hashing with salt",
        "JWT token authentication",
        "Rate limiting and CSRF protection",
        "Input sanitization and validation"
      ],
      color: "#12715b"
    },
    {
      icon: <SettingOutlined />,
      title: "Modern Technology Stack",
      description: "Built with cutting-edge technologies for optimal performance, scalability, and developer experience.",
      benefits: [
        "React 18 with TypeScript",
        "Express.js backend with MongoDB",
        "Vite for fast development",
        "Ant Design UI components"
      ],
      color: "#12715b"
    },
    {
      icon: <BookOutlined />,
      title: "Comprehensive Learning Paths",
      description: "Structured learning paths across multiple programming frameworks with progressive difficulty levels.",
      benefits: [
        "React, Angular, Next.js, Advanced Patterns",
        "Beginner to Advanced difficulty levels",
        "Estimated learning times",
        "Visual progress tracking"
      ],
      color: "#12715b"
    }
  ];

  const stats = [
    { number: "16+", label: "Interactive Concepts", icon: <BookOutlined />, color: "#12715b" },
    { number: "4", label: "Programming Frameworks", icon: <CodeOutlined />, color: "#12715b" },
    { number: "100%", label: "Visual Learning", icon: <EyeOutlined />, color: "#12715b" },
    { number: "AI", label: "Powered Content", icon: <BulbOutlined />, color: "#12715b" }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Header */}
      <Header style={{ 
        background: 'rgb(245, 238, 233)',
        borderBottom: 'none',
        padding: '0 20px',
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
            Features
          </Title>
        </div>
      </Header>

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
              Powerful Features for
              <br />
              <span style={{ 
                color: '#12715b',
                fontWeight: '600'
              }}>
                Visual Learning
              </span>
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Discover the innovative features that make Learnify the most effective platform for mastering programming concepts through visual metaphors and interactive experiences.
            </Paragraph>
          </div>

          {/* Built with Modern Technology */}
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
              Built with Modern Technology
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 60px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Our platform leverages cutting-edge technologies to deliver an exceptional learning experience.
            </Paragraph>
            
            <Row gutter={[24, 24]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card style={{ 
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
                    background: '#12715b',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '28px', color: 'white' }}>
                      <CodeOutlined />
                    </div>
                  </div>
                  <Title level={4} style={{ 
                    color: '#1a1a1a', 
                    marginBottom: '16px', 
                    fontWeight: '600',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    React & TypeScript
                  </Title>
                  <Paragraph style={{ 
                    color: '#666', 
                    margin: '0 0 20px 0', 
                    lineHeight: '1.6',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    Built with React 18 and TypeScript for type safety, ensuring a robust and maintainable codebase with excellent developer experience.
                  </Paragraph>
                  <List
                    size="small"
                    dataSource={[
                      "Modern React hooks and functional components",
                      "TypeScript for type safety and better DX",
                      "Component-based architecture",
                      "Optimized performance with React 18"
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '4px 0', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircleOutlined style={{ color: '#12715b', marginRight: '8px' }} />
                          <Text style={{ 
                            color: '#666', 
                            fontSize: '14px',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            {item}
                          </Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card style={{ 
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
                    background: '#12715b',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '28px', color: 'white' }}>
                      <BulbOutlined />
                    </div>
                  </div>
                  <Title level={4} style={{ 
                    color: '#1a1a1a', 
                    marginBottom: '16px', 
                    fontWeight: '600',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    AI-Powered Content
                  </Title>
                  <Paragraph style={{ 
                    color: '#666', 
                    margin: '0 0 20px 0', 
                    lineHeight: '1.6',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    Advanced AI integration with OpenAI GPT-4 and Anthropic Claude for generating personalized learning content and interactive stories.
                  </Paragraph>
                  <List
                    size="small"
                    dataSource={[
                      "OpenAI GPT-4 for content generation",
                      "Anthropic Claude 3 Sonnet fallback",
                      "Personalized learning paths",
                      "Dynamic content adaptation"
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '4px 0', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircleOutlined style={{ color: '#12715b', marginRight: '8px' }} />
                          <Text style={{ 
                            color: '#666', 
                            fontSize: '14px',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            {item}
                          </Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card style={{ 
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
                    background: '#12715b',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '28px', color: 'white' }}>
                      <RocketOutlined />
                    </div>
                  </div>
                  <Title level={4} style={{ 
                    color: '#1a1a1a', 
                    marginBottom: '16px', 
                    fontWeight: '600',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    Modern Backend
                  </Title>
                  <Paragraph style={{ 
                    color: '#666', 
                    margin: '0 0 20px 0', 
                    lineHeight: '1.6',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    Node.js backend with Express, MongoDB Atlas for data persistence, and Vercel for seamless deployment and scaling.
                  </Paragraph>
                  <List
                    size="small"
                    dataSource={[
                      "Node.js with Express framework",
                      "MongoDB Atlas cloud database",
                      "Vercel serverless deployment",
                      "RESTful API architecture"
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '4px 0', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircleOutlined style={{ color: '#12715b', marginRight: '8px' }} />
                          <Text style={{ 
                            color: '#666', 
                            fontSize: '14px',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            {item}
                          </Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          {/* Features Grid - Moved to 3rd position */}
          <div style={{ 
            background: '#ffffff',
            padding: '80px 50px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <Title level={2} style={{ 
                  color: '#1a1a1a', 
                  marginBottom: '16px',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Everything you need to master programming
                </Title>
                <Paragraph style={{ 
                  fontSize: '18px', 
                  color: '#666',
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Our comprehensive feature set is designed to make your programming journey easier and more efficient.
                </Paragraph>
              </div>
              
              <Row gutter={[32, 32]} justify="center">
                {features.map((feature, index) => (
                  <Col xs={24} md={12} lg={8} key={index}>
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
                        background: '#12715b',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px'
                      }}>
                        <div style={{ fontSize: '28px', color: 'white' }}>
                          {feature.icon}
                        </div>
                      </div>
                      <Title level={4} style={{ 
                        color: '#1a1a1a', 
                        marginBottom: '16px', 
                        fontWeight: '600',
                        fontFamily: '"Open Sans", sans-serif'
                      }}>
                        {feature.title}
                      </Title>
                      <Paragraph style={{ 
                        color: '#666', 
                        margin: '0 0 20px 0', 
                        lineHeight: '1.6',
                        fontFamily: '"Open Sans", sans-serif'
                      }}>
                        {feature.description}
                      </Paragraph>
                      <List
                        size="small"
                        dataSource={feature.benefits}
                        renderItem={(item) => (
                          <List.Item style={{ padding: '4px 0', border: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <CheckCircleOutlined style={{ color: '#12715b', marginRight: '8px' }} />
                              <Text style={{ 
                                color: '#666', 
                                fontSize: '14px',
                                fontFamily: '"Open Sans", sans-serif'
                              }}>
                                {item}
                              </Text>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </Content>
      
      <UnifiedFooter />
    </Layout>
  );
};

export default Features; 