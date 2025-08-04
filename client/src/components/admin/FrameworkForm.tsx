import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Typography,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  BookOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Framework {
  _id?: string;
  id: string;
  name: string;
  concepts?: any[];
  createdAt?: string;
  updatedAt?: string;
}

interface FrameworkFormProps {
  visible: boolean;
  framework?: Framework | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const FrameworkForm: React.FC<FrameworkFormProps> = ({
  visible,
  framework,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && framework) {
      form.setFieldsValue(framework);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, framework, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log('🚀 Submitting framework with values:', values);
      
      const token = localStorage.getItem('adminToken');
      const url = framework?._id 
        ? `/api/admin/frameworks/${framework.id}`
        : '/api/admin/frameworks';
      
      const method = framework?._id ? 'PUT' : 'POST';
      
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
        message.success(framework ? 'Framework updated successfully!' : 'Framework created successfully!');
        onSuccess();
        onCancel();
        form.resetFields();
      } else {
        const error = await response.json();
        console.error('❌ Error response:', error);
        message.error(error.error || 'Failed to save framework');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!framework) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`/api/admin/frameworks/${framework.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        message.success('Framework deleted successfully!');
        onSuccess();
        onCancel();
      } else {
        const error = await response.json();
        message.error(error.error || 'Failed to delete framework');
      }
    } catch (error) {
      console.error('Error deleting framework:', error);
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Title level={3}>
          {framework ? 'Edit Framework' : 'Add New Framework'}
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id"
              label="Framework ID"
              rules={[
                { required: true, message: 'Please enter framework ID' },
                { pattern: /^[a-z0-9-]+$/, message: 'Only lowercase letters, numbers, and hyphens allowed' }
              ]}
            >
              <Input 
                placeholder="e.g., next.js, vue.js" 
                disabled={!!framework} // Can't change ID when editing
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Framework Name"
              rules={[{ required: true, message: 'Please enter framework name' }]}
            >
              <Input placeholder="e.g., Next.js, Vue.js" />
            </Form.Item>
          </Col>
        </Row>

        {framework && framework.concepts && (
          <Card 
            title="Framework Statistics" 
            size="small" 
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Total Concepts"
                  value={framework.concepts.length}
                  prefix={<BookOutlined />}
                />
              </Col>
              <Col span={16}>
                <div>
                  <Text strong>Concepts:</Text>
                  <div style={{ marginTop: 8 }}>
                    {framework.concepts.length > 0 ? (
                      framework.concepts.map((concept: any) => (
                        <Tag key={concept._id} color="blue" style={{ marginBottom: 4 }}>
                          {concept.title}
                        </Tag>
                      ))
                    ) : (
                      <Text type="secondary">No concepts yet</Text>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {framework && framework.concepts && framework.concepts.length > 0 && (
          <div style={{ 
            background: '#fff2e8', 
            border: '1px solid #ffbb96', 
            borderRadius: 6, 
            padding: 12, 
            marginBottom: 16 
          }}>
            <Space>
              <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />
              <Text type="warning">
                This framework has {framework.concepts.length} concept(s). 
                You must move or delete all concepts before deleting the framework.
              </Text>
            </Space>
          </div>
        )}

        <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            {framework && framework.concepts && framework.concepts.length === 0 && (
              <Button 
                danger 
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={handleDelete}
              >
                Delete Framework
              </Button>
            )}
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={framework ? <EditOutlined /> : <PlusOutlined />}
            >
              {framework ? 'Update' : 'Create'} Framework
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FrameworkForm; 