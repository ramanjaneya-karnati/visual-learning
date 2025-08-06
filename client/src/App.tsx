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

  const scrollToLearningPaths = () => {
    const element = document.getElementById('learning-paths-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BookOutlined style={{ fontSize: '28px', color: '#12715b', marginRight: '12px' }} />
            <Title level={4} style={{ 
              color: '#1a1a1a', 
              margin: 0, 
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Learnify
            </Title>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            alignItems: 'center'
          }}>
            <Button 
              type="text" 
              style={{ 
                color: '#1a1a1a',
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 16px'
              }}
              onClick={() => navigate('/features')}
            >
              Features
            </Button>
            <Button 
              type="text" 
              style={{ 
                color: '#1a1a1a',
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 16px'
              }}
              onClick={() => navigate('/about')}
            >
              About
            </Button>
            <Button 
              type="primary"
              style={{
                background: '#12715b',
                border: 'none',
                borderRadius: '8px',
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 16px'
              }}
              onClick={scrollToLearningPaths}
            >
              Start Learning
            </Button>
          </div>
        </Header>

        {/* Hero Section */}
        <div style={{ 
          padding: '120px 20px 80px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Main Title */}
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '20px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif',
              lineHeight: '1.2'
            }}>
              Master Programming
              <br />
              <span style={{ 
                fontWeight: 300,
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '12px',
                position: 'relative',
                background: 'rgba(18, 113, 91, 0.1)',
                border: '2px solid rgba(18, 113, 91, 0.2)',
                marginTop: '8px'
              }}>
                Through Visual Learning
              </span>
            </Title>
            
            {/* Subtitle */}
            <Paragraph style={{ 
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Transform complex programming concepts into intuitive visual metaphors. 
              Learn React, Angular, Next.js, and advanced patterns through interactive stories and real-world scenarios.
            </Paragraph>
            
            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              <Button 
                type="primary"
                size="large"
                style={{
                  height: '48px',
                  padding: '0 24px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                  border: 'none',
                  fontFamily: '"Open Sans", sans-serif',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(18, 113, 91, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={scrollToLearningPaths}
              >
                Start Learning Journey
              </Button>
              <Button 
                size="large"
                style={{
                  height: '48px',
                  padding: '0 24px',
                  borderRadius: '8px',
                  fontFamily: '"Open Sans", sans-serif',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '2px solid #12715b',
                  color: '#12715b',
                  background: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/features')}
              >
                Explore Features
              </Button>
            </div>
            
            {/* Stats */}
            <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '40px' }}>
              <Col xs={12} sm={6} md={6}>
                <Statistic
                  title="Frameworks"
                  value={stats.totalFrameworks}
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} sm={6} md={6}>
                <Statistic
                  title="Concepts"
                  value={stats.totalConcepts}
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} sm={6} md={6}>
                <Statistic
                  title="Interactive Stories"
                  value={stats.totalConcepts * 2}
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col xs={12} sm={6} md={6}>
                <Statistic
                  title="Learning Hours"
                  value={stats.totalConcepts * 3}
                  valueStyle={{ 
                    color: '#12715b', 
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Content style={{ padding: '0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
          {/* How It Works Section */}
          <div style={{ 
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ 
              color: '#1a1a1a', 
              marginBottom: '12px',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              How It Works
            </Title>
            <Paragraph style={{ 
              fontSize: '16px', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Our unique approach combines visual metaphors with interactive learning to make complex programming concepts accessible and engaging.
            </Paragraph>
            
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  padding: '24px',
                  background: 'rgb(245, 238, 233)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    width: '100%'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#12715b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}>
                      <BookOutlined style={{ fontSize: '20px', color: 'white' }} />
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#12715b'
                    }}>
                      1
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      marginBottom: '12px',
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Choose Your Path
                    </Title>
                    <Paragraph style={{ 
                      color: '#666', 
                      margin: 0, 
                      lineHeight: '1.5',
                      fontSize: '14px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Select from React, Angular, Next.js, or explore advanced programming patterns. Each framework offers a unique learning path.
                    </Paragraph>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  padding: '24px',
                  background: 'rgb(245, 238, 233)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    width: '100%'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#12715b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}>
                      <BulbOutlined style={{ fontSize: '20px', color: 'white' }} />
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#12715b'
                    }}>
                      2
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      marginBottom: '12px',
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Explore Visual Concepts
                    </Title>
                    <Paragraph style={{ 
                      color: '#666', 
                      margin: 0, 
                      lineHeight: '1.5',
                      fontSize: '14px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Dive into interactive concepts with visual metaphors, real-world analogies, and step-by-step explanations that make learning engaging.
                    </Paragraph>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  padding: '24px',
                  background: 'rgb(245, 238, 233)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    width: '100%'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#12715b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}>
                      <RocketOutlined style={{ fontSize: '20px', color: 'white' }} />
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#12715b'
                    }}>
                      3
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ 
                      color: '#1a1a1a', 
                      marginBottom: '12px',
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Apply & Master
                    </Title>
                    <Paragraph style={{ 
                      color: '#666', 
                      margin: 0, 
                      lineHeight: '1.5',
                      fontSize: '14px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Apply your knowledge with interactive exercises, real-world scenarios, and hands-on coding challenges that reinforce learning.
                    </Paragraph>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

        {/* Frameworks Section */}
        <div id="learning-paths-section" style={{ 
          padding: '60px 20px', 
          background: 'rgb(245, 238, 233)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Title level={2} style={{ 
                color: '#1a1a1a', 
                marginBottom: '12px',
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                <span>Featured </span>
                <span style={{ fontWeight: 300 }}>Learning Paths</span>
              </Title>
              <Paragraph style={{ 
                fontSize: '16px', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                Dive into structured learning paths designed to help you master popular programming frameworks and advanced concepts.
              </Paragraph>
            </div>
            
            {loading ? (
              <Row justify="center">
                <Col>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: '40px 20px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      boxShadow: '0 8px 24px rgba(18, 113, 91, 0.3)',
                      animation: 'pulse 2s infinite'
                    }}>
                      <BookOutlined style={{ fontSize: '24px', color: 'white' }} />
                    </div>
                    <Paragraph style={{ 
                      textAlign: 'center', 
                      marginTop: '16px', 
                      color: '#12715b',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      Loading frameworks...
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row gutter={[32, 32]} justify="center">
                {frameworks.map((framework, index) => (
                  <Col xs={24} md={12} lg={8} key={framework.id}>
                    <div 
                      onClick={() => handleFrameworkClick(framework.id)}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid #e8e8e8',
                        boxShadow: hoveredCard === framework.id 
                          ? '0 16px 40px rgba(18, 113, 91, 0.15)' 
                          : '0 8px 24px rgba(0,0,0,0.08)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredCard === framework.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                        animation: `slideInUp 0.8s ease-out ${index * 0.1}s both`,
                        background: '#ffffff',
                        position: 'relative',
                        fontFamily: '"Open Sans", sans-serif'
                      }}
                      onMouseEnter={() => setHoveredCard(framework.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Card Header */}
                      <div style={{
                        background: '#12715b',
                        padding: '32px 24px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                          <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)'
                          }}>
                            {getFrameworkIcon(framework.name)}
                          </div>
                          <Title level={4} style={{ 
                            color: '#ffffff', 
                            margin: 0,
                            fontWeight: '600',
                            fontSize: '1.25rem',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            {framework.name}
                          </Title>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '12px',
                            fontWeight: '500',
                            marginTop: '4px',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            Programming Framework
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div style={{ padding: '24px' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          marginBottom: '16px'
                        }}>
                          <div style={{
                            background: '#f8f9fa',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            border: '1px solid #e9ecef'
                          }}>
                            <span style={{ 
                              color: '#495057', 
                              fontSize: '12px', 
                              fontWeight: '600',
                              fontFamily: '"Open Sans", sans-serif'
                            }}>
                              {framework.concepts?.length || 0} Concepts
                            </span>
                          </div>
                          <Tag 
                            color={getDifficultyColor(framework.concepts || [])} 
                            style={{ 
                              fontWeight: '600',
                              borderRadius: '8px',
                              padding: '4px 12px',
                              fontSize: '11px',
                              fontFamily: '"Open Sans", sans-serif'
                            }}
                          >
                            {framework.concepts?.some((c: any) => c.difficulty === 'advanced') ? 'Advanced' :
                             framework.concepts?.some((c: any) => c.difficulty === 'intermediate') ? 'Intermediate' : 'Beginner'}
                          </Tag>
                        </div>
                        
                        <Paragraph style={{ 
                          color: '#6c757d', 
                          textAlign: 'left',
                          marginBottom: '20px',
                          fontSize: '13px',
                          lineHeight: '1.5',
                          minHeight: '50px',
                          fontFamily: '"Open Sans", sans-serif'
                        }}>
                          {framework.concepts && framework.concepts.length > 0 
                            ? `Master ${framework.name} with ${framework.concepts.length} interactive concepts and visual metaphors.`
                            : `Learn ${framework.name} through visual metaphors and interactive examples.`
                          }
                        </Paragraph>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#12715b'
                            }} />
                            <span style={{ 
                              color: '#6c757d', 
                              fontSize: '11px',
                              fontWeight: '500',
                              fontFamily: '"Open Sans", sans-serif'
                            }}>
                              Interactive
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#12715b'
                            }} />
                            <span style={{ 
                              color: '#6c757d', 
                              fontSize: '11px',
                              fontWeight: '500',
                              fontFamily: '"Open Sans", sans-serif'
                            }}>
                              Visual
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          type="primary" 
                          block
                          style={{
                            borderRadius: '8px',
                            height: '40px',
                            fontWeight: '600',
                            background: '#12715b',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            fontSize: '13px',
                            fontFamily: '"Open Sans", sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#0f5f4a';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 113, 91, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#12715b';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <BookOutlined style={{ fontSize: '12px' }} />
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
      </Content>
      
      <Footer style={{ 
        background: 'white',
        borderTop: '1px solid #f0f0f0',
        padding: '60px 50px 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <BookOutlined style={{ fontSize: '28px', color: '#12715b', marginRight: '12px' }} />
                <Title level={4} style={{ color: '#1a1a1a', margin: 0, fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}>
                  Learnify
                </Title>
              </div>
              <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6', marginBottom: '24px', fontFamily: '"Open Sans", sans-serif' }}>
                Making programming concepts accessible through visual metaphors and interactive learning experiences designed for modern developers.
              </Paragraph>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: '#1a1a1a', 
                  marginBottom: '12px',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Global Headquarters
                </div>
                <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', fontFamily: '"Open Sans", sans-serif' }}>
                  San Francisco, CA<br />
                  United States<br />
                  hello@learnify.dev
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={8}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  color: '#1a1a1a', 
                  marginBottom: '16px',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Company
                </div>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  lineHeight: '2',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="/about" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      About Us
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="/features" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Features
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Learning Paths
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Interactive Stories
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            
            <Col xs={24} md={8}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  color: '#1a1a1a', 
                  marginBottom: '16px',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Quick Links
                </div>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  lineHeight: '2',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      React Concepts
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Vue.js Tutorials
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Angular Guides
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Node.js Concepts
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  color: '#1a1a1a', 
                  marginBottom: '16px',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Our Newsletter
                </div>
                <div style={{ 
                  color: '#666', 
                  fontSize: '14px', 
                  marginBottom: '16px',
                  lineHeight: '1.6',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Subscribe to our newsletter and we will inform you about newest concepts and learning paths.
                </div>
                <div style={{
                  display: 'flex',
                  background: '#ffffff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e8e8e8'
                }}>
                  <input 
                    type="email" 
                    placeholder="Email Address..." 
                    style={{
                      flex: 1,
                      border: 'none',
                      padding: '12px 16px',
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}
                  />
                  <button style={{
                    background: '#12715b',
                    border: 'none',
                    color: 'white',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    fontFamily: '"Open Sans", sans-serif'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#0f5f4a'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#12715b'}
                  >
                    <ArrowRightOutlined />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          
          <Divider style={{ margin: '40px 0 24px 0' }} />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ color: '#666', fontSize: '14px', fontFamily: '"Open Sans", sans-serif' }}>
              © 2024 <span style={{ fontWeight: 600, color: '#12715b' }}>Learnify</span>. All Rights Reserved. 
              Making programming accessible through visual learning.
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ 
                color: '#666', 
                fontSize: '16px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{ 
                color: '#666', 
                fontSize: '16px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                <i className="fab fa-github"></i>
              </a>
              <a href="#" style={{ 
                color: '#666', 
                fontSize: '16px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </Footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            font-family: "Open Sans", sans-serif;
          }
          
          @keyframes slideInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInLeft {
            from {
              transform: translateX(-30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeInRight {
            from {
              transform: translateX(30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeInDown {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes blink {
            0%, 50%, 100% {
              opacity: 1;
            }
            25%, 75% {
              opacity: 0.5;
            }
          }
          
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -30px, 0);
            }
            70% {
              transform: translate3d(0, -15px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
          
          @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .ant-layout-header {
              padding: 0 16px !important;
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
            
            .ant-statistic-title {
              font-size: 12px !important;
            }
            
            .ant-statistic-content {
              font-size: 1.5rem !important;
            }
          }
          
          @media (max-width: 576px) {
            .ant-layout-header {
              padding: 0 12px !important;
              height: 60px !important;
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
            
            .ant-statistic-title {
              font-size: 11px !important;
            }
            
            .ant-statistic-content {
              font-size: 1.25rem !important;
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
          }
          
          /* Tablet Styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-section {
              padding: 100px 30px 70px !important;
            }
            
            .content-section {
              padding: 40px 30px !important;
            }
            
            .ant-typography h1 {
              font-size: 2.5rem !important;
            }
          }
          
          /* Large Desktop Styles */
          @media (min-width: 1200px) {
            .hero-section {
              padding: 140px 50px 100px !important;
            }
            
            .content-section {
              padding: 60px 50px !important;
            }
            
            .ant-typography h1 {
              font-size: 3rem !important;
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
