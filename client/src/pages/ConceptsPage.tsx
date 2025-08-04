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
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  CodeOutlined, 
  BulbOutlined,
  PlayCircleOutlined,
  StarOutlined
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
      }
    } catch (error) {
      console.error('Error fetching concepts:', error);
    } finally {
      setLoading(false);
    }
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

  const handleConceptClick = (conceptId: string) => {
    navigate(`/concept/${frameworkId}/${conceptId}`);
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (!framework) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2}>Framework not found</Title>
          <Button type="primary" onClick={() => navigate('/')}>
            Go Back Home
          </Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#001529', padding: '0 50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            style={{ color: 'white', marginRight: '16px' }}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          <BookOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            {framework.name} Concepts
          </Title>
        </div>
      </Header>
      
      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} lg={20}>
              <Card style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ color: '#1890ff', marginBottom: '8px' }}>
                  Master {framework.name} with Visual Learning
                </Title>
                <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '0' }}>
                  Explore {framework.name} concepts through intuitive metaphors and interactive examples. 
                  Each concept is designed to make learning engaging and memorable.
                </Paragraph>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[24, 24]}>
            {framework.concepts.map((concept) => (
              <Col xs={24} md={12} lg={8} key={concept.id}>
                <Card 
                  hoverable 
                  style={{ height: '100%' }}
                  onClick={() => handleConceptClick(concept.id)}
                  actions={[
                    <Button 
                      type="primary" 
                      icon={<PlayCircleOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConceptClick(concept.id);
                      }}
                    >
                      Start Learning
                    </Button>
                  ]}
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Avatar 
                      size={64} 
                      icon={<CodeOutlined />} 
                      style={{ backgroundColor: '#1890ff' }}
                    />
                  </div>
                  
                  <Title level={4} style={{ textAlign: 'center', marginBottom: '8px' }}>
                    {concept.title}
                  </Title>
                  
                  <Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: '16px' }}>
                    {concept.description}
                  </Paragraph>
                  
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Tag color={getDifficultyColor(concept.difficulty)}>
                      {getDifficultyText(concept.difficulty)}
                    </Tag>
                    {concept.estimatedTime && (
                      <Tag color="blue">
                        ⏱️ {concept.estimatedTime}
                      </Tag>
                    )}
                  </div>
                  
                  <Divider style={{ margin: '16px 0' }} />
                  
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px' }}>
                    <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                      💡 Visual Metaphor:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#666' }}>
                      {concept.metaphor}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ConceptsPage; 