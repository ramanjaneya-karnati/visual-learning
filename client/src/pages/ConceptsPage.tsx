import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Spin, 
  Tag,
  Avatar,
  Divider,
  Badge,
  Statistic,
  Progress,
  Tooltip
} from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  CodeOutlined, 
  BulbOutlined,
  PlayCircleOutlined,
  StarOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  RocketOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface Concept {
  id: string;
  title: string;
  description: string;
  metaphor: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  story?: any;
}

interface Framework {
  id: string;
  name: string;
  concepts: Concept[];
}

const ConceptsPage: React.FC = () => {
  const { frameworkId } = useParams<{ frameworkId: string }>();
  const navigate = useNavigate();
  const [framework, setFramework] = useState<Framework | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalConcepts: 0,
    beginnerCount: 0,
    intermediateCount: 0,
    advancedCount: 0,
    totalTime: 0
  });

  useEffect(() => {
    fetchConcepts();
  }, [frameworkId]);

  const fetchConcepts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/concepts');
      const data = await response.json();
      
      const selectedFramework = data.frameworks.find(
        (f: Framework) => f.id === frameworkId
      );
      
      if (selectedFramework) {
        setFramework(selectedFramework);
        calculateStats(selectedFramework.concepts);
      }
    } catch (error) {
      console.error('Error fetching concepts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (concepts: Concept[]) => {
    const beginnerCount = concepts.filter(c => c.difficulty === 'beginner').length;
    const intermediateCount = concepts.filter(c => c.difficulty === 'intermediate').length;
    const advancedCount = concepts.filter(c => c.difficulty === 'advanced').length;
    
    const totalTime = concepts.reduce((acc, concept) => {
      const time = concept.estimatedTime ? parseInt(concept.estimatedTime.split(' ')[0]) : 0;
      return acc + time;
    }, 0);

    setStats({
      totalConcepts: concepts.length,
      beginnerCount,
      intermediateCount,
      advancedCount,
      totalTime
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'orange';
      case 'advanced': return 'red';
      default: return 'blue';
    }
  };

  const getDifficultyText = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return 'All Levels';
    }
  };

  const getFrameworkIcon = (frameworkName: string) => {
    const name = frameworkName.toLowerCase();
    if (name.includes('react')) return <CodeOutlined style={{ fontSize: '24px', color: '#61dafb' }} />;
    if (name.includes('angular')) return <CodeOutlined style={{ fontSize: '24px', color: '#dd0031' }} />;
    if (name.includes('next')) return <RocketOutlined style={{ fontSize: '24px', color: '#000000' }} />;
    if (name.includes('advanced')) return <TrophyOutlined style={{ fontSize: '24px', color: '#ffd700' }} />;
    return <CodeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
  };

  const getConceptIcon = (conceptTitle: string) => {
    const title = conceptTitle.toLowerCase();
    if (title.includes('hook')) return <BulbOutlined />;
    if (title.includes('context')) return <BookOutlined />;
    if (title.includes('virtual')) return <CodeOutlined />;
    if (title.includes('suspense')) return <ClockCircleOutlined />;
    if (title.includes('fiber')) return <RocketOutlined />;
    if (title.includes('concurrent')) return <FireOutlined />;
    if (title.includes('server')) return <StarOutlined />;
    if (title.includes('lazy')) return <HeartOutlined />;
    return <CodeOutlined />;
  };

  const handleConceptClick = (conceptId: string) => {
    navigate(`/concept/${frameworkId}/${conceptId}`);
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          color: 'white'
        }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: '16px', color: 'white' }}>
            Loading {frameworkId} concepts...
          </Paragraph>
        </div>
      </Layout>
    );
  }

  if (!framework) {
    return (
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Content style={{ 
          padding: '50px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <Title level={2} style={{ color: 'white' }}>Framework not found</Title>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/')}
            style={{
              height: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
              border: 'none'
            }}
          >
            Go Back Home
          </Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Header style={{ 
        background: 'rgba(0, 21, 41, 0.95)', 
        backdropFilter: 'blur(10px)',
        padding: '0 50px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            style={{ 
              color: 'white', 
              marginRight: '16px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          {getFrameworkIcon(framework.name)}
          <Title level={3} style={{ color: 'white', margin: 0, marginLeft: '12px', fontWeight: 'bold' }}>
            {framework.name} Learning Path
          </Title>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Tag color="blue" style={{ margin: 0, fontWeight: 'bold' }}>
              <StarOutlined /> {stats.totalConcepts} Concepts
            </Tag>
            <Tag color="green" style={{ margin: 0, fontWeight: 'bold' }}>
              <ClockCircleOutlined /> {stats.totalTime} min
            </Tag>
          </div>
        </div>
      </Header>
      
      <Content style={{ padding: '0' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
          padding: '60px 50px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite'
          }} />
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '16px',
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              animation: 'fadeInUp 1s ease-out'
            }}>
              Master {framework.name}
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                with Visual Learning
              </span>
            </Title>
            
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#4a4a4a', 
              marginBottom: '32px',
              animation: 'fadeInUp 1s ease-out 0.2s both'
            }}>
              Explore {framework.name} concepts through intuitive metaphors, interactive stories, 
              and hands-on examples designed to make learning engaging and memorable.
            </Paragraph>

            {/* Stats Row */}
            <Row gutter={[32, 16]} justify="center" style={{ 
              maxWidth: '800px', 
              margin: '0 auto 32px',
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(24, 144, 255, 0.3)'
                }}>
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold' }}>Total Concepts</span>}
                    value={stats.totalConcepts}
                    prefix={<BookOutlined style={{ color: 'white' }} />}
                    valueStyle={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}
                    style={{ textAlign: 'center' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(82, 196, 26, 0.3)'
                }}>
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold' }}>Total Time</span>}
                    value={stats.totalTime}
                    suffix="min"
                    prefix={<ClockCircleOutlined style={{ color: 'white' }} />}
                    valueStyle={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}
                    style={{ textAlign: 'center' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(82, 196, 26, 0.3)'
                }}>
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold' }}>Beginner</span>}
                    value={stats.beginnerCount}
                    prefix={<CheckCircleOutlined style={{ color: 'white' }} />}
                    valueStyle={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}
                    style={{ textAlign: 'center' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #fa541c 0%, #d4380d 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(250, 84, 28, 0.3)'
                }}>
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold' }}>Advanced</span>}
                    value={stats.advancedCount}
                    prefix={<TrophyOutlined style={{ color: 'white' }} />}
                    valueStyle={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}
                    style={{ textAlign: 'center' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Progress Bar */}
            <div style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text strong style={{ color: '#1a1a1a' }}>Learning Progress</Text>
                <Text strong style={{ color: '#1a1a1a' }}>{stats.totalConcepts} concepts</Text>
              </div>
              <Progress 
                percent={0} 
                strokeColor={{
                  '0%': '#1890ff',
                  '100%': '#722ed1',
                }}
                showInfo={false}
                style={{ marginBottom: '0' }}
                strokeWidth={8}
              />
            </div>
          </div>
        </div>

        {/* Concepts Grid */}
        <div style={{ 
          padding: '40px 50px', 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          minHeight: '100vh'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ 
              textAlign: 'center', 
              color: '#1a1a1a', 
              marginBottom: '40px',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              Choose Your Learning Journey
            </Title>
            
            <Row gutter={[32, 32]} justify="center">
              {framework.concepts.map((concept, index) => (
                <Col xs={24} md={12} lg={8} key={concept.id}>
                  <Card 
                    hoverable
                    onClick={() => handleConceptClick(concept.id)}
                    style={{ 
                      cursor: 'pointer',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: hoveredCard === concept.id 
                        ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' 
                        : '#ffffff',
                      border: hoveredCard === concept.id 
                        ? '2px solid #1890ff' 
                        : '1px solid #e8e8e8',
                      boxShadow: hoveredCard === concept.id 
                        ? '0 12px 32px rgba(24, 144, 255, 0.2)' 
                        : '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      transform: hoveredCard === concept.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={() => setHoveredCard(concept.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <Avatar 
                        size={80} 
                        icon={getConceptIcon(concept.title)}
                        style={{ 
                          background: hoveredCard === concept.id 
                            ? 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
                            : 'linear-gradient(135deg, #722ed1 0%, #1890ff 100%)',
                          transition: 'all 0.3s ease',
                          fontSize: '32px',
                          boxShadow: '0 4px 12px rgba(114, 46, 209, 0.3)'
                        }}
                      />
                    </div>
                    
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      textAlign: 'center',
                      marginBottom: '12px',
                      fontWeight: 'bold'
                    }}>
                      {concept.title}
                    </Title>
                    
                    <Paragraph style={{ 
                      color: '#4a4a4a', 
                      textAlign: 'center',
                      marginBottom: '20px',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}>
                      {concept.description}
                    </Paragraph>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Tag color={getDifficultyColor(concept.difficulty)} style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        {getDifficultyText(concept.difficulty)}
                      </Tag>
                      {concept.estimatedTime && (
                        <Tag color="blue" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                          ⏱️ {concept.estimatedTime}
                        </Tag>
                      )}
                    </div>
                    
                    <Divider style={{ margin: '16px 0' }} />
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                      padding: '16px', 
                      borderRadius: '8px',
                      marginBottom: '20px',
                      border: '1px solid #e8e8e8'
                    }}>
                      <Text strong style={{ 
                        display: 'block', 
                        marginBottom: '8px',
                        color: '#1a1a1a',
                        fontSize: '14px'
                      }}>
                        💡 Visual Metaphor:
                      </Text>
                      <Text style={{ 
                        fontSize: '13px', 
                        color: '#4a4a4a',
                        lineHeight: '1.5'
                      }}>
                        {concept.metaphor}
                      </Text>
                    </div>
                    
                    <Button 
                      type="primary" 
                      block
                      icon={<PlayCircleOutlined />}
                      style={{
                        borderRadius: '8px',
                        height: '44px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(24, 144, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
                      }}
                    >
                      Start Learning →
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>

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
        `
      }} />
    </Layout>
  );
};

export default ConceptsPage; 