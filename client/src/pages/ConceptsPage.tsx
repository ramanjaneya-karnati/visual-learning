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
  Progress,
  Statistic
} from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  CodeOutlined, 
  BulbOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  RocketOutlined,
  FireOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Footer from '../components/Footer';

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
      <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          background: 'rgb(245, 238, 233)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 12px 32px rgba(18, 113, 91, 0.3)',
            animation: 'pulse 2s infinite'
          }}>
            <BookOutlined style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <Paragraph style={{ 
            marginTop: '16px', 
            color: '#12715b',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            Loading {frameworkId} concepts...
          </Paragraph>
        </div>
      </Layout>
    );
  }

  if (!framework) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Content style={{ 
          padding: '50px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'rgb(245, 238, 233)'
        }}>
          <Title level={2} style={{ 
            color: '#12715b',
            fontFamily: '"Open Sans", sans-serif',
            marginBottom: '24px'
          }}>
            Framework not found
          </Title>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/')}
            style={{
              height: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
              border: 'none',
              fontFamily: '"Open Sans", sans-serif',
              boxShadow: '0 8px 24px rgba(18, 113, 91, 0.3)'
            }}
          >
            Go Back Home
          </Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Combined Header and Hero Section */}
      <div style={{ 
        background: 'rgb(245, 238, 233)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Header style={{ 
          background: 'transparent', 
          padding: '0 20px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: '"Open Sans", sans-serif',
          borderBottom: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              style={{ 
                color: '#12715b', 
                marginRight: '16px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: '"Open Sans", sans-serif'
              }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            {getFrameworkIcon(framework.name)}
            <Title level={4} style={{ 
              color: '#1a1a1a', 
              margin: 0, 
              marginLeft: '12px', 
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              {framework.name} Learning Path
            </Title>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px'
          }}>
            <Tag color="#12715b" style={{ 
              margin: 0, 
              fontWeight: 'bold', 
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '12px'
            }}>
              <StarOutlined /> {stats.totalConcepts} Concepts
            </Tag>
            <Tag color="#12715b" style={{ 
              margin: 0, 
              fontWeight: 'bold', 
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '12px'
            }}>
              <ClockCircleOutlined /> {stats.totalTime} min
            </Tag>
          </div>
        </Header>
        
        {/* Hero Section */}
        <div style={{ 
          padding: '120px 20px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          background: 'linear-gradient(135deg, rgb(245, 238, 233) 0%, rgba(18, 113, 91, 0.05) 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Framework Icon and Badge */}
            <div style={{ 
              marginBottom: '30px',
              animation: 'fadeInDown 1s ease-out'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                borderRadius: '50%',
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(18, 113, 91, 0.3)',
                position: 'relative'
              }}>
                <div style={{ fontSize: '32px', color: 'white' }}>
                  {getFrameworkIcon(framework.name)}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#12715b',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  border: '2px solid rgb(245, 238, 233)'
                }}>
                  {framework.concepts.length}
                </div>
              </div>
            </div>

            {/* Main Title */}
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '20px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif',
              animation: 'fadeInUp 1s ease-out 0.2s both',
              lineHeight: '1.2'
            }}>
              Master {framework.name}
              <br />
              <span style={{ 
                fontWeight: 300,
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '12px',
                position: 'relative',
                background: 'rgba(18, 113, 91, 0.1)',
                border: '2px solid rgba(18, 113, 91, 0.2)',
                boxShadow: '0 4px 12px rgba(18, 113, 91, 0.15)',
                color: '#12715b'
              }}>
                with Learnify
              </span>
            </Title>
            
            {/* Subtitle */}
            <Paragraph style={{ 
              fontSize: '16px', 
              color: '#666', 
              marginBottom: '32px',
              animation: 'fadeInUp 1s ease-out 0.4s both',
              fontFamily: '"Open Sans", sans-serif',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Explore {framework.name} concepts through intuitive metaphors, interactive stories, 
              and hands-on examples designed to make learning engaging and memorable.
            </Paragraph>

            {/* Enhanced Stats Row */}
            <Row gutter={[24, 24]} justify="center" style={{ 
              maxWidth: '900px', 
              margin: '0 auto 48px',
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0 16px 0 60px'
                  }} />
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Total Concepts</span>}
                    value={stats.totalConcepts}
                    prefix={<BookOutlined style={{ color: 'white', fontSize: '20px' }} />}
                    valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                    style={{ textAlign: 'center', padding: '8px 0' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0 16px 0 60px'
                  }} />
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Total Time</span>}
                    value={stats.totalTime}
                    suffix="min"
                    prefix={<ClockCircleOutlined style={{ color: 'white', fontSize: '20px' }} />}
                    valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                    style={{ textAlign: 'center', padding: '8px 0' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0 16px 0 60px'
                  }} />
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Beginner</span>}
                    value={stats.beginnerCount}
                    prefix={<CheckCircleOutlined style={{ color: 'white', fontSize: '20px' }} />}
                    valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                    style={{ textAlign: 'center', padding: '8px 0' }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card style={{ 
                  background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0 16px 0 60px'
                  }} />
                  <Statistic
                    title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Advanced</span>}
                    value={stats.advancedCount}
                    prefix={<TrophyOutlined style={{ color: 'white', fontSize: '20px' }} />}
                    valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                    style={{ textAlign: 'center', padding: '8px 0' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Progress Section */}
            <div style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 0.8s both'
            }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.8)', 
                padding: '24px', 
                borderRadius: '16px',
                border: '1px solid rgba(18, 113, 91, 0.1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Text strong style={{ color: '#1a1a1a', fontFamily: '"Open Sans", sans-serif', fontSize: '16px' }}>Learning Progress</Text>
                  <Text strong style={{ color: '#12715b', fontFamily: '"Open Sans", sans-serif', fontSize: '16px' }}>{stats.totalConcepts} concepts</Text>
                </div>
                <Progress 
                  percent={0} 
                  strokeColor={{
                    '0%': '#12715b',
                    '100%': '#0f5f4a',
                  }}
                  showInfo={false}
                  style={{ marginBottom: '0' }}
                  strokeWidth={10}
                  trailColor="rgba(18, 113, 91, 0.1)"
                />
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '16px',
                  color: '#666',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '14px'
                }}>
                  Start your learning journey today!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Content style={{ padding: '0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Stats Section */}
          <Row gutter={[16, 16]} style={{ 
            marginBottom: '40px',
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}>
            <Col xs={12} md={6}>
              <Card style={{ 
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0 16px 0 60px'
                }} />
                <Statistic
                  title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Total Concepts</span>}
                  value={stats.totalConcepts}
                  prefix={<BookOutlined style={{ color: 'white', fontSize: '20px' }} />}
                  valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                  style={{ textAlign: 'center', padding: '8px 0' }}
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card style={{ 
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0 16px 0 60px'
                }} />
                <Statistic
                  title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Total Time</span>}
                  value={stats.totalTime}
                  suffix="min"
                  prefix={<ClockCircleOutlined style={{ color: 'white', fontSize: '20px' }} />}
                  valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                  style={{ textAlign: 'center', padding: '8px 0' }}
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card style={{ 
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0 16px 0 60px'
                }} />
                <Statistic
                  title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Beginner</span>}
                  value={stats.beginnerCount}
                  prefix={<CheckCircleOutlined style={{ color: 'white', fontSize: '20px' }} />}
                  valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                  style={{ textAlign: 'center', padding: '8px 0' }}
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card style={{ 
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(18, 113, 91, 0.25)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0 16px 0 60px'
                }} />
                <Statistic
                  title={<span style={{ color: 'white', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>Advanced</span>}
                  value={stats.advancedCount}
                  prefix={<TrophyOutlined style={{ color: 'white', fontSize: '20px' }} />}
                  valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}
                  style={{ textAlign: 'center', padding: '8px 0' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Concepts Grid */}
          <Title level={2} style={{ 
            textAlign: 'center', 
            color: '#1a1a1a', 
            marginBottom: '40px',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: '"Open Sans", sans-serif'
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
                    background: '#ffffff',
                    border: hoveredCard === concept.id 
                      ? '2px solid #12715b' 
                      : '1px solid #e8e8e8',
                    boxShadow: hoveredCard === concept.id 
                      ? '0 16px 40px rgba(18, 113, 91, 0.15)' 
                      : '0 8px 24px rgba(0,0,0,0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        background: '#12715b',
                        transition: 'all 0.3s ease',
                        fontSize: '32px',
                        boxShadow: '0 4px 12px rgba(18, 113, 91, 0.3)'
                      }}
                    />
                  </div>
                  
                  <Title level={4} style={{ 
                    color: '#1a1a1a', 
                    textAlign: 'center',
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    {concept.title}
                  </Title>
                  
                  <Paragraph style={{ 
                    color: '#666', 
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    {concept.description}
                  </Paragraph>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Tag color={getDifficultyColor(concept.difficulty)} style={{ 
                      fontWeight: 'bold', 
                      fontSize: '12px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      {getDifficultyText(concept.difficulty)}
                    </Tag>
                    {concept.estimatedTime && (
                      <Tag color="#12715b" style={{ 
                        fontWeight: 'bold', 
                        fontSize: '12px',
                        fontFamily: '"Open Sans", sans-serif'
                      }}>
                        ⏱️ {concept.estimatedTime}
                      </Tag>
                    )}
                  </div>
                  
                  <Divider style={{ margin: '16px 0' }} />
                  
                  <div style={{ 
                    background: 'rgb(245, 238, 233)', 
                    padding: '16px', 
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e8e8e8'
                  }}>
                    <Text strong style={{ 
                      display: 'block', 
                      marginBottom: '8px',
                      color: '#1a1a1a',
                      fontSize: '14px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      💡 Visual Metaphor:
                    </Text>
                    <Text style={{ 
                      fontSize: '13px', 
                      color: '#666',
                      lineHeight: '1.5',
                      fontFamily: '"Open Sans", sans-serif'
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
                      background: '#12715b',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(18, 113, 91, 0.3)',
                      fontFamily: '"Open Sans", sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0f5f4a';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 113, 91, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#12715b';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 113, 91, 0.3)';
                    }}
                  >
                    Start Learning →
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <Footer />

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
          
          /* Responsive Design for Concepts Page */
          @media (max-width: 768px) {
            .ant-layout-header {
              padding: 0 16px !important;
              height: 60px !important;
            }
            
            .ant-typography h1 {
              font-size: 2rem !important;
              line-height: 1.1 !important;
            }
            
            .ant-typography h2 {
              font-size: 1.5rem !important;
            }
            
            .ant-typography h3 {
              font-size: 1.25rem !important;
            }
            
            .ant-typography h4 {
              font-size: 1.1rem !important;
            }
            
            .hero-section {
              padding: 80px 16px 50px !important;
            }
            
            .content-section {
              padding: 30px 16px !important;
            }
            
            .ant-btn {
              height: 44px !important;
              padding: 0 20px !important;
              font-size: 14px !important;
            }
            
            .ant-card {
              margin-bottom: 12px !important;
            }
            
            .ant-row {
              margin: 0 -6px !important;
            }
            
            .ant-col {
              padding: 0 6px !important;
            }
            
            .ant-tag {
              font-size: 11px !important;
              padding: 4px 8px !important;
            }
            
            .framework-icon {
              width: 60px !important;
              height: 60px !important;
            }
            
            .framework-icon-badge {
              width: 20px !important;
              height: 20px !important;
              font-size: 9px !important;
            }
          }
          
          @media (max-width: 576px) {
            .ant-layout-header {
              padding: 0 12px !important;
              height: 50px !important;
            }
            
            .ant-typography h1 {
              font-size: 1.75rem !important;
            }
            
            .ant-typography h2 {
              font-size: 1.5rem !important;
            }
            
            .hero-section {
              padding: 60px 12px 40px !important;
            }
            
            .content-section {
              padding: 20px 12px !important;
            }
            
            .ant-btn {
              height: 40px !important;
              padding: 0 16px !important;
              font-size: 13px !important;
            }
            
            .ant-tag {
              font-size: 10px !important;
              padding: 2px 6px !important;
            }
            
            .framework-icon {
              width: 50px !important;
              height: 50px !important;
            }
            
            .framework-icon-badge {
              width: 18px !important;
              height: 18px !important;
              font-size: 8px !important;
            }
            
            .ant-card-body {
              padding: 16px !important;
            }
          }
          
          @media (max-width: 480px) {
            .ant-layout-header {
              padding: 0 8px !important;
            }
            
            .ant-typography h1 {
              font-size: 1.5rem !important;
            }
            
            .hero-section {
              padding: 50px 8px 30px !important;
            }
            
            .content-section {
              padding: 15px 8px !important;
            }
            
            .ant-btn {
              height: 36px !important;
              padding: 0 12px !important;
              font-size: 12px !important;
            }
            
            .ant-card-body {
              padding: 12px !important;
            }
            
            .ant-tag {
              font-size: 9px !important;
              padding: 1px 4px !important;
            }
          }
          
          /* Tablet Styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-section {
              padding: 140px 40px 80px !important;
            }
            
            .content-section {
              padding: 60px 40px !important;
            }
            
            .ant-typography h1 {
              font-size: 3.5rem !important;
            }
          }
          
          /* Large Desktop Styles */
          @media (min-width: 1200px) {
            .hero-section {
              padding: 180px 60px 120px !important;
            }
            
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
          .ant-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          /* Header Responsive Adjustments */
          @media (max-width: 768px) {
            .header-title {
              font-size: 14px !important;
              margin-left: 8px !important;
            }
            
            .header-tags {
              gap: 8px !important;
            }
            
            .back-button {
              font-size: 12px !important;
              margin-right: 12px !important;
            }
          }
          
          @media (max-width: 576px) {
            .header-title {
              font-size: 12px !important;
              margin-left: 6px !important;
            }
            
            .header-tags {
              gap: 6px !important;
            }
            
            .back-button {
              font-size: 11px !important;
              margin-right: 8px !important;
            }
          }
        `
      }} />
    </Layout>
  );
};

export default ConceptsPage; 