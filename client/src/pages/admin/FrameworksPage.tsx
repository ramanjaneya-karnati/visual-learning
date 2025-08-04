import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Button,
  Space,
  Typography,
  message,
  Modal,
  Tag,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Tooltip,
  Input,
  Menu,
  Avatar,
  Dropdown
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import FrameworkForm from '../../components/admin/FrameworkForm';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

interface Framework {
  _id: string;
  id: string;
  name: string;
  concepts: any[];
  createdAt: string;
  updatedAt: string;
}

const FrameworksPage: React.FC = () => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingFramework, setEditingFramework] = useState<Framework | null>(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    fetchFrameworks();
  }, []);

  const fetchFrameworks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/frameworks', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFrameworks(data.frameworks || []);
      } else {
        message.error('Failed to fetch frameworks');
      }
    } catch (error) {
      console.error('Error fetching frameworks:', error);
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFramework(null);
    setIsFormVisible(true);
  };

  const handleEdit = (framework: Framework) => {
    setEditingFramework(framework);
    setIsFormVisible(true);
  };

  const handleDelete = async (framework: Framework) => {
    if (framework.concepts.length > 0) {
      message.error('Cannot delete framework with existing concepts. Please move or delete all concepts first.');
      return;
    }

    Modal.confirm({
      title: 'Delete Framework',
      content: `Are you sure you want to delete "${framework.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      onOk: async () => {
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
            message.success('Framework deleted successfully');
            fetchFrameworks();
          } else {
            const error = await response.json();
            message.error(error.error || 'Failed to delete framework');
          }
        } catch (error) {
          console.error('Error deleting framework:', error);
          message.error('Network error');
        }
      }
    });
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setEditingFramework(null);
    fetchFrameworks();
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingFramework(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

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

  const filteredFrameworks = frameworks.filter(framework =>
    framework.name.toLowerCase().includes(searchText.toLowerCase()) ||
    framework.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Framework',
      key: 'framework',
      render: (record: Framework) => (
        <Space direction="vertical" size="small">
          <Text strong>{record.name}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            ID: {record.id}
          </Text>
        </Space>
      )
    },
    {
      title: 'Concepts',
      key: 'concepts',
      render: (record: Framework) => (
        <Space direction="vertical" size="small">
          <Statistic
            value={record.concepts.length}
            prefix={<BookOutlined />}
            valueStyle={{ fontSize: '16px' }}
          />
          <div>
            {record.concepts.length > 0 ? (
              record.concepts.slice(0, 3).map((concept: any) => (
                <Tag key={concept._id} color="blue" style={{ marginBottom: 2 }}>
                  {concept.title}
                </Tag>
              ))
            ) : (
              <Text type="secondary" style={{ fontSize: '12px' }}>No concepts</Text>
            )}
            {record.concepts.length > 3 && (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                +{record.concepts.length - 3} more
              </Text>
            )}
          </div>
        </Space>
      )
    },
    {
      title: 'Created',
      key: 'createdAt',
      render: (record: Framework) => (
        <Text type="secondary">
          {new Date(record.createdAt).toLocaleDateString()}
        </Text>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Framework) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                Modal.info({
                  title: `${record.name} Details`,
                  width: 600,
                  content: (
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Statistic
                            title="Framework ID"
                            value={record.id}
                            valueStyle={{ fontSize: '14px' }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Total Concepts"
                            value={record.concepts.length}
                            prefix={<BookOutlined />}
                          />
                        </Col>
                      </Row>
                      <div style={{ marginTop: 16 }}>
                        <Text strong>Concepts:</Text>
                        <div style={{ marginTop: 8 }}>
                          {record.concepts.length > 0 ? (
                            record.concepts.map((concept: any) => (
                              <Tag key={concept._id} color="blue" style={{ marginBottom: 4 }}>
                                {concept.title}
                              </Tag>
                            ))
                          ) : (
                            <Text type="secondary">No concepts yet</Text>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                });
              }}
            />
          </Tooltip>
          <Tooltip title="Edit Framework">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Framework"
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDelete(record)}
            okText="Delete"
            cancelText="Cancel"
            disabled={record.concepts.length > 0}
          >
            <Tooltip 
              title={record.concepts.length > 0 
                ? "Cannot delete framework with concepts" 
                : "Delete Framework"
              }
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                disabled={record.concepts.length > 0}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const totalConcepts = frameworks.reduce((sum, framework) => sum + framework.concepts.length, 0);
  const emptyFrameworks = frameworks.filter(f => f.concepts.length === 0).length;

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
          defaultSelectedKeys={['frameworks']}
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
            Frameworks Management
          </Title>
          
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Add Framework
            </Button>
            <Text>Welcome, {adminUser.username}</Text>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: '24px', padding: '24px', background: '#f0f2f5' }}>
        {/* Statistics Row */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Frameworks"
                value={frameworks.length}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Concepts"
                value={totalConcepts}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Empty Frameworks"
                value={emptyFrameworks}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Search
                placeholder="Search frameworks by name or ID..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
              <Text type="secondary">
                Showing {filteredFrameworks.length} of {frameworks.length} frameworks
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Frameworks Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={filteredFrameworks}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} frameworks`
            }}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ padding: '16px' }}>
                  <Text strong>All Concepts in {record.name}:</Text>
                  <div style={{ marginTop: 8 }}>
                    {record.concepts.length > 0 ? (
                      record.concepts.map((concept: any) => (
                        <Tag key={concept._id} color="blue" style={{ marginBottom: 4 }}>
                          {concept.title}
                        </Tag>
                      ))
                    ) : (
                      <Text type="secondary">No concepts in this framework</Text>
                    )}
                  </div>
                </div>
              )
            }}
          />
        </Card>
        </Content>
      </Layout>

      <FrameworkForm
        visible={isFormVisible}
        framework={editingFramework}
        onCancel={handleFormCancel}
        onSuccess={handleFormSuccess}
      />
    </Layout>
  );
};

export default FrameworksPage; 