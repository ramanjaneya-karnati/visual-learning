import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/visual-learning');

// Import models
const Concept = require('../models/Concept').default;
const Framework = require('../models/Framework').default;

const enhancedStories = {
  // React Concepts
  'hooks': {
    sceneExplanation: "In this kitchen scenario, we're setting up a professional cooking environment where different tools have specific purposes. The chef represents a React component, and each tool represents a different React Hook. This metaphor helps us understand how hooks work together to manage state and side effects in a React application.",
    learningContext: "Understanding React Hooks is crucial for modern React development. Hooks allow functional components to manage state and side effects, making them as powerful as class components but with cleaner, more readable code. This knowledge is essential for building interactive user interfaces.",
    problemAnalysis: "The problem stems from the need to manage state and side effects in functional components. Before hooks, React developers had to use class components for state management, which led to complex lifecycle methods and hard-to-reuse logic. The challenge was creating a way to use state and side effects in functional components while keeping the code clean and reusable.",
    technicalImplications: "Without hooks, React applications would be limited to class components, making them harder to test, more verbose, and less reusable. This would impact the entire React ecosystem and limit the adoption of functional programming patterns.",
    solutionBreakdown: "React Hooks work by providing a way to use state and side effects in functional components. useState creates a state variable and a setter function, while useEffect handles side effects like API calls and subscriptions. Custom hooks allow you to extract and reuse stateful logic across components.",
    solutionBenefits: "Hooks provide cleaner, more readable code compared to class components. They make stateful logic reusable across components and eliminate the complexity of lifecycle methods. This leads to better code organization and easier testing."
  },
  'context-api': {
    sceneExplanation: "We're creating a shared knowledge system where recipes (data) need to be accessible to multiple chefs (components) without passing them individually. This represents the challenge of sharing state across a component tree and how Context API solves this problem elegantly.",
    learningContext: "Context API is fundamental for sharing data across component trees without prop drilling. It's especially important for global state like themes, user authentication, and language preferences. This concept is key for building maintainable React applications.",
    problemAnalysis: "The core issue is prop drilling - passing data through multiple component levels just to get it to a deeply nested component. This creates tight coupling between components and makes the code harder to maintain. The challenge is finding a way to share data across the component tree without passing props through every level.",
    technicalImplications: "Prop drilling leads to tightly coupled components, making refactoring difficult and reducing component reusability. It also makes testing harder since components need to receive all their dependencies through props.",
    solutionBreakdown: "Context API works by creating a Provider component that wraps your app and provides data to all child components. useContext allows any component in the tree to access this data without prop drilling. The Provider re-renders all consuming components when the context value changes.",
    solutionBenefits: "Context API eliminates prop drilling and makes components more reusable. It provides a clean way to share global state and reduces component coupling. This makes applications easier to maintain and refactor."
  },
  'virtual-dom': {
    sceneExplanation: "This scenario demonstrates how a kitchen manager plans changes before implementing them. The planning phase represents React's Virtual DOM, where changes are calculated first before updating the actual kitchen (DOM). This metaphor shows how React optimizes performance by batching updates.",
    learningContext: "Virtual DOM is React's core optimization mechanism. Understanding how it works helps you write more efficient React code and debug performance issues. This knowledge is essential for building fast, responsive applications.",
    problemAnalysis: "The problem is inefficient DOM updates that cause poor performance. Without a planning phase, every change would directly update the DOM, leading to expensive operations and slow user interfaces. The challenge is creating a way to batch updates and only modify what actually needs to change.",
    technicalImplications: "Inefficient DOM updates cause poor user experience, especially in complex applications. Without optimization, React applications would be slow and unresponsive, limiting their adoption for performance-critical use cases.",
    solutionBreakdown: "Virtual DOM works by creating a lightweight copy of the actual DOM in memory. When state changes, React creates a new virtual DOM tree and compares it with the previous one. Only the differences are applied to the real DOM, making updates efficient and fast.",
    solutionBenefits: "Virtual DOM provides excellent performance by minimizing DOM updates. It enables declarative UI programming and makes React applications fast and responsive. This is crucial for complex applications with frequent updates."
  },
  'lazy-loading': {
    sceneExplanation: "We're managing a restaurant menu system where not all dishes are prepared at once. This represents code splitting and lazy loading in React, where components are loaded only when needed, improving initial load times and overall performance.",
    learningContext: "Code splitting and lazy loading are essential for modern web performance. They help reduce initial bundle sizes and improve user experience, especially for large applications. This is crucial for production-ready React applications.",
    problemAnalysis: "The issue is large bundle sizes that slow down initial page loads. Loading all components at once creates unnecessary network requests and delays user interaction. The challenge is finding a way to load components only when needed while maintaining a smooth user experience.",
    technicalImplications: "Large bundle sizes impact user experience, especially on slower networks. This affects SEO, user retention, and overall application performance, making it crucial for production applications.",
    solutionBreakdown: "Code splitting works by breaking your application into smaller chunks that can be loaded on demand. React.lazy() creates components that are only loaded when needed, while Suspense provides a fallback UI during loading. This reduces the initial bundle size and improves performance.",
    solutionBenefits: "Code splitting improves initial load times and reduces bundle sizes. It enables better user experience, especially on slower networks, and improves SEO through faster page loads. This is essential for production applications."
  },
  'server-components': {
    sceneExplanation: "This scenario shows a hybrid kitchen where some dishes are pre-cooked (server-rendered) and others are made fresh (client-side). This represents React Server Components, which run on the server and reduce the amount of JavaScript sent to the client.",
    learningContext: "Server Components represent the future of React development. They enable better performance, SEO, and user experience by reducing client-side JavaScript. This knowledge is essential for next-generation React applications.",
    problemAnalysis: "The problem is excessive client-side JavaScript that slows down applications and hurts SEO. Server-side rendering helps, but it still requires JavaScript to be sent to the client. The challenge is creating components that can run on the server and reduce the client-side JavaScript bundle.",
    technicalImplications: "Excessive client-side JavaScript affects performance, SEO, and accessibility. It also increases development complexity and makes applications harder to optimize for different devices and network conditions.",
    solutionBreakdown: "Server Components work by running on the server and sending HTML to the client. They can access server-side resources directly and don't need to be sent to the client as JavaScript. This reduces the client bundle size and improves initial load performance.",
    solutionBenefits: "Server Components reduce client-side JavaScript and improve initial load performance. They enable better SEO and provide enhanced security by running sensitive code on the server. This represents the future of React development."
  },
  'fiber-architecture': {
    sceneExplanation: "We're upgrading from a single-lane road to a multi-lane highway system. This represents React's Concurrent Features, where multiple tasks can be processed simultaneously, and user interactions get priority over background work.",
    learningContext: "Concurrent Features are React's latest innovation for better user experience. They enable non-blocking UI updates and better handling of complex interactions. This represents the cutting edge of React development.",
    problemAnalysis: "The issue is blocking user interactions during heavy computations. Single-threaded JavaScript can cause the UI to freeze when processing large amounts of data. The challenge is creating a way to handle multiple tasks simultaneously while prioritizing user interactions.",
    technicalImplications: "Blocking user interactions creates poor user experience and makes applications feel unresponsive. This is especially problematic for complex applications that need to handle multiple concurrent operations.",
    solutionBreakdown: "Concurrent Features work by allowing React to interrupt and resume work based on priority. User interactions get high priority, while background updates get lower priority. This prevents the UI from blocking and provides a smoother user experience.",
    solutionBenefits: "Concurrent Features provide better user experience by preventing UI blocking. They enable more responsive applications and better handling of complex interactions. This is crucial for modern, interactive applications."
  },
  'suspense': {
    sceneExplanation: "This scenario involves a waiter who manages customer expectations during busy times. This represents React Suspense, which provides a way to handle loading states and error boundaries in a declarative manner.",
    learningContext: "Suspense is React's solution for handling loading states and errors declaratively. It's essential for creating smooth user experiences and handling asynchronous operations gracefully.",
    problemAnalysis: "The problem is managing loading states and error handling in a declarative way. Manual loading state management leads to complex code and inconsistent user experiences. The challenge is creating a unified way to handle async operations and their various states.",
    technicalImplications: "Manual loading state management leads to inconsistent user experiences and complex, error-prone code. It makes applications harder to maintain and debug, especially when dealing with multiple async operations.",
    solutionBreakdown: "Suspense works by providing a declarative way to handle loading states. It catches promises and shows fallback UI while the promise is pending. When the promise resolves, it renders the actual component. This creates a consistent loading experience across your app.",
    solutionBenefits: "Suspense provides a consistent way to handle loading states and errors. It eliminates the need for manual loading management and creates better user experiences. This makes applications more reliable and user-friendly."
  },
  'concurrent-features': {
    sceneExplanation: "We're upgrading from a single-lane road to a multi-lane highway system. This represents React's Concurrent Features, where multiple tasks can be processed simultaneously, and user interactions get priority over background work.",
    learningContext: "Concurrent Features are React's latest innovation for better user experience. They enable non-blocking UI updates and better handling of complex interactions. This represents the cutting edge of React development.",
    problemAnalysis: "The issue is blocking user interactions during heavy computations. Single-threaded JavaScript can cause the UI to freeze when processing large amounts of data. The challenge is creating a way to handle multiple tasks simultaneously while prioritizing user interactions.",
    technicalImplications: "Blocking user interactions creates poor user experience and makes applications feel unresponsive. This is especially problematic for complex applications that need to handle multiple concurrent operations.",
    solutionBreakdown: "Concurrent Features work by allowing React to interrupt and resume work based on priority. User interactions get high priority, while background updates get lower priority. This prevents the UI from blocking and provides a smoother user experience.",
    solutionBenefits: "Concurrent Features provide better user experience by preventing UI blocking. They enable more responsive applications and better handling of complex interactions. This is crucial for modern, interactive applications."
  },

  // Angular Concepts
  'dependency-injection': {
    sceneExplanation: "We're setting up an automated ingredient delivery system where recipes can request ingredients without knowing where they come from. This represents Angular's Dependency Injection system, where components can request services without knowing how they're created or configured.",
    learningContext: "Dependency Injection is Angular's core architectural pattern. It enables loose coupling, testability, and maintainable code. Understanding DI is essential for building scalable Angular applications.",
    problemAnalysis: "The problem is tight coupling between components and their dependencies. Without dependency injection, components need to know how to create their own dependencies, making them hard to test and maintain. The challenge is creating a system that provides dependencies automatically.",
    technicalImplications: "Without dependency injection, Angular applications would be tightly coupled and hard to test. This would limit Angular's adoption for enterprise applications that require high testability and maintainability.",
    solutionBreakdown: "Dependency Injection works by creating an injector that manages dependencies. When a component requests a service, the injector provides an instance. Services are registered with providers, and Angular automatically injects them where needed. This creates loose coupling and makes testing easier.",
    solutionBenefits: "Dependency Injection creates loosely coupled, testable code. It makes components easier to test and maintain, and enables better code organization. This is essential for enterprise applications and large codebases."
  },
  'change-detection': {
    sceneExplanation: "This scenario involves a sophisticated monitoring system that only watches important areas. This represents Angular's Change Detection system, which efficiently tracks and updates only the parts of the UI that have actually changed.",
    learningContext: "Change Detection is crucial for Angular performance. Understanding how it works helps you optimize your applications and avoid common performance pitfalls. This knowledge is essential for building fast Angular applications.",
    problemAnalysis: "The issue is inefficient change detection that updates the entire UI even when only small parts have changed. This leads to poor performance, especially in large applications. The challenge is creating a smart system that only updates what has actually changed.",
    technicalImplications: "Inefficient change detection would make Angular applications slow and unresponsive, especially in large applications. This would limit Angular's use for performance-critical applications.",
    solutionBreakdown: "Change Detection works by monitoring data changes and updating the DOM accordingly. Angular uses zones to track async operations and triggers change detection when needed. OnPush strategy only checks for changes when inputs change, improving performance.",
    solutionBenefits: "Change Detection provides automatic UI updates with excellent performance. It enables declarative programming and makes Angular applications responsive and efficient. This is crucial for complex, data-driven applications."
  },
  'decorators': {
    sceneExplanation: "We're creating a labeling system that tells the kitchen how to handle different ingredients. This represents Angular Decorators, which provide metadata to Angular about how to process classes, properties, and methods.",
    learningContext: "Decorators are fundamental to Angular's architecture. They provide metadata that Angular uses to configure components, services, and other features. Understanding decorators is essential for Angular development.",
    problemAnalysis: "The problem is the need to provide metadata to Angular about how to handle classes, properties, and methods. Without decorators, Angular wouldn't know how to process components, services, and other features. The challenge is creating a declarative way to provide this metadata.",
    technicalImplications: "Without decorators, Angular wouldn't have its powerful features like dependency injection, component metadata, and service registration. This would fundamentally change Angular's architecture and capabilities.",
    solutionBreakdown: "Decorators work by providing metadata to Angular about how to handle classes, properties, and methods. @Component tells Angular to treat a class as a component, @Injectable marks it for dependency injection, and @Input/@Output define data flow.",
    solutionBenefits: "Decorators provide clean, declarative code that's easy to understand. They enable powerful Angular features and make the framework more expressive. This leads to better developer experience and code quality."
  },

  // Advanced Patterns
  'design-patterns': {
    sceneExplanation: "We're learning advanced cooking techniques that can be applied across different cuisines. This represents Design Patterns, which are proven solutions to common programming problems that can be reused across different applications.",
    learningContext: "Design Patterns are essential for writing maintainable, scalable code. They provide proven solutions to common problems and help teams write code that's easier to understand and modify.",
    problemAnalysis: "The problem is reinventing solutions to common programming problems. Without design patterns, developers often create ad-hoc solutions that are hard to understand, maintain, and reuse. The challenge is creating standardized solutions that can be applied across different scenarios.",
    technicalImplications: "Without design patterns, code becomes harder to understand, maintain, and extend. This affects team productivity, code quality, and the ability to scale applications effectively.",
    solutionBreakdown: "Design Patterns work by providing proven solutions to common problems. The Singleton pattern ensures only one instance exists, Factory creates objects without specifying their exact class, Observer notifies objects of state changes, and Strategy allows selecting algorithms at runtime.",
    solutionBenefits: "Design Patterns provide proven solutions that improve code quality and maintainability. They make code easier to understand, test, and extend. This is essential for team development and long-term project success."
  },
  'state-management': {
    sceneExplanation: "We're setting up a centralized management system for the entire restaurant. This represents State Management patterns, where application state is managed in a predictable and centralized way.",
    learningContext: "State Management is crucial for complex applications. It helps manage application data in a predictable way and is essential for building applications that are easy to debug and maintain.",
    problemAnalysis: "The problem is managing application state in a predictable way. Without proper state management, data flows become chaotic and hard to debug. The challenge is creating a centralized system that manages state changes in a controlled manner.",
    technicalImplications: "Poor state management leads to unpredictable application behavior, making debugging difficult and user experience inconsistent. This is especially problematic for complex applications with multiple data sources.",
    solutionBreakdown: "State Management works by centralizing application state and providing predictable ways to update it. Actions describe what happened, reducers specify how state changes, and selectors extract specific data. This creates a predictable data flow and makes debugging easier.",
    solutionBenefits: "State Management provides predictable data flow and makes debugging easier. It enables better user experiences and makes applications more maintainable. This is crucial for complex applications with multiple data sources."
  },
  'performance-optimization': {
    sceneExplanation: "We're optimizing the kitchen layout for maximum efficiency. This represents Performance Optimization techniques, where we improve application speed and resource usage through various strategies.",
    learningContext: "Performance optimization is essential for user experience. Understanding these techniques helps you build applications that are fast, responsive, and resource-efficient.",
    problemAnalysis: "The problem is poor application performance that affects user experience. Without optimization techniques, applications become slow and resource-intensive. The challenge is finding ways to improve speed and efficiency without sacrificing functionality.",
    technicalImplications: "Poor performance affects user experience, SEO, and business metrics. It can lead to user abandonment and reduced application adoption, especially in competitive markets.",
    solutionBreakdown: "Performance optimization works through various techniques. Memoization caches expensive calculations, lazy loading loads code on demand, caching stores frequently accessed data, and bundling groups related code together. These techniques work together to improve application performance.",
    solutionBenefits: "Performance optimization improves user experience and reduces resource usage. It enables applications to handle more users and data while maintaining responsiveness. This is essential for production applications and user satisfaction."
  }
};

async function updateEnhancedStories() {
  try {
    console.log('🔄 Starting to update concepts with enhanced visual metaphor content...');

    for (const [conceptId, enhancedContent] of Object.entries(enhancedStories)) {
      console.log(`📝 Updating concept: ${conceptId}`);
      
      const concept = await Concept.findOne({ id: conceptId });
      if (!concept) {
        console.log(`⚠️ Concept ${conceptId} not found, skipping...`);
        continue;
      }

      // Update the story object with enhanced content
      if (concept.story) {
        concept.story = {
          ...concept.story,
          sceneExplanation: enhancedContent.sceneExplanation,
          learningContext: enhancedContent.learningContext,
          problemAnalysis: enhancedContent.problemAnalysis,
          technicalImplications: enhancedContent.technicalImplications,
          solutionBreakdown: enhancedContent.solutionBreakdown,
          solutionBenefits: enhancedContent.solutionBenefits
        };
      }

      await concept.save();
      console.log(`✅ Updated concept: ${conceptId}`);
    }

    console.log('🎉 Successfully updated all concepts with enhanced visual metaphor content!');
    console.log('📊 Summary:');
    console.log(`   - Enhanced ${Object.keys(enhancedStories).length} concepts`);
    console.log('   - Added detailed explanations for each stage');
    console.log('   - Improved learning context and technical implications');

  } catch (error) {
    console.error('❌ Error updating enhanced stories:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the update
updateEnhancedStories(); 