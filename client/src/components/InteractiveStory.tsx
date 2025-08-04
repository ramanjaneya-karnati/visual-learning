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
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8' }}>
            {story.scene}
          </Paragraph>
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
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8' }}>
            {story.problem}
          </Paragraph>
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
          <Paragraph style={{ fontSize: '16px', color: 'white', lineHeight: '1.8' }}>
            {story.solution}
          </Paragraph>
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