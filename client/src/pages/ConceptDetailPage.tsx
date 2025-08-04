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
  Steps,
  Alert,
  Collapse,
  Progress
} from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  CodeOutlined, 
  BulbOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

interface Concept {
  id: string;
  title: string;
  description: string;
  metaphor: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  content?: {
    overview: string;
    metaphor: string;
    examples: string[];
    practice: string;
  };
}

interface Framework {
  id: string;
  name: string;
  concepts: Concept[];
}

const ConceptDetailPage: React.FC = () => {
  const { frameworkId, conceptId } = useParams<{ frameworkId: string; conceptId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [framework, setFramework] = useState<Framework | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchConcept();
  }, [frameworkId, conceptId]);

  const fetchConcept = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/concepts');
      const data = await response.json();
      
      const selectedFramework = data.frameworks.find(
        (f: Framework) => f.id === frameworkId
      );
      
      if (selectedFramework) {
        setFramework(selectedFramework);
        const selectedConcept = selectedFramework.concepts.find(
          (c: Concept) => c.id === conceptId
        );
        if (selectedConcept) {
          setConcept(selectedConcept);
        }
      }
    } catch (error) {
      console.error('Error fetching concept:', error);
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

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setProgress(((step + 1) / 4) * 100);
  };

  const steps = [
    {
      title: 'Overview',
      icon: <EyeOutlined />,
      content: (
        <Card>
          <Title level={3}>Understanding {concept?.title}</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            {concept?.description}
          </Paragraph>
          <Alert
            message="Key Takeaway"
            description="This concept helps you build more efficient and maintainable applications."
            type="info"
            showIcon
            style={{ marginTop: '16px' }}
          />
        </Card>
      )
    },
    {
      title: 'Visual Metaphor',
      icon: <BulbOutlined />,
      content: (
        <Card>
          <Title level={3}>💡 Think of it like this...</Title>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '24px', 
            borderRadius: '12px',
            color: 'white',
            marginBottom: '16px'
          }}>
            <Paragraph style={{ fontSize: '18px', color: 'white', margin: 0 }}>
              {concept?.metaphor}
            </Paragraph>
          </div>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            This metaphor helps you understand the concept in familiar terms, making it easier to remember and apply.
          </Paragraph>
        </Card>
      )
    },
    {
      title: 'Examples',
      icon: <CodeOutlined />,
      content: (
        <Card>
          <Title level={3}>Real-World Examples</Title>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Basic Example" key="1">
              <div style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
                <Text code style={{ fontSize: '14px' }}>
                  // Example code will go here
                  console.log('Learning made easy!');
                </Text>
              </div>
            </Panel>
            <Panel header="Advanced Example" key="2">
              <div style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
                <Text code style={{ fontSize: '14px' }}>
                  // Advanced implementation
                  // More complex examples
                </Text>
              </div>
            </Panel>
          </Collapse>
        </Card>
      )
    },
    {
      title: 'Practice',
      icon: <ExperimentOutlined />,
      content: (
        <Card>
          <Title level={3}>Try it yourself!</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            Now it's your turn to practice this concept. The best way to learn is by doing!
          </Paragraph>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" size="large" icon={<PlayCircleOutlined />}>
              Start Interactive Exercise
            </Button>
            <Button size="large" icon={<BookOutlined />}>
              View Additional Resources
            </Button>
          </Space>
        </Card>
      )
    }
  ];

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

  if (!concept || !framework) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2}>Concept not found</Title>
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
            onClick={() => navigate(`/concepts/${frameworkId}`)}
          >
            Back to {framework.name}
          </Button>
          <BookOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            {concept.title}
          </Title>
        </div>
      </Header>
      
      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              <Card style={{ position: 'sticky', top: '24px' }}>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  Learning Progress
                </Title>
                <Progress 
                  percent={progress} 
                  status="active"
                  style={{ marginBottom: '24px' }}
                />
                <Steps
                  direction="vertical"
                  current={currentStep}
                  onChange={handleStepChange}
                  items={steps.map((step, index) => ({
                    title: step.title,
                    icon: step.icon,
                    description: `Step ${index + 1}`
                  }))}
                />
              </Card>
            </Col>
            
            <Col xs={24} lg={18}>
              <Card style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]} align="middle">
                  <Col>
                    <Avatar 
                      size={64} 
                      icon={<CodeOutlined />} 
                      style={{ backgroundColor: '#1890ff' }}
                    />
                  </Col>
                  <Col flex="1">
                    <Title level={2} style={{ margin: 0 }}>
                      {concept.title}
                    </Title>
                    <Space>
                      <Tag color={getDifficultyColor(concept.difficulty)}>
                        {getDifficultyText(concept.difficulty)}
                      </Tag>
                      {concept.estimatedTime && (
                        <Tag color="blue">
                          ⏱️ {concept.estimatedTime}
                        </Tag>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Card>
              
              {steps[currentStep]?.content}
              
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Space>
                  <Button 
                    disabled={currentStep === 0}
                    onClick={() => handleStepChange(currentStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="primary"
                    disabled={currentStep === steps.length - 1}
                    onClick={() => handleStepChange(currentStep + 1)}
                  >
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ConceptDetailPage; 