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
  Tag,
  Select,
  Divider,
  List,
  Popconfirm,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  CloseOutlined,
  RobotOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

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
  const [availableConcepts, setAvailableConcepts] = useState<any[]>([]);
  const [loadingConcepts, setLoadingConcepts] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  const [aiSearchResults, setAiSearchResults] = useState<string[]>([]);
  const [loadingAiSearch, setLoadingAiSearch] = useState(false);

  useEffect(() => {
    if (visible && framework) {
      form.setFieldsValue(framework);
      fetchAvailableConcepts();
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, framework, form]);

  const fetchAvailableConcepts = async () => {
    try {
      setLoadingConcepts(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/concepts', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Filter out concepts that are already in this framework
        const frameworkConceptIds = framework?.concepts?.map((c: any) => c._id) || [];
        const available = data.concepts.filter((concept: any) => 
          !frameworkConceptIds.includes(concept._id)
        );
        setAvailableConcepts(available);
      }
    } catch (error) {
      console.error('Error fetching concepts:', error);
    } finally {
      setLoadingConcepts(false);
    }
  };

  const handleAiSearch = async () => {
    if (!searchText.trim() || !framework) return;

    try {
      setLoadingAiSearch(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/popular-concepts/${framework.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ search: searchText })
      });

      if (response.ok) {
        const data = await response.json();
        setAiSearchResults(data.concepts || []);
      }
    } catch (error) {
      console.error('Error searching concepts:', error);
    } finally {
      setLoadingAiSearch(false);
    }
  };

  const handleAddConcept = async (conceptId: string, conceptTitle?: string) => {
    if (!framework) return;

    // Show confirmation dialog
    Modal.confirm({
      title: 'Add Concept to Framework',
      content: (
        <div>
          <p>Are you sure you want to add <strong>{conceptTitle || conceptId}</strong> to <strong>{framework.name}</strong>?</p>
          <p>This will make the concept available in the learning interface for this framework.</p>
        </div>
      ),
      okText: 'Add Concept',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch(`/api/admin/frameworks/${framework.id}/concepts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ conceptId })
          });

          if (response.ok) {
            message.success(`Concept "${conceptTitle || conceptId}" added to ${framework.name} successfully!`);
            // Refresh the framework data
            onSuccess();
            // Refresh available concepts
            fetchAvailableConcepts();
          } else {
            const error = await response.json();
            message.error(error.error || 'Failed to add concept to framework');
          }
        } catch (error) {
          console.error('Error adding concept:', error);
          message.error('Network error');
        }
      }
    });
  };

  const handleRemoveConcept = async (conceptId: string, conceptTitle?: string) => {
    if (!framework) return;

    // Show confirmation dialog
    Modal.confirm({
      title: 'Remove Concept from Framework',
      content: (
        <div>
          <p>Are you sure you want to remove <strong>{conceptTitle || conceptId}</strong> from <strong>{framework.name}</strong>?</p>
          <p>This will remove the concept from this framework but won't delete the concept itself.</p>
        </div>
      ),
      okText: 'Remove Concept',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch(`/api/admin/frameworks/${framework.id}/concepts/${conceptId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest'
            }
          });

          if (response.ok) {
            message.success(`Concept "${conceptTitle || conceptId}" removed from ${framework.name} successfully!`);
            // Refresh the framework data
            onSuccess();
            // Refresh available concepts
            fetchAvailableConcepts();
          } else {
            const error = await response.json();
            message.error(error.error || 'Failed to remove concept from framework');
          }
        } catch (error) {
          console.error('Error removing concept:', error);
          message.error('Network error');
        }
      }
    });
  };

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

        {framework && (
          <>
            <Card 
              title="Framework Statistics" 
              size="small" 
              style={{ marginBottom: 16 }}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Total Concepts"
                    value={framework.concepts?.length || 0}
                    prefix={<BookOutlined />}
                  />
                </Col>
                <Col span={16}>
                  <div>
                    <Text strong>Concepts:</Text>
                    <div style={{ marginTop: 8 }}>
                      {framework.concepts && framework.concepts.length > 0 ? (
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

            <Divider>Concept Management</Divider>

            {/* AI-Powered Concept Search */}
            <Card 
              title={
                <Space>
                  <RobotOutlined />
                  <Text>AI-Powered Concept Search</Text>
                </Space>
              }
              size="small" 
              style={{ marginBottom: 16 }}
            >
              <Space.Compact style={{ width: '100%', marginBottom: 12 }}>
                <Input
                  placeholder="Search for concepts to add..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onPressEnter={handleAiSearch}
                />
                <Button 
                  type="primary" 
                  icon={<SearchOutlined />}
                  loading={loadingAiSearch}
                  onClick={handleAiSearch}
                >
                  AI Search
                </Button>
              </Space.Compact>

              {aiSearchResults.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Text strong>AI Suggestions:</Text>
                  <div style={{ marginTop: 8 }}>
                    {aiSearchResults.map((concept, index) => (
                      <Tag 
                        key={index} 
                        color="green" 
                        style={{ marginBottom: 4, cursor: 'pointer' }}
                        onClick={() => handleAddConcept(concept, concept)}
                      >
                        {concept} <PlusOutlined />
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Concepts */}
              <div>
                <Text strong>Available Concepts:</Text>
                <div style={{ marginTop: 8 }}>
                  {loadingConcepts ? (
                    <Text type="secondary">Loading concepts...</Text>
                  ) : availableConcepts.length > 0 ? (
                    availableConcepts.map((concept: any) => (
                      <Tag 
                        key={concept._id} 
                        color="orange" 
                        style={{ marginBottom: 4, cursor: 'pointer' }}
                        onClick={() => handleAddConcept(concept._id, concept.title)}
                      >
                        {concept.title} <PlusOutlined />
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No available concepts to add</Text>
                  )}
                </div>
              </div>
            </Card>

            {/* Current Framework Concepts */}
            {framework.concepts && framework.concepts.length > 0 && (
              <Card 
                title="Current Framework Concepts" 
                size="small" 
                style={{ marginBottom: 16 }}
              >
                <List
                  size="small"
                  dataSource={framework.concepts}
                  renderItem={(concept: any) => (
                    <List.Item
                      actions={[
                        <Button 
                          type="text" 
                          danger 
                          size="small" 
                          icon={<CloseOutlined />}
                          onClick={() => handleRemoveConcept(concept._id, concept.title)}
                        >
                          Remove
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        title={concept.title}
                        description={concept.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}
          </>
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