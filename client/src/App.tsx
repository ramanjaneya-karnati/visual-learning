import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Button, Space, Spin, Badge, Tag, Avatar, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, BulbOutlined, RocketOutlined, StarOutlined, TrophyOutlined, FireOutlined, HeartOutlined } from '@ant-design/icons';
import ConceptsPage from './pages/ConceptsPage';
import ConceptDetailPage from './pages/ConceptDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FrameworksPage from './pages/admin/FrameworksPage';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

interface Framework {
  id: string;
  name: string;
  concepts?: any[];
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalConcepts: 0, totalFrameworks: 0 });

  useEffect(() => {
    fetchFrameworks();
  }, []);

  const fetchFrameworks = async () => {
    try {
      const response = await fetch('/api/concepts');
      if (response.ok) {
        const data = await response.json();
        setFrameworks(data.frameworks || []);
        
        // Calculate stats
        const totalConcepts = data.frameworks?.reduce((acc: number, framework: any) => 
          acc + (framework.concepts?.length || 0), 0) || 0;
        setStats({
          totalConcepts,
          totalFrameworks: data.frameworks?.length || 0
        });
      } else {
        console.error('Failed to fetch frameworks');
      }
    } catch (error) {
      console.error('Error fetching frameworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFrameworkClick = (frameworkId: string) => {
    navigate(`/concepts/${frameworkId}`);
  };

  const getFrameworkIcon = (frameworkName: string) => {
    const name = frameworkName.toLowerCase();
    if (name.includes('react')) return <CodeOutlined style={{ fontSize: '24px', color: '#61dafb' }} />;
    if (name.includes('angular')) return <CodeOutlined style={{ fontSize: '24px', color: '#dd0031' }} />;
    if (name.includes('next')) return <RocketOutlined style={{ fontSize: '24px', color: '#000000' }} />;
    if (name.includes('advanced')) return <TrophyOutlined style={{ fontSize: '24px', color: '#ffd700' }} />;
    return <CodeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
  };

  const getDifficultyColor = (concepts: any[]) => {
    if (!concepts || concepts.length === 0) return 'default';
    const difficulties = concepts.map((c: any) => c.difficulty);
    const hasAdvanced = difficulties.includes('advanced');
    const hasIntermediate = difficulties.includes('intermediate');
    
    if (hasAdvanced) return 'red';
    if (hasIntermediate) return 'orange';
    return 'green';
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Header style={{ 
        background: 'rgba(0, 21, 41, 0.9)', 
        backdropFilter: 'blur(10px)',
        padding: '0 50px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <BookOutlined style={{ fontSize: '28px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>
            Visual Learning
          </Title>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Tag color="blue" style={{ margin: 0 }}>
              <StarOutlined /> Interactive Learning
            </Tag>
            <Tag color="green" style={{ margin: 0 }}>
              <FireOutlined /> AI-Powered
            </Tag>
          </div>
        </div>
      </Header>
      
      <Content style={{ padding: '0', background: 'transparent' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '80px 50px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite'
          }} />
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <Title level={1} style={{ 
              color: '#ffffff', 
              marginBottom: '24px',
              fontSize: '3.5rem',
              fontWeight: 'bold',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              animation: 'fadeInUp 1s ease-out'
            }}>
              Learn Programming Concepts
              <br />
              <span style={{ color: '#1890ff' }}>the Fun Way</span>
            </Title>
            
            <Paragraph style={{ 
              fontSize: '20px', 
              color: '#ffffff', 
              marginBottom: '40px',
              opacity: 0.9,
              animation: 'fadeInUp 1s ease-out 0.2s both'
            }}>
              Discover complex programming concepts through intuitive metaphors, 
              interactive examples, and AI-powered learning experiences
            </Paragraph>
            
            <Space size="large" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                style={{
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  boxShadow: '0 8px 16px rgba(24, 144, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(24, 144, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(24, 144, 255, 0.3)';
                }}
              >
                Start Learning Journey
              </Button>
              <Button 
                size="large" 
                icon={<BulbOutlined />}
                style={{
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  background: 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#1890ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                Explore Concepts
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '40px 50px',
          backdropFilter: 'blur(10px)'
        }}>
          <Row gutter={[32, 16]} justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Col xs={12} md={6}>
              <Statistic
                title="Total Concepts"
                value={stats.totalConcepts}
                prefix={<BookOutlined />}
                valueStyle={{ color: '#1890ff', fontSize: '2rem' }}
                style={{ textAlign: 'center' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="Frameworks"
                value={stats.totalFrameworks}
                prefix={<CodeOutlined />}
                valueStyle={{ color: '#52c41a', fontSize: '2rem' }}
                style={{ textAlign: 'center' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="Interactive Stories"
                value="100%"
                prefix={<HeartOutlined />}
                valueStyle={{ color: '#eb2f96', fontSize: '2rem' }}
                style={{ textAlign: 'center' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="AI-Powered"
                value="Yes"
                prefix={<StarOutlined />}
                valueStyle={{ color: '#faad14', fontSize: '2rem' }}
                style={{ textAlign: 'center' }}
              />
            </Col>
          </Row>
        </div>

        {/* Frameworks Section */}
        <div style={{ padding: '60px 50px', background: 'rgba(255, 255, 255, 0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ 
              textAlign: 'center', 
              color: '#ffffff', 
              marginBottom: '50px',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              Choose Your Learning Path
            </Title>
            
            {loading ? (
              <Row justify="center">
                <Col>
                  <Spin size="large" />
                  <Paragraph style={{ textAlign: 'center', marginTop: '16px', color: '#ffffff' }}>
                    Loading frameworks...
                  </Paragraph>
                </Col>
              </Row>
            ) : (
              <Row gutter={[32, 32]} justify="center">
                {frameworks.map((framework, index) => (
                  <Col xs={24} md={12} lg={8} key={framework.id}>
                    <Card 
                      hoverable
                      onClick={() => handleFrameworkClick(framework.id)}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: hoveredCard === framework.id 
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)' 
                          : 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        transform: hoveredCard === framework.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                      onMouseEnter={() => setHoveredCard(framework.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      bodyStyle={{ padding: '24px' }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        {getFrameworkIcon(framework.name)}
                      </div>
                      
                      <Title level={4} style={{ 
                        color: '#ffffff', 
                        textAlign: 'center',
                        marginBottom: '12px',
                        fontWeight: 'bold'
                      }}>
                        {framework.name} Concepts
                      </Title>
                      
                      <Paragraph style={{ 
                        color: '#ffffff', 
                        textAlign: 'center',
                        marginBottom: '20px',
                        opacity: 0.9
                      }}>
                        {framework.concepts && framework.concepts.length > 0 
                          ? `Explore ${framework.concepts.length} concepts with visual metaphors and interactive examples.`
                          : `Discover ${framework.name} concepts through real-world analogies and step-by-step guides.`
                        }
                      </Paragraph>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Badge 
                          count={framework.concepts?.length || 0} 
                          style={{ backgroundColor: '#1890ff' }}
                        />
                        <Tag color={getDifficultyColor(framework.concepts || [])}>
                          {framework.concepts?.some((c: any) => c.difficulty === 'advanced') ? 'Advanced' :
                           framework.concepts?.some((c: any) => c.difficulty === 'intermediate') ? 'Intermediate' : 'Beginner'}
                        </Tag>
                      </div>
                      
                      <Button 
                        type="primary" 
                        block
                        style={{
                          borderRadius: '8px',
                          height: '40px',
                          fontWeight: 'bold',
                          background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                          border: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Start Learning →
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </Content>
      
      <Footer style={{ 
        textAlign: 'center', 
        background: 'rgba(0, 21, 41, 0.9)',
        color: '#ffffff',
        padding: '24px 50px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <BookOutlined style={{ marginRight: '8px' }} />
            Visual Learning Platform ©2024 Created by Ramanjaneya
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Tag color="blue">React</Tag>
            <Tag color="red">Angular</Tag>
            <Tag color="purple">Next.js</Tag>
            <Tag color="gold">Advanced</Tag>
          </div>
        </div>
      </Footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .layout {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        `
      }} />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/concepts/:frameworkId" element={<ConceptsPage />} />
        <Route path="/concept/:frameworkId/:conceptId" element={<ConceptDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/frameworks" element={<FrameworksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
