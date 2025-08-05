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
  List
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
  PlayCircleOutlined
} from '@ant-design/icons';

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
      color: "#1890ff"
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
      color: "#722ed1"
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
      color: "#52c41a"
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
      color: "#fa541c"
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
      color: "#13c2c2"
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
      color: "#eb2f96"
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
      color: "#faad14"
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
      color: "#f5222d"
    }
  ];

  const stats = [
    { number: "16+", label: "Interactive Concepts", icon: <BookOutlined />, color: "#1890ff" },
    { number: "4", label: "Programming Frameworks", icon: <CodeOutlined />, color: "#52c41a" },
    { number: "100%", label: "Visual Learning", icon: <EyeOutlined />, color: "#722ed1" },
    { number: "AI", label: "Powered Content", icon: <BulbOutlined />, color: "#fa541c" }
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
              Powerful Features for
              <br />
              <span style={{ color: '#1890ff' }}>Visual Learning</span>
            </Title>
            
            <Paragraph style={{ 
              fontSize: '20px', 
              color: '#666', 
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Discover the comprehensive suite of features that make Visual Learning the most engaging 
              and effective way to master programming concepts.
            </Paragraph>

            {/* Stats Row */}
            <Row gutter={[48, 24]} justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ color: stat.color, margin: '0 0 8px 0', fontSize: '2.5rem' }}>
                      {stat.number}
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                      {stat.label}
                    </Paragraph>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Features Grid */}
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
                Everything you need to master programming
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
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
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
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
                    <Title level={4} style={{ color: '#1a1a1a', marginBottom: '16px', fontWeight: '600' }}>
                      {feature.title}
                    </Title>
                    <Paragraph style={{ color: '#666', margin: '0 0 20px 0', lineHeight: '1.6' }}>
                      {feature.description}
                    </Paragraph>
                    <List
                      size="small"
                      dataSource={feature.benefits}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '4px 0', border: 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutlined style={{ color: feature.color, marginRight: '8px' }} />
                            <Text style={{ color: '#666', fontSize: '14px' }}>{item}</Text>
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

        {/* Technology Stack */}
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
                Built with Modern Technology
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Our platform leverages cutting-edge technologies for optimal performance and user experience.
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} md={6}>
                <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <CodeOutlined style={{ fontSize: '48px', color: '#61dafb', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '8px' }}>React 18</Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>Modern UI with TypeScript</Paragraph>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <SettingOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '8px' }}>Express.js</Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>Robust backend API</Paragraph>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <BookOutlined style={{ fontSize: '48px', color: '#722ed1', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '8px' }}>MongoDB</Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>Scalable cloud database</Paragraph>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <BulbOutlined style={{ fontSize: '48px', color: '#fa541c', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '8px' }}>AI Integration</Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>OpenAI & Anthropic APIs</Paragraph>
                </Card>
              </Col>
            </Row>
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

export default Features; 