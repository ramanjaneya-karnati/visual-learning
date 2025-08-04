import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Divider,
  Typography,
  message,
  Card,
  Row,
  Col
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Concept {
  _id?: string;
  id: string;
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

interface ConceptFormProps {
  visible: boolean;
  concept?: Concept | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const ConceptForm: React.FC<ConceptFormProps> = ({
  visible,
  concept,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    if (visible && concept) {
      console.log('🔧 Setting form values for concept:', concept);
      form.setFieldsValue({
        ...concept,
        story: concept.story || {
          title: '',
          scene: '',
          problem: '',
          solution: '',
          characters: {},
          mapping: {},
          realWorld: ''
        }
      });
      setShowStory(!!concept.story);
    } else if (visible) {
      form.resetFields();
      setShowStory(false);
    }
  }, [visible, concept, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log('🚀 Submitting concept with values:', values);
      
      const token = localStorage.getItem('adminToken');
      const url = concept?._id 
        ? `/api/admin/concepts/${concept._id}`
        : '/api/admin/concepts';
      
      const method = concept?._id ? 'PUT' : 'POST';
      
      console.log('📡 Making request to:', url, 'with method:', method);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(values)
      });

      console.log('📊 Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Success response:', result);
        onSuccess();
      } else {
        const error = await response.json();
        console.error('❌ Error response:', error);
        message.error(error.error || 'Failed to save concept');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Title level={3}>
          {concept ? 'Edit Concept' : 'Add New Concept'}
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          difficulty: 'beginner',
          estimatedTime: '15 min'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id"
              label="Concept ID"
              rules={[{ required: true, message: 'Please enter concept ID' }]}
            >
              <Input placeholder="e.g., react-hooks" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input placeholder="e.g., React Hooks" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea rows={3} placeholder="Brief description of the concept" />
        </Form.Item>

        <Form.Item
          name="metaphor"
          label="Visual Metaphor"
          rules={[{ required: true, message: 'Please enter metaphor' }]}
        >
          <TextArea rows={2} placeholder="A relatable metaphor for the concept" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="difficulty"
              label="Difficulty Level"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="advanced">Advanced</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="estimatedTime"
              label="Estimated Time"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., 15 min" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="framework"
              label="Framework"
            >
              <Select placeholder="Select framework">
                <Option value="react">React</Option>
                <Option value="angular">Angular</Option>
                <Option value="advanced">Advanced Patterns</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider>
          <Button
            type="link"
            onClick={() => setShowStory(!showStory)}
            icon={showStory ? <MinusCircleOutlined /> : <PlusOutlined />}
          >
            {showStory ? 'Hide' : 'Add'} Interactive Story
          </Button>
        </Divider>

        {showStory && (
          <Card title="Interactive Story" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['story', 'title']}
                  label="Story Title"
                >
                  <Input placeholder="e.g., The Chef's Toolbox" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['story', 'scene']}
                  label="Scene"
                >
                  <Input placeholder="e.g., A busy kitchen" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name={['story', 'problem']}
              label="Problem"
            >
              <TextArea rows={2} placeholder="The problem that needs solving" />
            </Form.Item>

            <Form.Item
              name={['story', 'solution']}
              label="Solution"
            >
              <TextArea rows={2} placeholder="How the problem is solved" />
            </Form.Item>

            <Form.Item
              name={['story', 'realWorld']}
              label="Real World Application"
            >
              <TextArea rows={2} placeholder="How this applies to programming" />
            </Form.Item>

            <Title level={5}>Character Mapping</Title>
            <Form.List name={['story', 'characters']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'key']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder="Character name" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          <Input placeholder="Programming concept" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Character
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>
        )}

        <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {concept ? 'Update' : 'Create'} Concept
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConceptForm; 