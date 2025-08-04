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
import CodeBlock from '../components/CodeBlock';

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

  const getExamples = (frameworkId: string, conceptId: string) => {
    if (frameworkId === 'angular') {
      switch (conceptId) {
        case 'dependency-injection':
          return {
            basic: `// Basic Dependency Injection Example
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return ['John', 'Jane', 'Bob'];
  }
}

@Component({
  selector: 'app-user-list',
  template: '<div>{{ users }}</div>'
})
export class UserListComponent {
  users: string[];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}`,
            advanced: `// Advanced Dependency Injection with Custom Providers
import { Injectable, InjectionToken, Inject } from '@angular/core';

// Custom injection token
export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  getData() {
    return fetch(this.apiUrl + '/data');
  }
}

// Module configuration with custom providers
@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' },
    { provide: 'CACHE_SIZE', useValue: 100 }
  ]
})
export class AppModule { }`
          };

        case 'change-detection':
          return {
            basic: `// Basic Change Detection Example
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <div>
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <button (click)="updateUser()">Update</button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User;

  updateUser() {
    // This will trigger change detection
    this.user.name = 'Updated Name';
  }
}`,
            advanced: `// Advanced Change Detection with Custom Strategy
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-real-time-data',
  template: \`
    <div>
      <h2>Real-time Updates</h2>
      <p>Last Update: {{ lastUpdate | date:'medium' }}</p>
      <p>Data: {{ data }}</p>
    </div>
  \`
})
export class RealTimeDataComponent implements OnDestroy {
  data: any;
  lastUpdate: Date;
  private interval: any;

  constructor(private cdr: ChangeDetectorRef) {
    // Manual change detection for performance
    this.interval = setInterval(() => {
      this.data = this.fetchData();
      this.lastUpdate = new Date();
      this.cdr.detectChanges();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}`
          };

        case 'decorators':
          return {
            basic: `// Basic Decorators Example
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: \`
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
  \`
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() cartUpdated = new EventEmitter<Product>();

  addToCart() {
    this.cartUpdated.emit(this.product);
  }
}`,
            advanced: `// Advanced Custom Decorators
import { Component, OnInit } from '@angular/core';

// Custom decorator for logging
function LogMethod(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyName} with args:\`, args);
    return method.apply(this, args);
  };
}

// Custom decorator for validation
function ValidateInput(target: any, propertyName: string) {
  let value: string;
  Object.defineProperty(target, propertyName, {
    get: () => value,
    set: (newValue: string) => {
      if (newValue.length < 3) {
        throw new Error('Input must be at least 3 characters');
      }
      value = newValue;
    }
  });
}

@Component({
  selector: 'app-advanced-form',
  template: '<div>Advanced form with decorators</div>'
})
export class AdvancedFormComponent implements OnInit {
  @ValidateInput
  username: string = '';

  @LogMethod
  ngOnInit() {
    console.log('Component initialized');
  }
}`
          };

        default:
          return {
            basic: `// Basic Example
console.log('Learning made easy!');`,
            advanced: `// Advanced Example
// More complex implementation
// Additional features and patterns`
          };
      }
    } else if (frameworkId === 'react') {
      switch (conceptId) {
        case 'hooks':
          return {
            basic: `// Basic React Hooks Example
import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData().then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`,
            advanced: `// Advanced Custom Hooks Example
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Custom hook for data fetching
function useApiData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Custom hook for form validation
function useFormValidation(initialState, validationRules) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach(key => {
      const value = values[key];
      const rule = validationRules[key];
      if (rule.required && !value) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  return { values, errors, setValues, validate };
}`
          };

        case 'context-api':
          return {
            basic: `// Basic Context API Example
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`,
            advanced: `// Advanced Context with Multiple Providers
import React, { createContext, useContext, useReducer } from 'react';

// Theme context
const ThemeContext = createContext();
const UserContext = createContext();

// Reducer for complex state management
function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
    isAuthenticated: false
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ ...userState, dispatch }}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}`
          };

        case 'lazy-loading':
          return {
            basic: `// Basic Lazy Loading Example
import React, { Suspense, lazy } from 'react';

// Lazy load components
const UserProfile = lazy(() => import('./UserProfile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
        <Settings />
      </Suspense>
    </div>
  );
}`,
            advanced: `// Advanced Lazy Loading with Route-based Code Splitting
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Custom loading component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading amazing content...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`
          };

        case 'server-components':
          return {
            basic: `// Basic Server Component Example
// ServerComponent.js (Server Component)
async function UserList() {
  // This runs on the server
  const users = await fetchUsers();
  
  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// ClientComponent.js (Client Component)
'use client';
import { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');
  
  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </form>
  );
}`,
            advanced: `// Advanced Server Components with Streaming
// Server Component with streaming
async function ProductCatalog() {
  const products = await fetchProducts();
  
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<ProductSkeleton />}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Suspense>
    </div>
  );
}

// Client Component with interactivity
'use client';
import { useState, useEffect } from 'react';

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}`
          };

        default:
          return {
            basic: `// Basic Example
console.log('Learning made easy!');`,
            advanced: `// Advanced Example
// More complex implementation
// Additional features and patterns`
          };
      }
    }
    
    return {
      basic: `// Basic Example
console.log('Learning made easy!');`,
      advanced: `// Advanced Example
// More complex implementation
// Additional features and patterns`
    };
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
              <CodeBlock
                code={getExamples(frameworkId || '', conceptId || '').basic}
                language={frameworkId === 'angular' ? 'typescript' : 'jsx'}
                title="Basic Implementation"
              />
            </Panel>
            <Panel header="Advanced Example" key="2">
              <CodeBlock
                code={getExamples(frameworkId || '', conceptId || '').advanced}
                language={frameworkId === 'angular' ? 'typescript' : 'jsx'}
                title="Advanced Implementation"
              />
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