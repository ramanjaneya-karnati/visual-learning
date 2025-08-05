import React, { useState } from 'react';
import { Card, Button, Steps, Typography, Row, Col, Tag, Avatar, Space, Divider, Alert } from 'antd';
import { 
  PlayCircleOutlined, 
  BookOutlined, 
  BulbOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  SettingOutlined,
  CodeOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

interface StoryCharacter {
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
}

interface StoryMapping {
  [key: string]: string;
}

interface Story {
  title: string;
  scene: string;
  problem: string;
  solution: string;
  characters: {
    [key: string]: string;
  };
  mapping: StoryMapping;
  realWorld: string;
  insights?: string[];
}

interface InteractiveStoryProps {
  story: Story;
}

const InteractiveStory: React.FC<InteractiveStoryProps> = ({ story }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMapping, setShowMapping] = useState(false);

  const getSceneExplanation = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "In this kitchen scenario, we're setting up a professional cooking environment where different tools have specific purposes. The chef represents a React component, and each tool represents a different React Hook. This metaphor helps us understand how hooks work together to manage state and side effects in a React application.";
      case 'The Family Recipe Book':
        return "We're creating a shared knowledge system where recipes (data) need to be accessible to multiple chefs (components) without passing them individually. This represents the challenge of sharing state across a component tree and how Context API solves this problem elegantly.";
      case 'The Smart Kitchen Planner':
        return "This scenario demonstrates how a kitchen manager plans changes before implementing them. The planning phase represents React's Virtual DOM, where changes are calculated first before updating the actual kitchen (DOM). This metaphor shows how React optimizes performance by batching updates.";
      case 'The Smart Restaurant Menu':
        return "We're managing a restaurant menu system where not all dishes are prepared at once. This represents code splitting and lazy loading in React, where components are loaded only when needed, improving initial load times and overall performance.";
      case 'The Pre-Cooked Kitchen':
        return "This scenario shows a hybrid kitchen where some dishes are pre-cooked (server-rendered) and others are made fresh (client-side). This represents React Server Components, which run on the server and reduce the amount of JavaScript sent to the client.";
      case 'The Smart Highway System':
        return "We're upgrading from a single-lane road to a multi-lane highway system. This represents React's Concurrent Features, where multiple tasks can be processed simultaneously, and user interactions get priority over background work.";
      case 'The Smart Waiter':
        return "This scenario involves a waiter who manages customer expectations during busy times. This represents React Suspense, which provides a way to handle loading states and error boundaries in a declarative manner.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "We're setting up an automated ingredient delivery system where recipes can request ingredients without knowing where they come from. This represents Angular's Dependency Injection system, where components can request services without knowing how they're created or configured.";
      case 'The Smart Security System':
        return "This scenario involves a sophisticated monitoring system that only watches important areas. This represents Angular's Change Detection system, which efficiently tracks and updates only the parts of the UI that have actually changed.";
      case 'The Smart Ingredient Labels':
        return "We're creating a labeling system that tells the kitchen how to handle different ingredients. This represents Angular Decorators, which provide metadata to Angular about how to process classes, properties, and methods.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "We're learning advanced cooking techniques that can be applied across different cuisines. This represents Design Patterns, which are proven solutions to common programming problems that can be reused across different applications.";
      case 'The Restaurant Manager':
        return "We're setting up a centralized management system for the entire restaurant. This represents State Management patterns, where application state is managed in a predictable and centralized way.";
      case 'The Optimized Kitchen Layout':
        return "We're optimizing the kitchen layout for maximum efficiency. This represents Performance Optimization techniques, where we improve application speed and resource usage through various strategies.";
      
      default:
        return "This scene sets up a real-world scenario that mirrors the technical concept we're learning. The familiar context helps us understand complex programming concepts through everyday experiences.";
    }
  };

  const getProblemAnalysis = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "The problem stems from the need to manage state and side effects in functional components. Before hooks, React developers had to use class components for state management, which led to complex lifecycle methods and hard-to-reuse logic. The challenge was creating a way to use state and side effects in functional components while keeping the code clean and reusable.";
      case 'The Family Recipe Book':
        return "The core issue is prop drilling - passing data through multiple component levels just to get it to a deeply nested component. This creates tight coupling between components and makes the code harder to maintain. The challenge is finding a way to share data across the component tree without passing props through every level.";
      case 'The Smart Kitchen Planner':
        return "The problem is inefficient DOM updates that cause poor performance. Without a planning phase, every change would directly update the DOM, leading to expensive operations and slow user interfaces. The challenge is creating a way to batch updates and only modify what actually needs to change.";
      case 'The Smart Restaurant Menu':
        return "The issue is large bundle sizes that slow down initial page loads. Loading all components at once creates unnecessary network requests and delays user interaction. The challenge is finding a way to load components only when needed while maintaining a smooth user experience.";
      case 'The Pre-Cooked Kitchen':
        return "The problem is excessive client-side JavaScript that slows down applications and hurts SEO. Server-side rendering helps, but it still requires JavaScript to be sent to the client. The challenge is creating components that can run on the server and reduce the client-side JavaScript bundle.";
      case 'The Smart Highway System':
        return "The issue is blocking user interactions during heavy computations. Single-threaded JavaScript can cause the UI to freeze when processing large amounts of data. The challenge is creating a way to handle multiple tasks simultaneously while prioritizing user interactions.";
      case 'The Smart Waiter':
        return "The problem is managing loading states and error handling in a declarative way. Manual loading state management leads to complex code and inconsistent user experiences. The challenge is creating a unified way to handle async operations and their various states.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "The problem is tight coupling between components and their dependencies. Without dependency injection, components need to know how to create their own dependencies, making them hard to test and maintain. The challenge is creating a system that provides dependencies automatically.";
      case 'The Smart Security System':
        return "The issue is inefficient change detection that updates the entire UI even when only small parts have changed. This leads to poor performance, especially in large applications. The challenge is creating a smart system that only updates what has actually changed.";
      case 'The Smart Ingredient Labels':
        return "The problem is the need to provide metadata to Angular about how to handle classes, properties, and methods. Without decorators, Angular wouldn't know how to process components, services, and other features. The challenge is creating a declarative way to provide this metadata.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "The problem is reinventing solutions to common programming problems. Without design patterns, developers often create ad-hoc solutions that are hard to understand, maintain, and reuse. The challenge is creating standardized solutions that can be applied across different scenarios.";
      case 'The Restaurant Manager':
        return "The problem is managing application state in a predictable way. Without proper state management, data flows become chaotic and hard to debug. The challenge is creating a centralized system that manages state changes in a controlled manner.";
      case 'The Optimized Kitchen Layout':
        return "The problem is poor application performance that affects user experience. Without optimization techniques, applications become slow and resource-intensive. The challenge is finding ways to improve speed and efficiency without sacrificing functionality.";
      
      default:
        return "This problem represents a common challenge in software development that requires an elegant solution. Understanding the problem is the first step toward finding the right solution.";
    }
  };

  const getSolutionBreakdown = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "React Hooks work by providing a way to use state and side effects in functional components. useState creates a state variable and a setter function, while useEffect handles side effects like API calls and subscriptions. Custom hooks allow you to extract and reuse stateful logic across components.";
      case 'The Family Recipe Book':
        return "Context API works by creating a Provider component that wraps your app and provides data to all child components. useContext allows any component in the tree to access this data without prop drilling. The Provider re-renders all consuming components when the context value changes.";
      case 'The Smart Kitchen Planner':
        return "Virtual DOM works by creating a lightweight copy of the actual DOM in memory. When state changes, React creates a new virtual DOM tree and compares it with the previous one. Only the differences are applied to the real DOM, making updates efficient and fast.";
      case 'The Smart Restaurant Menu':
        return "Code splitting works by breaking your application into smaller chunks that can be loaded on demand. React.lazy() creates components that are only loaded when needed, while Suspense provides a fallback UI during loading. This reduces the initial bundle size and improves performance.";
      case 'The Pre-Cooked Kitchen':
        return "Server Components work by running on the server and sending HTML to the client. They can access server-side resources directly and don't need to be sent to the client as JavaScript. This reduces the client bundle size and improves initial load performance.";
      case 'The Smart Highway System':
        return "Concurrent Features work by allowing React to interrupt and resume work based on priority. User interactions get high priority, while background updates get lower priority. This prevents the UI from blocking and provides a smoother user experience.";
      case 'The Smart Waiter':
        return "Suspense works by providing a declarative way to handle loading states. It catches promises and shows fallback UI while the promise is pending. When the promise resolves, it renders the actual component. This creates a consistent loading experience across your app.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "Dependency Injection works by creating an injector that manages dependencies. When a component requests a service, the injector provides an instance. Services are registered with providers, and Angular automatically injects them where needed. This creates loose coupling and makes testing easier.";
      case 'The Smart Security System':
        return "Change Detection works by monitoring data changes and updating the DOM accordingly. Angular uses zones to track async operations and triggers change detection when needed. OnPush strategy only checks for changes when inputs change, improving performance.";
      case 'The Smart Ingredient Labels':
        return "Decorators work by providing metadata to Angular about how to handle classes, properties, and methods. @Component tells Angular to treat a class as a component, @Injectable marks it for dependency injection, and @Input/@Output define data flow.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "Design Patterns work by providing proven solutions to common problems. The Singleton pattern ensures only one instance exists, Factory creates objects without specifying their exact class, Observer notifies objects of state changes, and Strategy allows selecting algorithms at runtime.";
      case 'The Restaurant Manager':
        return "State Management works by centralizing application state and providing predictable ways to update it. Actions describe what happened, reducers specify how state changes, and selectors extract specific data. This creates a predictable data flow and makes debugging easier.";
      case 'The Optimized Kitchen Layout':
        return "Performance optimization works through various techniques. Memoization caches expensive calculations, lazy loading loads code on demand, caching stores frequently accessed data, and bundling groups related code together. These techniques work together to improve application performance.";
      
      default:
        return "This solution provides an elegant way to solve the problem while maintaining code quality and performance. Understanding how it works helps you apply it effectively in your own projects.";
    }
  };

  const getSolutionBenefits = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "Hooks provide cleaner, more readable code compared to class components. They make stateful logic reusable across components and eliminate the complexity of lifecycle methods. This leads to better code organization and easier testing.";
      case 'The Family Recipe Book':
        return "Context API eliminates prop drilling and makes components more reusable. It provides a clean way to share global state and reduces component coupling. This makes applications easier to maintain and refactor.";
      case 'The Smart Kitchen Planner':
        return "Virtual DOM provides excellent performance by minimizing DOM updates. It enables declarative UI programming and makes React applications fast and responsive. This is crucial for complex applications with frequent updates.";
      case 'The Smart Restaurant Menu':
        return "Code splitting improves initial load times and reduces bundle sizes. It enables better user experience, especially on slower networks, and improves SEO through faster page loads. This is essential for production applications.";
      case 'The Pre-Cooked Kitchen':
        return "Server Components reduce client-side JavaScript and improve initial load performance. They enable better SEO and provide enhanced security by running sensitive code on the server. This represents the future of React development.";
      case 'The Smart Highway System':
        return "Concurrent Features provide better user experience by preventing UI blocking. They enable more responsive applications and better handling of complex interactions. This is crucial for modern, interactive applications.";
      case 'The Smart Waiter':
        return "Suspense provides a consistent way to handle loading states and errors. It eliminates the need for manual loading management and creates better user experiences. This makes applications more reliable and user-friendly.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "Dependency Injection creates loosely coupled, testable code. It makes components easier to test and maintain, and enables better code organization. This is essential for enterprise applications and large codebases.";
      case 'The Smart Security System':
        return "Change Detection provides automatic UI updates with excellent performance. It enables declarative programming and makes Angular applications responsive and efficient. This is crucial for complex, data-driven applications.";
      case 'The Smart Ingredient Labels':
        return "Decorators provide clean, declarative code that's easy to understand. They enable powerful Angular features and make the framework more expressive. This leads to better developer experience and code quality.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "Design Patterns provide proven solutions that improve code quality and maintainability. They make code easier to understand, test, and extend. This is essential for team development and long-term project success.";
      case 'The Restaurant Manager':
        return "State Management provides predictable data flow and makes debugging easier. It enables better user experiences and makes applications more maintainable. This is crucial for complex applications with multiple data sources.";
      case 'The Optimized Kitchen Layout':
        return "Performance optimization improves user experience and reduces resource usage. It enables applications to handle more users and data while maintaining responsiveness. This is essential for production applications and user satisfaction.";
      
      default:
        return "This solution provides significant benefits in terms of performance, maintainability, and user experience. Understanding these benefits helps you make better architectural decisions in your projects.";
    }
  };

  const getTechnicalImplications = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "Without hooks, React applications would be limited to class components, making them harder to test, more verbose, and less reusable. This would impact the entire React ecosystem and limit the adoption of functional programming patterns.";
      case 'The Family Recipe Book':
        return "Prop drilling leads to tightly coupled components, making refactoring difficult and reducing component reusability. It also makes testing harder since components need to receive all their dependencies through props.";
      case 'The Smart Kitchen Planner':
        return "Inefficient DOM updates cause poor user experience, especially in complex applications. Without optimization, React applications would be slow and unresponsive, limiting their adoption for performance-critical use cases.";
      case 'The Smart Restaurant Menu':
        return "Large bundle sizes impact user experience, especially on slower networks. This affects SEO, user retention, and overall application performance, making it crucial for production applications.";
      case 'The Pre-Cooked Kitchen':
        return "Excessive client-side JavaScript affects performance, SEO, and accessibility. It also increases development complexity and makes applications harder to optimize for different devices and network conditions.";
      case 'The Smart Highway System':
        return "Blocking user interactions creates poor user experience and makes applications feel unresponsive. This is especially problematic for complex applications that need to handle multiple concurrent operations.";
      case 'The Smart Waiter':
        return "Manual loading state management leads to inconsistent user experiences and complex, error-prone code. It makes applications harder to maintain and debug, especially when dealing with multiple async operations.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "Without dependency injection, Angular applications would be tightly coupled and hard to test. This would limit Angular's adoption for enterprise applications that require high testability and maintainability.";
      case 'The Smart Security System':
        return "Inefficient change detection would make Angular applications slow and unresponsive, especially in large applications. This would limit Angular's use for performance-critical applications.";
      case 'The Smart Ingredient Labels':
        return "Without decorators, Angular wouldn't have its powerful features like dependency injection, component metadata, and service registration. This would fundamentally change Angular's architecture and capabilities.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "Without design patterns, code becomes harder to understand, maintain, and extend. This affects team productivity, code quality, and the ability to scale applications effectively.";
      case 'The Restaurant Manager':
        return "Poor state management leads to unpredictable application behavior, making debugging difficult and user experience inconsistent. This is especially problematic for complex applications with multiple data sources.";
      case 'The Optimized Kitchen Layout':
        return "Poor performance affects user experience, SEO, and business metrics. It can lead to user abandonment and reduced application adoption, especially in competitive markets.";
      
      default:
        return "These technical implications affect application performance, maintainability, and user experience. Understanding them helps developers make better architectural decisions.";
    }
  };

  const getLearningContext = (storyTitle: string): string => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return "Understanding React Hooks is crucial for modern React development. Hooks allow functional components to manage state and side effects, making them as powerful as class components but with cleaner, more readable code. This knowledge is essential for building interactive user interfaces.";
      case 'The Family Recipe Book':
        return "Context API is fundamental for sharing data across component trees without prop drilling. It's especially important for global state like themes, user authentication, and language preferences. This concept is key for building maintainable React applications.";
      case 'The Smart Kitchen Planner':
        return "Virtual DOM is React's core optimization mechanism. Understanding how it works helps you write more efficient React code and debug performance issues. This knowledge is essential for building fast, responsive applications.";
      case 'The Smart Restaurant Menu':
        return "Code splitting and lazy loading are essential for modern web performance. They help reduce initial bundle sizes and improve user experience, especially for large applications. This is crucial for production-ready React applications.";
      case 'The Pre-Cooked Kitchen':
        return "Server Components represent the future of React development. They enable better performance, SEO, and user experience by reducing client-side JavaScript. This knowledge is essential for next-generation React applications.";
      case 'The Smart Highway System':
        return "Concurrent Features are React's latest innovation for better user experience. They enable non-blocking UI updates and better handling of complex interactions. This represents the cutting edge of React development.";
      case 'The Smart Waiter':
        return "Suspense is React's solution for handling loading states and errors declaratively. It's essential for creating smooth user experiences and handling asynchronous operations gracefully.";
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return "Dependency Injection is Angular's core architectural pattern. It enables loose coupling, testability, and maintainable code. Understanding DI is essential for building scalable Angular applications.";
      case 'The Smart Security System':
        return "Change Detection is crucial for Angular performance. Understanding how it works helps you optimize your applications and avoid common performance pitfalls. This knowledge is essential for building fast Angular applications.";
      case 'The Smart Ingredient Labels':
        return "Decorators are fundamental to Angular's architecture. They provide metadata that Angular uses to configure components, services, and other features. Understanding decorators is essential for Angular development.";
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return "Design Patterns are essential for writing maintainable, scalable code. They provide proven solutions to common problems and help teams write code that's easier to understand and modify.";
      case 'The Restaurant Manager':
        return "State Management is crucial for complex applications. It helps manage application data in a predictable way and is essential for building applications that are easy to debug and maintain.";
      case 'The Optimized Kitchen Layout':
        return "Performance optimization is essential for user experience. Understanding these techniques helps you build applications that are fast, responsive, and resource-efficient.";
      
      default:
        return "This concept is fundamental to modern web development and understanding it will help you build better, more maintainable applications.";
    }
  };

  const getInsights = (storyTitle: string) => {
    switch (storyTitle) {
      // React Concepts
      case 'The Chef\'s Toolbox':
        return [
          "🎯 useState is like a labeled ingredient container - you can store and update values",
          "⏰ useEffect is like a cooking timer - it runs when dependencies change",
          "📢 useContext is like a kitchen announcement system - data flows to all components",
          "🔄 Custom hooks are like creating your own specialized kitchen tools"
        ];
      case 'The Family Recipe Book':
        return [
          "📚 Context Provider is like placing the recipe book in the center of the kitchen",
          "👨‍🍳 useContext is like chefs directly accessing the recipe book",
          "🚫 No more prop drilling - chefs don't need to ask each other for recipes",
          "⚡ Performance boost - data is shared efficiently across the component tree"
        ];
      case 'The Smart Kitchen Planner':
        return [
          "📝 Virtual DOM is like planning changes on paper before touching the kitchen",
          "🔍 Diffing algorithm compares the old plan with the new plan",
          "⚡ Only necessary changes are made to the real DOM",
          "🎯 Batching updates is like grouping multiple kitchen changes together"
        ];
      case 'The Smart Restaurant Menu':
        return [
          "📋 React.lazy() is like creating a menu that only prints when requested",
          "⏳ Suspense is like a waiter who keeps customers entertained while food cooks",
          "📦 Code splitting reduces the initial bundle size significantly",
          "🚀 Better performance - only load what users actually need"
        ];
      case 'The Pre-Cooked Kitchen':
        return [
          "🍳 Server Components are like pre-cooking popular dishes",
          "⚡ Faster initial load - no need to wait for client-side rendering",
          "📦 Smaller client bundle - server handles heavy lifting",
          "🔄 Streaming allows progressive loading of content"
        ];
      case 'The Smart Highway System':
        return [
          "🛣️ Fiber is like upgrading from a single-lane road to a multi-lane highway",
          "🚨 Priority scheduling - emergency vehicles (user interactions) get priority",
          "⏸️ Interruptible rendering - can pause and resume work",
          "🎯 Concurrent features enable better user experience"
        ];
      case 'The Smart Waiter':
        return [
          "👨‍💼 Suspense is like a waiter who manages customer expectations",
          "⏳ Fallback UI keeps users informed while data loads",
          "🎭 Declarative loading states - no more manual loading management",
          "🔄 Automatic error boundaries and retry mechanisms"
        ];
      case 'The Multi-Tasking Restaurant':
        return [
          "🔄 Concurrent rendering allows multiple tasks to happen simultaneously",
          "⏸️ Interruptible - can pause low-priority work for user interactions",
          "🎯 Priority-based scheduling - important updates get processed first",
          "🚀 Non-blocking UI - users never feel the app is frozen"
        ];
      
      // Angular Concepts
      case 'The Smart Recipe Box':
        return [
          "📦 Injector is like the recipe box mechanism that provides ingredients automatically",
          "🏷️ Providers are like ingredient registration - telling the system what's available",
          "🎫 Tokens are like ingredient labels - unique identifiers for each dependency",
          "🔄 Singleton services are like shared ingredients used across multiple recipes"
        ];
      case 'The Smart Security System':
        return [
          "📹 OnPush strategy is like smart camera zones that only monitor important areas",
          "🔄 Zone.js is like the monitoring system that tracks all async operations",
          "🚨 Change detection is like the alert mechanism that triggers UI updates",
          "⏱️ Detection cycles are like monitoring rounds that check for changes"
        ];
      case 'The Smart Ingredient Labels':
        return [
          "🏷️ @Component is like an ingredient type label that tells Angular how to handle it",
          "🔧 @Injectable is like a service label that marks it for dependency injection",
          "📥 @Input is like a receiving label that accepts data from parent components",
          "📤 @Output is like a sending label that emits events to parent components"
        ];
      
      // Advanced Patterns
      case 'The Master Chef\'s Techniques':
        return [
          "👑 Singleton pattern is like having one master recipe that everyone uses",
          "🏭 Factory pattern is like a recipe creation method that builds objects",
          "📢 Observer pattern is like a kitchen announcement system for events",
          "🎯 Strategy pattern is like selecting the best cooking method for each dish"
        ];
      case 'The Restaurant Manager':
        return [
          "📊 Store is like the central status board that tracks everything",
          "📝 Actions are like manager instructions that describe what needs to happen",
          "🔄 Reducers are like status updates that modify the current state",
          "🔍 Selectors are like information queries that extract specific data"
        ];
      case 'The Optimized Kitchen Layout':
        return [
          "🧠 Memoization is like pre-preparing ingredients to avoid repeated work",
          "📦 Lazy loading is like on-demand equipment that's only brought out when needed",
          "🗄️ Caching is like ingredient storage that keeps frequently used items ready",
          "📦 Bundling is like equipment grouping that packages related tools together"
        ];
      
      default:
        return [
          "💡 This metaphor helps you understand the concept in familiar terms",
          "🎯 The real-world scenario makes complex technical concepts accessible",
          "🔄 Understanding the metaphor makes debugging and problem-solving easier"
        ];
    }
  };

  const steps = [
    {
      title: 'Setting the Scene',
      icon: <BookOutlined />,
      content: (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white' }}>
          <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
            🎭 {story.title}
          </Title>
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8', marginBottom: '16px' }}>
            {story.scene}
          </Paragraph>
          
          {/* Enhanced Scene Explanation */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              📖 Scene Breakdown
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getSceneExplanation(story.title)}
            </Paragraph>
          </div>
          
          {/* Learning Context */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              🎯 Learning Context
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getLearningContext(story.title)}
            </Paragraph>
          </div>
        </div>
      )
    },
    {
      title: 'The Problem',
      icon: <BulbOutlined />,
      content: (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', borderRadius: '12px', color: 'white' }}>
          <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
            🎯 The Challenge
          </Title>
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8', marginBottom: '16px' }}>
            {story.problem}
          </Paragraph>
          
          {/* Problem Analysis */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              🔍 Problem Analysis
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getProblemAnalysis(story.title)}
            </Paragraph>
          </div>
          
          {/* Technical Implications */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              ⚠️ Technical Implications
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getTechnicalImplications(story.title)}
            </Paragraph>
          </div>
        </div>
      )
    },
    {
      title: 'The Solution',
      icon: <CheckCircleOutlined />,
      content: (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', borderRadius: '12px', color: 'white' }}>
          <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
            💡 The Solution
          </Title>
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8', marginBottom: '16px' }}>
            {story.solution}
          </Paragraph>
          
          {/* Solution Breakdown */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              🔧 How It Works
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getSolutionBreakdown(story.title)}
            </Paragraph>
          </div>
          
          {/* Benefits */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
              ✨ Key Benefits
            </Title>
            <Paragraph style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              {getSolutionBenefits(story.title)}
            </Paragraph>
          </div>
        </div>
      )
    },
    {
      title: 'Character Mapping',
      icon: <UserOutlined />,
      content: (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 100%)', borderRadius: '12px', color: 'white' }}>
          <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
            🎪 Meet the Characters
          </Title>
          <Row gutter={[16, 16]}>
            {Object.entries(story.characters).map(([key, value]) => (
              <Col xs={24} sm={12} key={key}>
                <Card size="small" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar 
                      size="small" 
                      style={{ backgroundColor: '#1890ff' }}
                      icon={<UserOutlined />}
                    />
                    <div>
                      <Text strong style={{ color: 'white', fontSize: '14px' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Text>
                      <br />
                      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                        {value}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )
    },
    {
      title: 'Real World',
      icon: <CodeOutlined />,
      content: (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)', borderRadius: '12px', color: 'white' }}>
          <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
            🌍 Real-World Application
          </Title>
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8', marginBottom: '16px' }}>
            {story.realWorld}
          </Paragraph>
          
          <Alert
            message="💡 Key Insights"
            description="Here's how this metaphor relates to the actual React concept:"
            type="info"
            showIcon
            style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          />
          
          <div style={{ marginBottom: '16px' }}>
            {getInsights(story.title).map((insight, index) => (
              <div key={index} style={{ 
                padding: '8px 12px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '6px', 
                marginBottom: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Text style={{ color: 'white', fontSize: '14px' }}>
                  {insight}
                </Text>
              </div>
            ))}
          </div>
          
          <Button 
            type="primary" 
            size="large"
            onClick={() => setShowMapping(!showMapping)}
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            {showMapping ? 'Hide' : 'Show'} Concept Mapping
          </Button>
          
          {showMapping && (
            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <Title level={5} style={{ color: 'white', marginBottom: '12px' }}>
                🔗 Concept Mapping
              </Title>
              <Row gutter={[8, 8]}>
                {Object.entries(story.mapping).map(([key, value]) => (
                  <Col xs={24} sm={12} key={key}>
                    <Card size="small" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ textAlign: 'center' }}>
                        <Text code style={{ color: '#ffd700', fontSize: '12px' }}>
                          {key}
                        </Text>
                        <br />
                        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>
                          {value}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <Card>
        <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
          🎭 Interactive Story: {story.title}
        </Title>
        
        <Steps
          current={currentStep}
          onChange={setCurrentStep}
          style={{ marginBottom: '24px' }}
          items={steps.map((step, index) => ({
            title: step.title,
            icon: step.icon,
            description: `Step ${index + 1}`
          }))}
        />
        
        <div style={{ marginBottom: '24px' }}>
          {steps[currentStep]?.content}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
            <Button 
              type="primary"
              disabled={currentStep === steps.length - 1}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              {currentStep === steps.length - 1 ? 'Complete Story' : 'Next'}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveStory; 