import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Button, Space, Spin, Badge, Tag, Avatar, Statistic, Divider } from 'antd';
import { BookOutlined, CodeOutlined, BulbOutlined, RocketOutlined, StarOutlined, TrophyOutlined, FireOutlined, HeartOutlined, CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ConceptsPage from './pages/ConceptsPage';
import ConceptDetailPage from './pages/ConceptDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FrameworksPage from './pages/admin/FrameworksPage';
import Features from './pages/Features';
import About from './pages/About';

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
              Learn Programming
              <br />
              <span style={{ color: '#1890ff' }}>the Visual Way</span>
            </Title>
            
            <Paragraph style={{ 
              fontSize: '20px', 
              color: '#666', 
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Say goodbye to boring programming tutorials. Visual Learning offers a comprehensive suite of 
              interactive concepts that cover all aspects of modern programming through intuitive metaphors.
            </Paragraph>
            


            {/* Stats Row */}
            <Row gutter={[48, 24]} justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Col xs={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: '#1890ff', margin: '0 0 8px 0', fontSize: '2.5rem' }}>
                    {stats.totalConcepts}+
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Interactive Concepts
                  </Paragraph>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: '#52c41a', margin: '0 0 8px 0', fontSize: '2.5rem' }}>
                    {stats.totalFrameworks}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Programming Frameworks
                  </Paragraph>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: '#722ed1', margin: '0 0 8px 0', fontSize: '2.5rem' }}>
                    100%
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Visual Learning
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Features Section */}
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
                Visual Learning is designed to make your programming journey easier and more efficient.
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    height: '100%'
                  }}
                  bodyStyle={{ padding: '32px' }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <BookOutlined style={{ fontSize: '24px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '16px' }}>
                    Visual Metaphors
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                    Complex programming concepts explained through intuitive real-world analogies that make learning engaging and memorable.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    height: '100%'
                  }}
                  bodyStyle={{ padding: '32px' }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <BulbOutlined style={{ fontSize: '24px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '16px' }}>
                    Interactive Stories
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                    Character-driven narratives that guide you through programming concepts with step-by-step explanations and real-world scenarios.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    height: '100%'
                  }}
                  bodyStyle={{ padding: '32px' }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'linear-gradient(135deg, #fa541c 0%, #d4380d 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <StarOutlined style={{ fontSize: '24px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: '16px' }}>
                    AI-Powered Learning
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                    Advanced AI generates personalized content and suggests learning paths tailored to your skill level and interests.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Frameworks Section */}
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
                Choose Your Learning Path
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Explore programming frameworks through interactive concepts designed for all skill levels.
              </Paragraph>
            </div>
            
            {loading ? (
              <Row justify="center">
                <Col>
                  <Spin size="large" />
                  <Paragraph style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
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
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #f0f0f0',
                        boxShadow: hoveredCard === framework.id 
                          ? '0 8px 24px rgba(24, 144, 255, 0.15)' 
                          : '0 2px 8px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        transform: hoveredCard === framework.id ? 'translateY(-4px)' : 'translateY(0)',
                        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                      onMouseEnter={() => setHoveredCard(framework.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      bodyStyle={{ padding: '32px' }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <Avatar 
                          size={64} 
                          icon={getFrameworkIcon(framework.name)}
                          style={{ 
                            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                            fontSize: '28px'
                          }}
                        />
                      </div>
                      
                      <Title level={4} style={{ 
                        color: '#1a1a1a', 
                        textAlign: 'center',
                        marginBottom: '16px',
                        fontWeight: '600'
                      }}>
                        {framework.name} Concepts
                      </Title>
                      
                      <Paragraph style={{ 
                        color: '#666', 
                        textAlign: 'center',
                        marginBottom: '24px',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {framework.concepts && framework.concepts.length > 0 
                          ? `Explore ${framework.concepts.length} concepts with visual metaphors and interactive examples.`
                          : `Discover ${framework.name} concepts through real-world analogies and step-by-step guides.`
                        }
                      </Paragraph>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <Badge 
                          count={framework.concepts?.length || 0} 
                          style={{ backgroundColor: '#1890ff' }}
                        />
                        <Tag color={getDifficultyColor(framework.concepts || [])} style={{ fontWeight: '500' }}>
                          {framework.concepts?.some((c: any) => c.difficulty === 'advanced') ? 'Advanced' :
                           framework.concepts?.some((c: any) => c.difficulty === 'intermediate') ? 'Intermediate' : 'Beginner'}
                        </Tag>
                      </div>
                      
                      <Button 
                        type="primary" 
                        block
                        style={{
                          borderRadius: '8px',
                          height: '48px',
                          fontWeight: '600',
                          background: '#1890ff',
                          border: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#40a9ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#1890ff';
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

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
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
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
