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
import InteractiveStory from '../components/InteractiveStory';
import Footer from '../components/Footer';

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
  story?: any;
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

  const getDetailedExplanation = (frameworkId: string, conceptId: string): string => {
    if (frameworkId === 'angular') {
      switch (conceptId) {
        case 'components':
          return "Components are the building blocks of Angular applications. Think of them as reusable UI elements that encapsulate their own logic, template, and styles. You'll learn how to create components, pass data between them using inputs and outputs, and organize your application into a component hierarchy. This includes understanding component lifecycle hooks, change detection, and best practices for component design.";
        case 'services':
          return "Services in Angular are singleton objects that provide functionality across your application. They're perfect for sharing data, handling HTTP requests, and implementing business logic. You'll learn how to create services, inject them into components, and use them for state management and API communication. This includes understanding dependency injection, service providers, and how to create reusable business logic.";
        case 'routing':
          return "Angular routing enables single-page application navigation without page reloads. You'll learn how to configure routes, handle route parameters, implement route guards for authentication, and create nested routes. This includes understanding route resolvers, lazy loading modules, and creating a smooth user experience with proper navigation.";
        case 'forms':
          return "Angular forms provide powerful tools for user input validation and data handling. You'll learn both template-driven and reactive forms, form validation, custom validators, and form submission handling. This includes understanding form state management, error handling, and creating user-friendly form experiences.";
        case 'pipes':
          return "Pipes transform data for display in templates. You'll learn built-in pipes for common transformations, how to create custom pipes, and when to use pipes vs. methods. This includes understanding pure vs. impure pipes, parameterized pipes, and performance considerations.";
        case 'decorators':
          return "Decorators are special functions that modify classes, properties, and methods. You'll learn built-in decorators like @Component, @Injectable, and how to create custom decorators. This includes understanding metadata, reflection, and advanced TypeScript features.";
        case 'change-detection':
          return "Change detection is Angular's mechanism for updating the DOM when data changes. You'll learn how change detection works, strategies for optimization, and how to manually trigger updates. This includes understanding OnPush strategy, zone.js, and performance optimization techniques.";
        default:
          return "This concept provides fundamental knowledge for building robust Angular applications with modern development practices.";
      }
    } else if (frameworkId === 'react') {
      switch (conceptId) {
        case 'hooks':
          return "React Hooks revolutionized functional components by allowing state and side effects. You'll learn useState for state management, useEffect for side effects, and custom hooks for reusable logic. This includes understanding hook rules, dependencies, and creating custom hooks for complex functionality.";
        case 'context-api':
          return "Context API provides a way to share data across component trees without prop drilling. You'll learn how to create contexts, use providers and consumers, and manage global state. This includes understanding context optimization, when to use Context vs. other state management solutions, and best practices.";
        case 'state-management':
          return "State management is crucial for complex React applications. You'll learn different approaches from local state to global state management, including Redux patterns, Context API, and modern solutions like Zustand. This includes understanding state architecture, immutability, and performance considerations.";
        case 'server-components':
          return "Server Components are React's new paradigm for server-side rendering. You'll learn how to create server and client components, understand the hybrid rendering model, and optimize for performance. This includes understanding streaming, suspense, and the future of React development.";
        case 'virtual-dom':
          return "Virtual DOM is React's reconciliation algorithm for efficient UI updates. You'll learn how React compares virtual DOM trees, batches updates, and optimizes rendering. This includes understanding reconciliation, keys, and performance optimization strategies.";
        case 'jsx':
          return "JSX is React's syntax extension for writing components. You'll learn JSX syntax, expressions, conditional rendering, and how JSX compiles to JavaScript. This includes understanding JSX transformation, fragments, and best practices for readable component code.";
        default:
          return "This concept provides essential knowledge for building modern React applications with best practices and performance optimization.";
      }
    } else if (frameworkId === 'nextjs') {
      switch (conceptId) {
        case 'app-router':
          return "The App Router is Next.js 13's new file-system based routing system. You'll learn how to create routes using folders, handle dynamic routes, implement layouts, and use special files like loading.js and error.js. This includes understanding server and client components, streaming, and the new routing paradigm.";
        case 'server-components':
          return "Server Components run on the server and reduce client-side JavaScript. You'll learn how to create server components, understand the hybrid model with client components, and optimize for performance. This includes understanding streaming, suspense boundaries, and server-side data fetching.";
        case 'data-fetching':
          return "Next.js provides powerful data fetching capabilities. You'll learn how to fetch data on the server, implement caching strategies, handle loading and error states, and optimize for performance. This includes understanding static generation, server-side rendering, and incremental static regeneration.";
        default:
          return "This concept provides knowledge for building modern, performant web applications with Next.js.";
      }
    }
    return "This concept provides fundamental knowledge for modern web development.";
  };

  const getRealTimeUseCase = (frameworkId: string, conceptId: string): string => {
    if (frameworkId === 'angular') {
      switch (conceptId) {
        case 'components':
          return "Imagine building an e-commerce dashboard where you need a ProductCard component that displays product information, handles user interactions, and updates in real-time when inventory changes. The component receives product data, manages its own state for user interactions, and communicates with parent components when users add items to cart.";
        case 'services':
          return "Consider a real-time chat application where a ChatService manages WebSocket connections, handles message broadcasting, and maintains user presence. The service provides methods for sending/receiving messages, manages connection state, and can be injected into multiple components that need chat functionality.";
        case 'routing':
          return "Picture a social media app where users navigate between profiles, posts, and settings. The routing system handles deep linking, preserves scroll position, shows loading states during navigation, and implements route guards to ensure only authenticated users can access certain pages.";
        case 'forms':
          return "Think of a multi-step registration form that validates user input in real-time, shows field-specific error messages, and prevents submission until all required fields are valid. The form handles complex validation rules, async validation for email uniqueness, and provides immediate feedback to users.";
        case 'pipes':
          return "Envision a financial dashboard that displays currency values, dates, and percentages. Pipes automatically format numbers as currency, convert timestamps to readable dates, and transform data for different locales without modifying the underlying data.";
        case 'decorators':
          return "Consider a logging system where @Log decorators automatically track method calls, @Cache decorators store expensive computation results, and @Validate decorators ensure data integrity before processing. These decorators work across your entire application without cluttering business logic.";
        case 'change-detection':
          return "Imagine a real-time stock ticker that updates prices every second. Change detection efficiently updates only the changed DOM elements, handles thousands of price updates per second, and maintains smooth UI performance while keeping the display synchronized with live data.";
        default:
          return "This concept is applied in real-world scenarios to solve common development challenges and improve application performance.";
      }
    } else if (frameworkId === 'react') {
      switch (conceptId) {
        case 'hooks':
          return "Picture a live dashboard that tracks user activity in real-time. Custom hooks like useUserActivity manage WebSocket connections, useLocalStorage persists user preferences, and useDebounce prevents excessive API calls. These hooks can be reused across different components while maintaining clean, readable code.";
        case 'context-api':
          return "Consider a theme system where users can switch between light and dark modes. The ThemeContext provides current theme data to all components, and when a user toggles themes, all components automatically update without prop drilling. This includes user preferences, language settings, and authentication state.";
        case 'state-management':
          return "Imagine a collaborative document editor where multiple users can edit simultaneously. State management handles real-time synchronization, conflict resolution, and maintains consistency across all connected clients while providing a smooth user experience with optimistic updates.";
        case 'server-components':
          return "Think of a news website that loads instantly with server-rendered content, then becomes interactive for user comments and sharing. Server components handle the initial render, while client components manage user interactions, creating a hybrid experience that's both fast and interactive.";
        case 'virtual-dom':
          return "Consider a dynamic list that updates frequently, like a live sports scoreboard. The Virtual DOM efficiently updates only the changed scores, maintains scroll position, and handles thousands of updates per second while keeping the UI responsive and smooth.";
        case 'jsx':
          return "Imagine building a complex UI like a project management dashboard with nested components, conditional rendering for different user roles, and dynamic content. JSX makes this intuitive by allowing you to write HTML-like syntax with JavaScript expressions and component composition.";
        default:
          return "This concept is applied in real-world scenarios to create responsive, interactive user interfaces.";
      }
    } else if (frameworkId === 'nextjs') {
      switch (conceptId) {
        case 'app-router':
          return "Picture a blog platform with dynamic routes for posts, user profiles, and categories. The App Router handles SEO-friendly URLs, implements loading states for slow pages, and provides error boundaries for graceful error handling while maintaining fast navigation between pages.";
        case 'server-components':
          return "Consider an e-commerce site that loads product listings instantly with server-rendered content, then becomes interactive for user reviews and recommendations. Server components handle the initial render for SEO and performance, while client components manage user interactions.";
        case 'data-fetching':
          return "Think of a news aggregator that fetches articles from multiple sources, caches popular content, and provides real-time updates. Data fetching handles complex API calls, implements intelligent caching strategies, and ensures fast loading times while keeping content fresh.";
        default:
          return "This concept is applied in real-world scenarios to build performant, SEO-friendly web applications.";
      }
    }
    return "This concept is applied in real-world scenarios to solve common development challenges.";
  };

  const getKeyBenefits = (frameworkId: string, conceptId: string): string[] => {
    if (frameworkId === 'angular') {
      switch (conceptId) {
        case 'components':
          return [
            "Reusable UI elements that reduce code duplication",
            "Better organization and maintainability of your application",
            "Encapsulated logic and styling for cleaner code",
            "Easier testing with isolated component units",
            "Improved performance through change detection optimization"
          ];
        case 'services':
          return [
            "Centralized business logic that can be shared across components",
            "Better separation of concerns and code organization",
            "Easier testing with dependency injection",
            "Reduced code duplication and improved maintainability",
            "Better state management and data flow control"
          ];
        case 'routing':
          return [
            "Single-page application navigation without page reloads",
            "Better user experience with faster navigation",
            "SEO-friendly URLs and deep linking support",
            "Route guards for security and authentication",
            "Lazy loading for improved initial load performance"
          ];
        case 'forms':
          return [
            "Built-in validation and error handling",
            "Better user experience with real-time feedback",
            "Type-safe form handling with TypeScript",
            "Reusable form components and validation logic",
            "Integration with Angular's reactive programming model"
          ];
        case 'pipes':
          return [
            "Clean data transformation without modifying original data",
            "Reusable formatting logic across your application",
            "Better performance with pure pipe optimization",
            "Easy internationalization and localization",
            "Declarative data transformation in templates"
          ];
        case 'decorators':
          return [
            "Cleaner, more readable code with declarative syntax",
            "Reusable metadata and behavior patterns",
            "Better code organization and maintainability",
            "Type-safe configuration and validation",
            "Integration with Angular's dependency injection system"
          ];
        case 'change-detection':
          return [
            "Automatic UI updates when data changes",
            "Optimized performance with smart change detection",
            "Better user experience with responsive interfaces",
            "Reduced manual DOM manipulation",
            "Predictable and reliable UI updates"
          ];
        default:
          return [
            "Improved code organization and maintainability",
            "Better performance and user experience",
            "Reduced development time and complexity",
            "Enhanced testing capabilities",
            "Modern development practices and patterns"
          ];
      }
    } else if (frameworkId === 'react') {
      switch (conceptId) {
        case 'hooks':
          return [
            "Simplified state management in functional components",
            "Reusable logic across components with custom hooks",
            "Better code organization and readability",
            "Reduced complexity compared to class components",
            "Easier testing and debugging"
          ];
        case 'context-api':
          return [
            "Global state management without external libraries",
            "Eliminates prop drilling across component trees",
            "Cleaner component interfaces and props",
            "Built-in React solution with no additional dependencies",
            "Easy integration with existing React applications"
          ];
        case 'state-management':
          return [
            "Predictable data flow and state updates",
            "Better debugging with state time-travel",
            "Centralized state management for complex applications",
            "Improved performance with optimized re-renders",
            "Easier testing with isolated state logic"
          ];
        case 'server-components':
          return [
            "Reduced client-side JavaScript bundle size",
            "Better initial page load performance",
            "Improved SEO with server-side rendering",
            "Enhanced security with server-side execution",
            "Better caching and optimization opportunities"
          ];
        case 'virtual-dom':
          return [
            "Efficient DOM updates with minimal re-renders",
            "Better performance for complex UI updates",
            "Cross-platform compatibility and consistency",
            "Automatic batching of multiple state updates",
            "Optimized rendering for large component trees"
          ];
        case 'jsx':
          return [
            "Intuitive component composition and nesting",
            "Better readability with HTML-like syntax",
            "Type-safe component development with TypeScript",
            "Easier debugging with familiar syntax",
            "Seamless integration of JavaScript expressions"
          ];
        default:
          return [
            "Improved component reusability and maintainability",
            "Better performance and user experience",
            "Reduced development complexity",
            "Enhanced testing capabilities",
            "Modern React development patterns"
          ];
      }
    } else if (frameworkId === 'nextjs') {
      switch (conceptId) {
        case 'app-router':
          return [
            "File-system based routing for intuitive navigation",
            "Built-in loading and error handling",
            "Automatic code splitting and optimization",
            "Better SEO with server-side rendering",
            "Improved developer experience with conventions"
          ];
        case 'server-components':
          return [
            "Reduced client-side JavaScript for better performance",
            "Better initial page load times",
            "Enhanced security with server-side execution",
            "Improved SEO with server-side rendering",
            "Better caching and optimization strategies"
          ];
        case 'data-fetching':
          return [
            "Flexible data fetching strategies for different use cases",
            "Built-in caching and optimization",
            "Better performance with static generation",
            "Improved SEO with server-side data fetching",
            "Automatic revalidation and incremental updates"
          ];
        default:
          return [
            "Improved application performance and user experience",
            "Better SEO and search engine optimization",
            "Reduced development complexity",
            "Enhanced security and reliability",
            "Modern web development best practices"
          ];
      }
    }
    return [
      "Improved code organization and maintainability",
      "Better performance and user experience",
      "Reduced development complexity",
      "Enhanced testing capabilities",
      "Modern development practices"
    ];
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
        <div style={{ padding: '0' }}>
          <Title level={2} style={{ 
            color: '#1a1a1a', 
            marginBottom: '32px',
            fontFamily: '"Open Sans", sans-serif',
            textAlign: 'center',
            fontSize: '2.5rem',
            padding: '0 20px'
          }}>
            Understanding {concept?.title}
          </Title>
          
          {/* Interactive Learning Journey */}
          <div style={{ marginBottom: '40px' }}>
            {/* What You'll Learn - Interactive Cards */}
            <div className="overview-section" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '32px',
              borderRadius: '0',
              marginBottom: '32px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }} />
              
              <div className="overview-content" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    📚
                  </div>
                  <Title level={3} style={{ 
                    color: 'white', 
                    margin: 0,
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    What You'll Learn
                  </Title>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '24px',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Paragraph style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.8', 
                    color: 'white',
                    fontFamily: '"Open Sans", sans-serif',
                    margin: 0
                  }}>
                    {getDetailedExplanation(frameworkId || '', conceptId || '')}
                  </Paragraph>
                </div>
              </div>
            </div>
            
            {/* Real-time Use Case - Story Format */}
            <div className="overview-section" style={{
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
              padding: '32px',
              borderRadius: '0',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b6b, #ffa500, #ffd93d, #6bcf7f, #4d9de0, #845ec2)'
              }} />
              
              <div className="overview-content" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  animation: 'pulse 2s infinite'
                }}>
                  🚀
                </div>
                <Title level={3} style={{ 
                  color: '#d63384', 
                  margin: 0,
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Real-time Use Case Scenario
                </Title>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '8px',
                  height: '8px',
                  background: '#ff6b6b',
                  borderRadius: '50%',
                  animation: 'blink 1.5s infinite'
                }} />
                <Paragraph style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.8', 
                  color: '#d63384',
                  fontFamily: '"Open Sans", sans-serif',
                  margin: 0,
                  paddingLeft: '20px'
                }}>
                  {getRealTimeUseCase(frameworkId || '', conceptId || '')}
                </Paragraph>
              </div>
            </div>
            
            {/* Key Benefits - Interactive Grid */}
            <div className="overview-section" style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              padding: '32px',
              borderRadius: '0',
              marginBottom: '32px',
              position: 'relative'
            }}>
              <div className="overview-content" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  animation: 'rotate 3s linear infinite'
                }}>
                  ✨
                </div>
                <Title level={3} style={{ 
                  color: '#6f42c1', 
                  margin: 0,
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Key Benefits
                </Title>
              </div>
              
              <div className="key-benefits-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                alignItems: 'stretch'
              }}>
                {getKeyBenefits(frameworkId || '', conceptId || '').map((benefit, index) => (
                  <div key={index} className="key-benefit-card" style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '2px solid rgba(111, 66, 193, 0.2)',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: '160px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(111, 66, 193, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '28px',
                      height: '28px',
                      background: '#6f42c1',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      marginTop: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#6f42c1',
                        animation: 'pulse 2s infinite',
                        flexShrink: 0
                      }} />
                      <Text strong style={{ 
                        color: '#6f42c1',
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        Benefit {index + 1}
                      </Text>
                    </div>
                    <Text className="key-benefit-text" style={{ 
                      color: '#6f42c1',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      flex: 1,
                      margin: 0
                    }}>
                      {benefit}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Key Takeaway - Highlighted Box */}
          <div style={{
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #ff8a65',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '100%',
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
              animation: 'shimmer 2s infinite'
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#ff8a65',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: 'white'
                }}>
                  💡
                </div>
                <Text strong style={{
                  color: '#d84315',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '18px'
                }}>
                  Key Takeaway
                </Text>
              </div>
              <Text style={{
                color: '#d84315',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                This concept helps you build more efficient and maintainable applications.
              </Text>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Visual Metaphor',
      icon: <BulbOutlined />,
      content: (
        <div style={{ padding: '40px' }}>
          <Title level={2} style={{ 
            color: '#1a1a1a', 
            marginBottom: '32px',
            fontFamily: '"Open Sans", sans-serif',
            textAlign: 'center',
            fontSize: '2.5rem'
          }}>
            💡 Visual Metaphor
          </Title>
          
          {concept?.story ? (
            <InteractiveStory story={concept.story} />
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '40px',
              borderRadius: '24px',
              color: 'white',
              marginBottom: '32px',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                animation: 'float 6s ease-in-out infinite'
              }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                  fontSize: '64px', 
                  marginBottom: '24px',
                  animation: 'bounce 2s infinite'
                }}>
                  💭
                </div>
                <Paragraph style={{ 
                  fontSize: '20px', 
                  color: 'white', 
                  margin: 0,
                  fontFamily: '"Open Sans", sans-serif',
                  lineHeight: '1.6'
                }}>
                  {concept?.metaphor}
                </Paragraph>
              </div>
            </div>
          )}
          
          {/* Interactive Metaphor Explanation */}
          <div style={{
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            padding: '32px',
            borderRadius: '20px',
            border: '2px solid #ff8a65',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '32px'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '100%',
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
              animation: 'shimmer 2s infinite'
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#ff8a65',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'white',
                  animation: 'pulse 2s infinite'
                }}>
                  🎯
                </div>
                <Title level={3} style={{
                  color: '#d84315',
                  margin: 0,
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Why This Metaphor Works
                </Title>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 138, 101, 0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff8a65'
                    }} />
                    <Text strong style={{
                      color: '#d84315',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px'
                    }}>
                      Familiar Context
                    </Text>
                  </div>
                  <Text style={{
                    color: '#d84315',
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.6'
                  }}>
                    Uses everyday situations you already understand, making complex concepts feel familiar.
                  </Text>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 138, 101, 0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff8a65'
                    }} />
                    <Text strong style={{
                      color: '#d84315',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px'
                    }}>
                      Visual Memory
                    </Text>
                  </div>
                  <Text style={{
                    color: '#d84315',
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.6'
                  }}>
                    Creates mental images that stick in your memory longer than abstract explanations.
                  </Text>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 138, 101, 0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff8a65'
                    }} />
                    <Text strong style={{
                      color: '#d84315',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px'
                    }}>
                      Easy Recall
                    </Text>
                  </div>
                  <Text style={{
                    color: '#d84315',
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.6'
                  }}>
                    When you think of the metaphor, you'll instantly remember the programming concept.
                  </Text>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Practice Question */}
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            padding: '32px',
            borderRadius: '20px',
            border: '2px solid #2196f3',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #2196f3, #03a9f4, #00bcd4, #009688)'
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#2196f3',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'white'
                }}>
                  🤔
                </div>
                <Title level={3} style={{
                  color: '#1565c0',
                  margin: 0,
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Think About It
                </Title>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(33, 150, 243, 0.2)'
              }}>
                <Text style={{
                  color: '#1565c0',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Can you think of another real-world example where this concept applies? 
                  Try to come up with your own metaphor to reinforce your understanding!
                </Text>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Examples',
      icon: <CodeOutlined />,
      content: (
        <div style={{ padding: '40px' }}>
          <Title level={2} style={{ 
            color: '#1a1a1a', 
            marginBottom: '32px',
            fontFamily: '"Open Sans", sans-serif',
            textAlign: 'center',
            fontSize: '2.5rem'
          }}>
            Real-World Examples
          </Title>
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid rgba(18, 113, 91, 0.1)'
          }}>
            <Collapse 
              defaultActiveKey={['1']}
              style={{
                background: 'transparent',
                border: 'none'
              }}
            >
              <Panel 
                header={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#12715b',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      1
                    </div>
                    Basic Example
                  </div>
                } 
                key="1"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  border: '1px solid rgba(18, 113, 91, 0.1)'
                }}
              >
                <CodeBlock
                  code={getExamples(frameworkId || '', conceptId || '').basic}
                  language={frameworkId === 'angular' ? 'typescript' : 'jsx'}
                  title="Basic Implementation"
                />
              </Panel>
              <Panel 
                header={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#12715b',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      2
                    </div>
                    Advanced Example
                  </div>
                } 
                key="2"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(18, 113, 91, 0.1)'
                }}
              >
                <CodeBlock
                  code={getExamples(frameworkId || '', conceptId || '').advanced}
                  language={frameworkId === 'angular' ? 'typescript' : 'jsx'}
                  title="Advanced Implementation"
                />
              </Panel>
            </Collapse>
          </div>
        </div>
      )
    },
    {
      title: 'Practice',
      icon: <ExperimentOutlined />,
      content: (
        <div style={{ padding: '40px' }}>
          <Title level={2} style={{ 
            color: '#1a1a1a', 
            marginBottom: '32px',
            fontFamily: '"Open Sans", sans-serif',
            textAlign: 'center',
            fontSize: '2.5rem'
          }}>
            Try it yourself!
          </Title>
          <div style={{
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid rgba(76, 175, 80, 0.1)',
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #4caf50, #8bc34a, #cddc39, #ffeb3b, #ff9800, #ff5722)',
              animation: 'rainbow 3s linear infinite'
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '24px',
                animation: 'bounce 2s infinite'
              }}>
                🎯
              </div>
              <Paragraph style={{ 
                fontSize: '18px', 
                lineHeight: '1.8',
                color: '#2e7d32',
                fontFamily: '"Open Sans", sans-serif',
                marginBottom: '32px'
              }}>
                Now it's your turn to practice this concept. The best way to learn is by doing!
              </Paragraph>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<PlayCircleOutlined />}
                  style={{
                    height: '56px',
                    padding: '0 48px',
                    borderRadius: '12px',
                    background: '#12715b',
                    border: 'none',
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 8px 24px rgba(18, 113, 91, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(18, 113, 91, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 113, 91, 0.3)';
                  }}
                >
                  Start Interactive Exercise
                </Button>
                <Button 
                  size="large" 
                  icon={<BookOutlined />}
                  style={{
                    height: '48px',
                    padding: '0 32px',
                    borderRadius: '12px',
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: '2px solid #12715b',
                    color: '#12715b',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 113, 91, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View Additional Resources
                </Button>
              </Space>
            </div>
          </div>
        </div>
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
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes rainbow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `
      }} />
      
      {/* Combined Header and Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgb(245, 238, 233) 0%, rgba(18, 113, 91, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Header className="concept-header" style={{
          background: 'transparent',
          padding: '0 20px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: '"Open Sans", sans-serif',
          borderBottom: 'none'
        }}>
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <Button 
              className="back-button"
              type="text" 
              icon={<ArrowLeftOutlined />} 
              style={{ 
                color: '#12715b', 
                marginRight: '12px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: '"Open Sans", sans-serif',
                padding: '8px 12px',
                height: 'auto'
              }}
              onClick={() => navigate(`/concepts/${frameworkId}`)}
            >
              <span className="back-text">Back to {framework.name}</span>
            </Button>
            <div className="header-title-container" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <BookOutlined style={{ fontSize: '24px', color: '#12715b', marginRight: '12px', flexShrink: 0 }} />
              <Title level={4} className="concept-title" style={{ 
                color: '#1a1a1a', 
                margin: 0, 
                fontWeight: 'bold',
                fontFamily: '"Open Sans", sans-serif',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {concept.title}
              </Title>
            </div>
          </div>
          
          <div className="header-tags" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexShrink: 0
          }}>
            <Tag color={getDifficultyColor(concept.difficulty)} className="difficulty-tag" style={{ 
              margin: 0, 
              fontWeight: 'bold', 
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '12px',
              padding: '4px 8px'
            }}>
              {getDifficultyText(concept.difficulty)}
            </Tag>
            {concept.estimatedTime && (
              <Tag color="#12715b" className="time-tag" style={{ 
                margin: 0, 
                fontWeight: 'bold', 
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '12px',
                padding: '4px 8px'
              }}>
                ⏱️ {concept.estimatedTime}
              </Tag>
            )}
          </div>
        </Header>

        {/* Hero Section */}
        <div style={{
          padding: '120px 20px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Concept Icon and Badge */}
            <div style={{ 
              marginBottom: '30px',
              animation: 'fadeInDown 1s ease-out'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                borderRadius: '50%',
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(18, 113, 91, 0.3)',
                position: 'relative'
              }}>
                <div style={{ fontSize: '32px', color: 'white' }}>
                  <CodeOutlined />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#12715b',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  border: '2px solid rgb(245, 238, 233)'
                }}>
                  {currentStep + 1}
                </div>
              </div>
            </div>

            {/* Main Title */}
            <Title level={1} style={{ 
              color: '#1a1a1a', 
              marginBottom: '20px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: '"Open Sans", sans-serif',
              animation: 'fadeInUp 1s ease-out 0.2s both',
              lineHeight: '1.2'
            }}>
              Master {concept.title}
              <br />
              <span style={{ 
                fontWeight: 300,
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '12px',
                position: 'relative',
                background: 'rgba(18, 113, 91, 0.1)',
                border: '2px solid rgba(18, 113, 91, 0.2)',
                boxShadow: '0 4px 12px rgba(18, 113, 91, 0.15)',
                color: '#12715b'
              }}>
                with Learnify
              </span>
            </Title>
            
            {/* Subtitle */}
            <Paragraph style={{ 
              fontSize: '16px', 
              color: '#666', 
              marginBottom: '32px',
              animation: 'fadeInUp 1s ease-out 0.4s both',
              fontFamily: '"Open Sans", sans-serif',
              maxWidth: '800px',
              margin: '0 auto 32px',
              lineHeight: '1.6'
            }}>
              {concept.description}
            </Paragraph>

            {/* Learning Steps Preview */}
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)', 
                padding: '32px', 
                borderRadius: '20px',
                border: '1px solid rgba(18, 113, 91, 0.1)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)'
              }}>
                <Title level={3} style={{ 
                  color: '#1a1a1a', 
                  marginBottom: '24px',
                  fontFamily: '"Open Sans", sans-serif',
                  textAlign: 'center'
                }}>
                  Your Learning Journey
                </Title>
                <Row gutter={[16, 16]} justify="center">
                  {steps.map((step, index) => (
                    <Col xs={12} md={6} key={index}>
                      <div style={{
                        background: index === currentStep 
                          ? 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)'
                          : 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        borderRadius: '16px',
                        border: index === currentStep 
                          ? '2px solid #12715b'
                          : '1px solid rgba(18, 113, 91, 0.1)',
                        boxShadow: index === currentStep 
                          ? '0 8px 24px rgba(18, 113, 91, 0.25)'
                          : '0 4px 12px rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onClick={() => handleStepChange(index)}
                      onMouseEnter={(e) => {
                        if (index !== currentStep) {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(18, 113, 91, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (index !== currentStep) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                        }
                      }}
                      >
                        <div style={{
                          fontSize: '24px',
                          color: index === currentStep ? 'white' : '#12715b',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {step.icon}
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: index === currentStep ? 'white' : '#1a1a1a',
                          fontFamily: '"Open Sans", sans-serif',
                          marginBottom: '4px',
                          lineHeight: '1.2'
                        }}>
                          {step.title}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: index === currentStep ? 'rgba(255, 255, 255, 0.8)' : '#666',
                          fontFamily: '"Open Sans", sans-serif',
                          lineHeight: '1.2'
                        }}>
                          Step {index + 1}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Content style={{ padding: '0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card style={{ 
                position: 'sticky', 
                top: '24px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f0f0f0',
                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
              }}>
                <Title level={4} style={{ 
                  marginBottom: '24px',
                  fontFamily: '"Open Sans", sans-serif',
                  color: '#1a1a1a',
                  textAlign: 'center',
                  fontSize: '20px'
                }}>
                  📚 Learning Steps
                </Title>
                
                {/* Progress Overview */}
                <div style={{
                  background: 'rgba(18, 113, 91, 0.05)',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid rgba(18, 113, 91, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text strong style={{ color: '#1a1a1a', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>
                      Progress
                    </Text>
                    <Text strong style={{ color: '#12715b', fontFamily: '"Open Sans", sans-serif', fontSize: '14px' }}>
                      {Math.round(progress)}%
                    </Text>
                  </div>
                  <Progress 
                    percent={progress} 
                    strokeColor={{
                      '0%': '#12715b',
                      '100%': '#0f5f4a',
                    }}
                    showInfo={false}
                    style={{ marginBottom: '0' }}
                    strokeWidth={8}
                    trailColor="rgba(18, 113, 91, 0.1)"
                  />
                </div>

                {/* Enhanced Steps */}
                <div style={{ marginBottom: '16px' }}>
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      style={{
                        background: index === currentStep 
                          ? 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)'
                          : index < currentStep
                          ? 'rgba(18, 113, 91, 0.1)'
                          : 'rgba(255, 255, 255, 0.8)',
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '12px',
                        border: index === currentStep 
                          ? '2px solid #12715b'
                          : '1px solid rgba(18, 113, 91, 0.1)',
                        boxShadow: index === currentStep 
                          ? '0 4px 12px rgba(18, 113, 91, 0.25)'
                          : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onClick={() => handleStepChange(index)}
                      onMouseEnter={(e) => {
                        if (index !== currentStep) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 113, 91, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (index !== currentStep) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: index === currentStep 
                            ? 'white'
                            : index < currentStep
                            ? '#12715b'
                            : 'rgba(18, 113, 91, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px',
                          fontSize: '14px',
                          color: index === currentStep ? '#12715b' : 'white',
                          fontWeight: 'bold'
                        }}>
                          {index < currentStep ? '✓' : index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: index === currentStep ? 'white' : '#1a1a1a',
                            fontFamily: '"Open Sans", sans-serif',
                            marginBottom: '2px'
                          }}>
                            {step.title}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: index === currentStep ? 'rgba(255, 255, 255, 0.8)' : '#666',
                            fontFamily: '"Open Sans", sans-serif'
                          }}>
                            Step {index + 1}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '16px',
                          color: index === currentStep ? 'white' : '#12715b',
                          opacity: index === currentStep ? 1 : 0.6
                        }}>
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(18, 113, 91, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text style={{ color: '#666', fontFamily: '"Open Sans", sans-serif', fontSize: '12px' }}>
                      Difficulty
                    </Text>
                    <Text strong style={{ color: '#12715b', fontFamily: '"Open Sans", sans-serif', fontSize: '12px' }}>
                      {getDifficultyText(concept.difficulty)}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#666', fontFamily: '"Open Sans", sans-serif', fontSize: '12px' }}>
                      Time
                    </Text>
                    <Text strong style={{ color: '#12715b', fontFamily: '"Open Sans", sans-serif', fontSize: '12px' }}>
                      {concept.estimatedTime || '15'} min
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={16}>
              <div style={{ 
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f0f0f0',
                overflow: 'hidden'
              }}>
                {steps[currentStep]?.content}
              </div>
              
              <div style={{ 
                marginTop: '24px', 
                textAlign: 'center',
                padding: '32px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(18, 113, 91, 0.1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: 'linear-gradient(90deg, #12715b, #0f5f4a, #12715b)',
                  animation: 'rainbow 3s linear infinite'
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#12715b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: 'white',
                      animation: 'pulse 2s infinite'
                    }}>
                      📚
                    </div>
                    <Text strong style={{
                      color: '#1a1a1a',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '18px'
                    }}>
                      Continue Your Learning Journey
                    </Text>
                  </div>
                  
                  <div className="navigation-buttons" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginTop: '32px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, rgba(245, 238, 233, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    borderRadius: '20px',
                    border: '2px solid rgba(18, 113, 91, 0.1)',
                    boxShadow: '0 8px 32px rgba(18, 113, 91, 0.1)',
                    backdropFilter: 'blur(10px)',
                    flexWrap: 'wrap'
                  }}>
                    <Button 
                      className="navigation-button"
                      disabled={currentStep === 0}
                      onClick={() => handleStepChange(currentStep - 1)}
                      style={{
                        height: '56px',
                        padding: '0 24px',
                        borderRadius: '12px',
                        fontFamily: '"Open Sans", sans-serif',
                        fontWeight: '600',
                        fontSize: '14px',
                        border: '2px solid rgba(18, 113, 91, 0.3)',
                        color: currentStep === 0 ? '#ccc' : '#12715b',
                        background: currentStep === 0 
                          ? 'rgba(245, 245, 245, 0.5)' 
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 238, 233, 0.8) 100%)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '140px',
                        justifyContent: 'center',
                        boxShadow: currentStep === 0 
                          ? 'none' 
                          : '0 4px 16px rgba(18, 113, 91, 0.15)'
                      }}
                      onMouseEnter={(e) => {
                        if (currentStep !== 0) {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 113, 91, 0.25)';
                          e.currentTarget.style.borderColor = '#12715b';
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(18, 113, 91, 0.05) 0%, rgba(245, 238, 233, 0.9) 100%)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentStep !== 0) {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(18, 113, 91, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(18, 113, 91, 0.3)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 238, 233, 0.8) 100%)';
                        }
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: currentStep === 0 ? '#f0f0f0' : '#12715b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: currentStep === 0 ? '#ccc' : 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: currentStep === 0 ? 'none' : '0 2px 8px rgba(18, 113, 91, 0.3)'
                      }}>
                        ←
                      </div>
                      <span style={{ fontWeight: '600' }}>Previous</span>
                    </Button>
                    
                    <div className="progress-indicator" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 16px',
                      background: 'linear-gradient(135deg, rgba(18, 113, 91, 0.1) 0%, rgba(18, 113, 91, 0.05) 100%)',
                      borderRadius: '12px',
                      border: '2px solid rgba(18, 113, 91, 0.2)',
                      minWidth: '100px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(18, 113, 91, 0.3)'
                      }}>
                        {currentStep + 1}
                      </div>
                      <Text style={{
                        color: '#12715b',
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        Step {currentStep + 1} of {steps.length}
                      </Text>
                      <div style={{
                        width: '50px',
                        height: '3px',
                        background: 'rgba(18, 113, 91, 0.2)',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${((currentStep + 1) / steps.length) * 100}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #12715b 0%, #0f5f4a 100%)',
                          borderRadius: '2px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                    
                    <Button 
                      className="navigation-button"
                      type="primary"
                      disabled={currentStep === steps.length - 1}
                      onClick={() => handleStepChange(currentStep + 1)}
                      style={{
                        height: '56px',
                        padding: '0 24px',
                        borderRadius: '12px',
                        background: currentStep === steps.length - 1
                          ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
                          : 'linear-gradient(135deg, #12715b 0%, #0f5f4a 100%)',
                        border: 'none',
                        fontFamily: '"Open Sans", sans-serif',
                        fontWeight: '600',
                        fontSize: '14px',
                        boxShadow: currentStep === steps.length - 1
                          ? '0 6px 20px rgba(82, 196, 26, 0.3)'
                          : '0 6px 20px rgba(18, 113, 91, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '140px',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (currentStep !== steps.length - 1) {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 113, 91, 0.25)';
                        } else {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(82, 196, 26, 0.25)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentStep !== steps.length - 1) {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(18, 113, 91, 0.3)';
                        } else {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(82, 196, 26, 0.3)';
                        }
                      }}
                    >
                      <span style={{ fontWeight: '600' }}>
                        {currentStep === steps.length - 1 ? 'Complete Learning' : 'Next Step'}
                      </span>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}>
                        {currentStep === steps.length - 1 ? '✓' : '→'}
                      </div>
                    </Button>
                  </div>
                  
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 20px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    border: '1px solid rgba(18, 113, 91, 0.1)'
                  }}>
                    <Text style={{
                      color: '#666',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px',
                      textAlign: 'center',
                      margin: 0
                    }}>
                      {currentStep === 0 ? 'Start your learning journey!' : 
                       currentStep === steps.length - 1 ? 'You\'re almost there! Complete the final step.' :
                       `Great progress! You're on step ${currentStep + 1} of ${steps.length}.`}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Responsive Design for Concept Detail Page */
          @media (max-width: 768px) {
            .ant-layout-header {
              padding: 0 16px !important;
              height: 60px !important;
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
            
            .ant-tag {
              font-size: 11px !important;
              padding: 4px 8px !important;
            }
            
            .concept-icon {
              width: 60px !important;
              height: 60px !important;
            }
            
            .concept-icon-badge {
              width: 20px !important;
              height: 20px !important;
              font-size: 9px !important;
            }
            
            /* Header Responsive Styles */
            .concept-header {
              padding: 0 16px !important;
              height: 60px !important;
            }
            
            .header-left {
              flex: 1 !important;
              min-width: 0 !important;
            }
            
            .back-button {
              margin-right: 8px !important;
              padding: 6px 8px !important;
              font-size: 12px !important;
            }
            
            .back-text {
              display: none !important;
            }
            
            .header-title-container {
              flex: 1 !important;
              min-width: 0 !important;
            }
            
            .concept-title {
              font-size: 14px !important;
              line-height: 1.2 !important;
            }
            
            .header-tags {
              gap: 6px !important;
            }
            
            .difficulty-tag,
            .time-tag {
              font-size: 10px !important;
              padding: 2px 6px !important;
            }
            
            /* Navigation Buttons */
            .navigation-buttons {
              flex-direction: column !important;
              gap: 12px !important;
              padding: 16px !important;
            }
            
            .navigation-button {
              width: 100% !important;
              min-width: auto !important;
              height: 48px !important;
              padding: 0 16px !important;
              font-size: 14px !important;
            }
            
            .progress-indicator {
              width: 100% !important;
              min-width: auto !important;
              padding: 12px !important;
            }
          }
          
          @media (max-width: 576px) {
            .ant-layout-header {
              padding: 0 12px !important;
              height: 50px !important;
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
            
            .ant-tag {
              font-size: 10px !important;
              padding: 2px 6px !important;
            }
            
            .concept-icon {
              width: 50px !important;
              height: 50px !important;
            }
            
            .concept-icon-badge {
              width: 18px !important;
              height: 18px !important;
              font-size: 8px !important;
            }
            
            .ant-card-body {
              padding: 16px !important;
            }
            
            /* Header Responsive Styles */
            .concept-header {
              padding: 0 12px !important;
              height: 50px !important;
            }
            
            .back-button {
              margin-right: 6px !important;
              padding: 4px 6px !important;
              font-size: 11px !important;
            }
            
            .concept-title {
              font-size: 13px !important;
            }
            
            .header-tags {
              gap: 4px !important;
            }
            
            .difficulty-tag,
            .time-tag {
              font-size: 9px !important;
              padding: 1px 4px !important;
            }
            
            /* Navigation Buttons */
            .navigation-buttons {
              padding: 12px !important;
            }
            
            .navigation-button {
              height: 44px !important;
              padding: 0 12px !important;
              font-size: 13px !important;
            }
            
            .progress-indicator {
              padding: 8px !important;
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
            
            .ant-tag {
              font-size: 9px !important;
              padding: 1px 4px !important;
            }
            
            /* Header Responsive Styles */
            .concept-header {
              padding: 0 8px !important;
              height: 45px !important;
            }
            
            .back-button {
              margin-right: 4px !important;
              padding: 3px 4px !important;
              font-size: 10px !important;
            }
            
            .concept-title {
              font-size: 12px !important;
            }
            
            .header-tags {
              gap: 3px !important;
            }
            
            .difficulty-tag,
            .time-tag {
              font-size: 8px !important;
              padding: 1px 3px !important;
            }
            
            /* Navigation Buttons */
            .navigation-buttons {
              padding: 8px !important;
            }
            
            .navigation-button {
              height: 40px !important;
              padding: 0 8px !important;
              font-size: 12px !important;
            }
            
            .progress-indicator {
              padding: 6px !important;
            }
          }
          
          /* Tablet Styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .concept-header {
              padding: 0 16px !important;
            }
            
            .back-button {
              font-size: 13px !important;
            }
            
            .concept-title {
              font-size: 15px !important;
            }
            
            .header-tags {
              gap: 10px !important;
            }
            
            .difficulty-tag,
            .time-tag {
              font-size: 11px !important;
              padding: 3px 7px !important;
            }
          }
          
          /* Large Desktop Styles */
          @media (min-width: 1200px) {
            .concept-header {
              padding: 0 24px !important;
            }
            
            .back-button {
              font-size: 15px !important;
            }
            
            .concept-title {
              font-size: 16px !important;
            }
            
            .header-tags {
              gap: 12px !important;
            }
            
            .difficulty-tag,
            .time-tag {
              font-size: 13px !important;
              padding: 5px 10px !important;
            }
          }
          
          /* Hover Effects */
          .ant-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
          }
          
          /* Smooth Transitions */
          .ant-card,
          .ant-btn,
          .ant-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          /* Key Benefits Responsive Styles */
          .key-benefits-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            gap: 20px !important;
            align-items: stretch !important;
          }
          
          .key-benefit-card {
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
            min-height: 160px !important;
            padding: 24px !important;
          }
          
          .key-benefit-content {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .key-benefit-text {
            flex: 1 !important;
            margin: 0 !important;
          }
          
          @media (max-width: 768px) {
            .key-benefits-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            
            .key-benefit-card {
              min-height: 140px !important;
              padding: 20px !important;
            }
          }
          
          @media (max-width: 576px) {
            .key-benefits-grid {
              gap: 12px !important;
            }
            
            .key-benefit-card {
              min-height: 120px !important;
              padding: 16px !important;
            }
          }
          
          @media (max-width: 480px) {
            .key-benefits-grid {
              gap: 10px !important;
            }
            
            .key-benefit-card {
              min-height: 100px !important;
              padding: 12px !important;
            }
          }
          
          /* Overview Section Responsive Styles */
          .overview-container {
            padding: 0 !important;
          }
          
          .overview-title {
            padding: 0 20px !important;
          }
          
          .overview-section {
            border-radius: 0 !important;
            margin-bottom: 32px !important;
          }
          
          .overview-content {
            padding: 32px !important;
          }
          
          @media (max-width: 768px) {
            .overview-title {
              padding: 0 16px !important;
              font-size: 2rem !important;
            }
            
            .overview-content {
              padding: 24px !important;
            }
          }
          
          @media (max-width: 576px) {
            .overview-title {
              padding: 0 12px !important;
              font-size: 1.75rem !important;
            }
            
            .overview-content {
              padding: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .overview-title {
              padding: 0 8px !important;
              font-size: 1.5rem !important;
            }
            
            .overview-content {
              padding: 16px !important;
            }
          }
        `
      }} />
    </Layout>
  );
};

export default ConceptDetailPage; 