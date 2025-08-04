import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Card,
  Row,
  Col,
  message,
  Spin,
  Tag,
  Divider,
  Alert
} from 'antd';
import {
  RobotOutlined,
  PlusOutlined,
  ThunderboltOutlined,
  BookOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface AIConceptGeneratorProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

interface GeneratedConcept {
  title: string;
  description: string;
  metaphor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  story?: {
    title: string;
    scene: string;
    problem: string;
    solution: string;
    characters: Record<string, string>;
    mapping: Record<string, string>;
    realWorld: string;
  };
}

const AIConceptGenerator: React.FC<AIConceptGeneratorProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedConcept, setGeneratedConcept] = useState<GeneratedConcept | null>(null);
  const [popularConcepts, setPopularConcepts] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [frameworks, setFrameworks] = useState<Array<{ value: string; label: string }>>([]);
  const [loadingFrameworks, setLoadingFrameworks] = useState(false);

  // Fetch frameworks from database
  useEffect(() => {
    if (visible) {
      fetchFrameworks();
    }
  }, [visible]);

  const fetchFrameworks = async () => {
    try {
      setLoadingFrameworks(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/frameworks', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const frameworkOptions = data.frameworks.map((framework: any) => ({
          value: framework.id,
          label: framework.name
        }));
        setFrameworks(frameworkOptions);
      } else {
        console.error('Failed to fetch frameworks');
      }
    } catch (error) {
      console.error('Error fetching frameworks:', error);
    } finally {
      setLoadingFrameworks(false);
    }
  };

  const handleFrameworkChange = async (framework: string) => {
    setSelectedFramework(framework);
    if (framework) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/popular-concepts/${framework}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPopularConcepts(data.concepts || []);
        }
      } catch (error) {
        console.error('Error fetching popular concepts:', error);
      }
    }
  };

  const handleGenerateConcept = async (values: any) => {
    setGenerating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/generate-concept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          concept: values.concept,
          framework: values.framework
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedConcept(data.conceptData);
        message.success('Concept generated successfully!');
      } else {
        message.error('Failed to generate concept');
      }
    } catch (error) {
      console.error('Error generating concept:', error);
      message.error('Network error');
    } finally {
      setGenerating(false);
    }
  };

  const handleAutoCreate = async () => {
    if (!generatedConcept) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const values = form.getFieldsValue();
      
      const response = await fetch('/api/admin/auto-create-concept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          concept: values.concept,
          framework: values.framework
        })
      });

      if (response.ok) {
        message.success('Concept created successfully with AI-generated content!');
        onSuccess();
        onCancel();
        form.resetFields();
        setGeneratedConcept(null);
      } else {
        message.error('Failed to create concept');
      }
    } catch (error) {
      console.error('Error creating concept:', error);
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handlePopularConceptSelect = (concept: string) => {
    form.setFieldsValue({ concept });
  };

  return (
    <Modal
      title={
        <Space>
          <RobotOutlined style={{ color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            AI Concept Generator
          </Title>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      destroyOnClose
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Generate New Concept" size="small">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleGenerateConcept}
            >
              <Form.Item
                name="framework"
                label="Framework"
                rules={[{ required: true, message: 'Please select a framework' }]}
              >
                <Select
                  placeholder={loadingFrameworks ? "Loading frameworks..." : "Select framework"}
                  onChange={handleFrameworkChange}
                  showSearch
                  loading={loadingFrameworks}
                  disabled={loadingFrameworks}
                >
                  {frameworks.map(fw => (
                    <Option key={fw.value} value={fw.value}>
                      {fw.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="concept"
                label="Concept Name"
                rules={[{ required: true, message: 'Please enter concept name' }]}
              >
                <Input placeholder="e.g., App Router, Server Components, etc." />
              </Form.Item>

              {popularConcepts.length > 0 && (
                <Form.Item label="Popular Concepts">
                  <Space wrap>
                    {popularConcepts.map(concept => (
                      <Tag
                        key={concept}
                        color="blue"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePopularConceptSelect(concept)}
                      >
                        {concept}
                      </Tag>
                    ))}
                  </Space>
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  icon={<ExperimentOutlined />}
                  loading={generating}
                  htmlType="submit"
                  block
                >
                  {generating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Generated Content" size="small">
            {generatedConcept ? (
              <div>
                <Title level={4}>{generatedConcept.title}</Title>
                <Paragraph>{generatedConcept.description}</Paragraph>
                
                <Divider />
                
                <Text strong>Visual Metaphor:</Text>
                <Paragraph italic>{generatedConcept.metaphor}</Paragraph>
                
                <Space>
                  <Tag color="blue">Difficulty: {generatedConcept.difficulty}</Tag>
                  <Tag color="green">Time: {generatedConcept.estimatedTime}</Tag>
                </Space>

                {generatedConcept.story && (
                  <>
                    <Divider />
                    <Text strong>Interactive Story:</Text>
                    <Paragraph>
                      <Text strong>Title:</Text> {generatedConcept.story.title}
                    </Paragraph>
                    <Paragraph>
                      <Text strong>Scene:</Text> {generatedConcept.story.scene}
                    </Paragraph>
                  </>
                )}

                <Divider />
                
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  loading={loading}
                  onClick={handleAutoCreate}
                  block
                >
                  {loading ? 'Creating...' : 'Create Concept'}
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <RobotOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                <Paragraph style={{ marginTop: '16px', color: '#8c8c8c' }}>
                  Generate AI-powered content for your new concept
                </Paragraph>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      <Alert
        message="AI-Powered Features"
        description="This tool uses AI to automatically generate engaging content including visual metaphors, interactive stories, and difficulty assessments for your new concepts."
        type="info"
        showIcon
        icon={<ThunderboltOutlined />}
      />
    </Modal>
  );
};

export default AIConceptGenerator; 