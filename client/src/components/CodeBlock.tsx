import React, { useEffect, useRef } from 'react';
import { Card, Button, message, Tooltip } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopyButton?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'typescript', 
  title,
  showCopyButton = true 
}) => {
  // Auto-detect language if not specified
  const detectLanguage = (code: string, fallback: string) => {
    if (language !== 'typescript') return language;
    
    if (code.includes('import React') || code.includes('function') && code.includes('return')) {
      return 'jsx';
    }
    if (code.includes('@Component') || code.includes('@Injectable')) {
      return 'typescript';
    }
    if (code.includes('console.log')) {
      return 'javascript';
    }
    
    return fallback;
  };

  const detectedLanguage = detectLanguage(code, language);
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      message.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error('Failed to copy code');
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'typescript': return 'TypeScript';
      case 'javascript': return 'JavaScript';
      case 'jsx': return 'JSX';
      case 'tsx': return 'TSX';
      case 'json': return 'JSON';
      case 'css': return 'CSS';
      case 'html': return 'HTML';
      case 'markup': return 'HTML';
      default: return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  };

  return (
    <Card
      size="small"
      style={{ 
        marginBottom: '16px',
        border: '1px solid #d9d9d9',
        borderRadius: '8px'
      }}
      bodyStyle={{ padding: '0' }}
    >
      <div style={{ 
        background: '#2d3748', 
        padding: '12px 16px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {title && (
            <span style={{ 
              color: '#e2e8f0', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              {title}
            </span>
          )}
          <span style={{ 
            color: '#a0aec0', 
            fontSize: '12px',
            background: '#4a5568',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            {getLanguageLabel(detectedLanguage)}
          </span>
        </div>
        {showCopyButton && (
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <Button
              type="text"
              size="small"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopy}
              style={{ 
                color: copied ? '#48bb78' : '#e2e8f0',
                border: 'none',
                padding: '4px 8px'
              }}
            />
          </Tooltip>
        )}
      </div>
      <div style={{ 
        background: '#1a202c',
        padding: '16px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        overflow: 'auto',
        maxHeight: '400px'
      }}>
        <pre style={{ 
          margin: 0, 
          background: 'transparent',
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}>
          <code
            ref={codeRef}
            className={`language-${detectedLanguage}`}
            style={{ 
              background: 'transparent',
              color: '#e2e8f0'
            }}
          >
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
};

export default CodeBlock; 