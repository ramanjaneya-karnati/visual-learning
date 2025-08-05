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
        <Card>
          <Title level={3}>Understanding {concept?.title}</Title>
          
          {/* Enhanced Description */}
          <div style={{ marginBottom: '24px' }}>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
              {concept?.description}
            </Paragraph>
            
            {/* Detailed Explanation */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Title level={4} style={{ color: '#1a1a1a', marginBottom: '12px' }}>
                📚 What You'll Learn
              </Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.7', color: '#4a4a4a' }}>
                {getDetailedExplanation(frameworkId || '', conceptId || '')}
              </Paragraph>
            </div>
            
            {/* Real-time Use Case */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Title level={4} style={{ color: '#1565c0', marginBottom: '12px' }}>
                🚀 Real-time Use Case Scenario
              </Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.7', color: '#1976d2' }}>
                {getRealTimeUseCase(frameworkId || '', conceptId || '')}
              </Paragraph>
            </div>
            
            {/* Benefits Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Title level={4} style={{ color: '#7b1fa2', marginBottom: '12px' }}>
                ✨ Key Benefits
              </Title>
              <ul style={{ fontSize: '15px', lineHeight: '1.7', color: '#6a1b9a' }}>
                {getKeyBenefits(frameworkId || '', conceptId || '').map((benefit, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
          
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
          <Title level={3}>💡 Interactive Story</Title>
          {concept?.story ? (
            <InteractiveStory story={concept.story} />
          ) : (
            <>
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
            </>
          )}
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