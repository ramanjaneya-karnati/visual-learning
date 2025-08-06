import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Menu, 
  Card, 
  Table, 
  Button, 
  Space, 
  Typography, 
  Statistic, 
  Row, 
  Col,
  Tag,
  Modal,
  message,
  Avatar,
  Dropdown
} from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  EyeOutlined,
  MoreOutlined,
  RobotOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import ConceptForm from '../components/admin/ConceptForm';
import ConceptView from '../components/admin/ConceptView';
import AIConceptGenerator from '../components/admin/AIConceptGenerator';
import FrameworkForm from '../components/admin/FrameworkForm';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Concept {
  _id: string;
  id: string;
  title: string;
  description: string;
  metaphor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  framework?: string;
  createdAt: string;
}

interface Framework {
  _id: string;
  id: string;
  name: string;
  concepts: Concept[];
}

const AdminDashboard: React.FC = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isAIGeneratorVisible, setIsAIGeneratorVisible] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);
  const [isFrameworkFormVisible, setIsFrameworkFormVisible] = useState(false);
  const [editingFramework, setEditingFramework] = useState<Framework | null>(null);
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('🔍 Fetching admin data...');
      
      const [conceptsRes, frameworksRes] = await Promise.all([
        fetch('/api/admin/concepts', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
          }
        }),
        fetch('/api/admin/frameworks', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
      ]);

      console.log('📊 Concepts response:', conceptsRes.status);
      console.log('📊 Frameworks response:', frameworksRes.status);

      if (conceptsRes.ok && frameworksRes.ok) {
        const conceptsData = await conceptsRes.json();
        const frameworksData = await frameworksRes.json();
        
        console.log('📈 Concepts count:', conceptsData.concepts?.length);
        console.log('📈 Frameworks count:', frameworksData.frameworks?.length);
        
        setConcepts(conceptsData.concepts || []);
        setFrameworks(frameworksData.frameworks || []);
      } else {
        console.error('❌ API responses not ok:', { conceptsRes: conceptsRes.status, frameworksRes: frameworksRes.status });
        message.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleDelete = async (conceptId: string) => {
    Modal.confirm({
      title: 'Delete Concept',
      content: 'Are you sure you want to delete this concept?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch(`/api/admin/concepts/${conceptId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.ok) {
            message.success('Concept deleted successfully');
            fetchData();
          } else {
            message.error('Failed to delete concept');
          }
        } catch (error) {
          message.error('Network error');
        }
      }
    });
  };

  const handleFrameworkEdit = (framework: Framework) => {
    setEditingFramework(framework);
    setIsFrameworkFormVisible(true);
  };

  const handleFrameworkAdd = () => {
    setEditingFramework(null);
    setIsFrameworkFormVisible(true);
  };

  const handleFrameworkSuccess = () => {
    fetchData();
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Framework',
      dataIndex: 'framework',
      key: 'framework',
      render: (framework: string) => (
        <Tag color="blue">{framework || 'N/A'}</Tag>
      )
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: string) => {
        const colors = {
          beginner: 'green',
          intermediate: 'orange',
          advanced: 'red'
        };
        return <Tag color={colors[difficulty as keyof typeof colors]}>{difficulty}</Tag>;
      }
    },
    {
      title: 'Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (time: string) => <Text>{time}</Text>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Concept) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedConcept(record);
              setIsViewVisible(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingConcept(record);
              setIsFormVisible(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      )
    }
  ];

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard" style={{ color: 'inherit' }}>Dashboard</Link>
    },
    {
      key: 'frameworks',
      icon: <BookOutlined />,
      label: <Link to="/admin/frameworks" style={{ color: 'inherit' }}>Frameworks</Link>
    },
    {
      key: 'concepts',
      icon: <BookOutlined />,
      label: 'Concepts'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    }
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="dark">
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            Admin Panel
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Title level={4} style={{ margin: 0 }}>
            Learnify Administration
          </Title>
          
          <Space>
            <Text>Welcome, {adminUser.username}</Text>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: '24px', padding: '24px', background: '#f0f2f5' }}>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Concepts"
                  value={concepts.length}
                  prefix={<BookOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Frameworks"
                  value={frameworks.length}
                  prefix={<DashboardOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Beginner Concepts"
                  value={concepts.filter(c => c.difficulty === 'beginner').length}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Advanced Concepts"
                  value={concepts.filter(c => c.difficulty === 'advanced').length}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>

                            <Card
                    title="Concepts Management"
                    extra={
                      <Space>
                        <Button
                          icon={<RobotOutlined />}
                          onClick={() => setIsAIGeneratorVisible(true)}
                        >
                          AI Generator
                        </Button>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            setEditingConcept(null);
                            setIsFormVisible(true);
                          }}
                        >
                          Add Concept
                        </Button>
                      </Space>
                    }
                    style={{ marginTop: '24px' }}
                  >
            <Table
              columns={columns}
              dataSource={concepts}
              rowKey="_id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>

          <Card
            title="Frameworks Management"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleFrameworkAdd}
              >
                Add Framework
              </Button>
            }
            style={{ marginTop: '24px' }}
          >
            <Row gutter={[16, 16]}>
              {frameworks.map((framework) => (
                <Col xs={24} sm={12} md={8} lg={6} key={framework._id}>
                  <Card
                    hoverable
                    size="small"
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleFrameworkEdit(framework)}
                      >
                        Edit
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Space>
                          <Text strong>{framework.name}</Text>
                          <Tag color="blue">{framework.concepts.length} concepts</Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <Text type="secondary">ID: {framework.id}</Text>
                          <div style={{ marginTop: 8 }}>
                            {framework.concepts.length > 0 ? (
                              framework.concepts.slice(0, 3).map((concept: any) => (
                                <Tag key={concept._id} style={{ marginBottom: 4 }}>
                                  {concept.title}
                                </Tag>
                              ))
                            ) : (
                              <Text type="secondary">No concepts yet</Text>
                            )}
                            {framework.concepts.length > 3 && (
                              <Text type="secondary">+{framework.concepts.length - 3} more</Text>
                            )}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Content>
      </Layout>

      <ConceptForm
        visible={isFormVisible}
        concept={editingConcept}
        onCancel={() => {
          setIsFormVisible(false);
          setEditingConcept(null);
        }}
        onSuccess={() => {
          setIsFormVisible(false);
          setEditingConcept(null);
          fetchData();
          message.success('Concept saved successfully');
        }}
      />

                          <ConceptView
        visible={isViewVisible}
        concept={selectedConcept}
        onCancel={() => {
          setIsViewVisible(false);
          setSelectedConcept(null);
        }}
      />

      <AIConceptGenerator
        visible={isAIGeneratorVisible}
        onCancel={() => setIsAIGeneratorVisible(false)}
        onSuccess={() => {
          setIsAIGeneratorVisible(false);
          fetchData();
        }}
      />

      <FrameworkForm
        visible={isFrameworkFormVisible}
        framework={editingFramework}
        onCancel={() => {
          setIsFrameworkFormVisible(false);
          setEditingFramework(null);
        }}
        onSuccess={handleFrameworkSuccess}
      />
    </Layout>
  );
};

export default AdminDashboard;
