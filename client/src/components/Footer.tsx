import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Divider, Collapse } from 'antd';
import { BookOutlined, ArrowRightOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const Footer: React.FC = () => {
  const [companyExpanded, setCompanyExpanded] = useState(false);
  const [quickLinksExpanded, setQuickLinksExpanded] = useState(false);

  const toggleCompany = () => setCompanyExpanded(!companyExpanded);
  const toggleQuickLinks = () => setQuickLinksExpanded(!quickLinksExpanded);

  return (
    <AntFooter style={{ 
      background: 'white',
      borderTop: '1px solid #f0f0f0',
      padding: '60px 50px 40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <BookOutlined style={{ fontSize: '28px', color: '#12715b', marginRight: '12px' }} />
              <Title level={4} style={{ color: '#1a1a1a', margin: 0, fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}>
                Learnify
              </Title>
            </div>
            <Paragraph style={{ color: '#666', margin: 0, lineHeight: '1.6', marginBottom: '24px', fontFamily: '"Open Sans", sans-serif' }}>
              Making programming concepts accessible through visual metaphors and interactive learning experiences designed for modern developers.
            </Paragraph>
          </Col>
          
          <Col xs={24} md={8}>
            {/* Desktop Company Section */}
            <div className="footer-company-desktop" style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#1a1a1a', 
                marginBottom: '16px',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                Company
              </div>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                lineHeight: '2',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="/about" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    About Us
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="/features" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Features
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Learning Paths
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Interactive Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Company Accordion */}
            <div className="footer-company-mobile" style={{ marginBottom: '24px' }}>
              <div 
                className="footer-accordion-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  transition: 'all 0.3s ease'
                }}
                onClick={toggleCompany}
              >
                <span>Company</span>
                <div className="accordion-icon" style={{
                  transition: 'transform 0.3s ease',
                  transform: companyExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  {companyExpanded ? <MinusOutlined /> : <PlusOutlined />}
                </div>
              </div>
              <div 
                className="footer-accordion-content"
                style={{
                  maxHeight: companyExpanded ? '300px' : '0px',
                  overflow: 'hidden',
                  padding: companyExpanded ? '16px 0' : '0px',
                  borderBottom: companyExpanded ? '1px solid #f0f0f0' : 'none',
                  opacity: companyExpanded ? 1 : 0,
                  transform: companyExpanded ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  lineHeight: '2',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="/about" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      About Us
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="/features" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Features
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Learning Paths
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Interactive Stories
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            {/* Desktop Quick Links Section */}
            <div className="footer-quicklinks-desktop" style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#1a1a1a', 
                marginBottom: '16px',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                Quick Links
              </div>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                lineHeight: '2',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    React Concepts
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Vue.js Tutorials
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Angular Guides
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ 
                    color: '#666', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Node.js Concepts
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Quick Links Accordion */}
            <div className="footer-quicklinks-mobile" style={{ marginBottom: '24px' }}>
              <div 
                className="footer-accordion-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  transition: 'all 0.3s ease'
                }}
                onClick={toggleQuickLinks}
              >
                <span>Quick Links</span>
                <div className="accordion-icon" style={{
                  transition: 'transform 0.3s ease',
                  transform: quickLinksExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  {quickLinksExpanded ? <MinusOutlined /> : <PlusOutlined />}
                </div>
              </div>
              <div 
                className="footer-accordion-content"
                style={{
                  maxHeight: quickLinksExpanded ? '300px' : '0px',
                  overflow: 'hidden',
                  padding: quickLinksExpanded ? '16px 0' : '0px',
                  borderBottom: quickLinksExpanded ? '1px solid #f0f0f0' : 'none',
                  opacity: quickLinksExpanded ? 1 : 0,
                  transform: quickLinksExpanded ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  lineHeight: '2',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      React Concepts
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Vue.js Tutorials
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Angular Guides
                    </a>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ 
                      color: '#666', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      Node.js Concepts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        
        <Divider style={{ margin: '40px 0 24px 0' }} />
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#666', fontSize: '14px', fontFamily: '"Open Sans", sans-serif' }}>
            © 2024 <span style={{ fontWeight: 600, color: '#12715b' }}>Learnify</span>. All Rights Reserved. 
            Making programming accessible through visual learning.
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ 
              color: '#666', 
              fontSize: '16px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={{ 
              color: '#666', 
              fontSize: '16px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="#" style={{ 
              color: '#666', 
              fontSize: '16px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#12715b'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Footer Responsive Styles */
          @media (max-width: 768px) {
            .footer-company-desktop,
            .footer-quicklinks-desktop {
              display: none !important;
            }
            
            .footer-company-mobile,
            .footer-quicklinks-mobile {
              display: block !important;
            }
          }
          
          @media (min-width: 769px) {
            .footer-company-mobile,
            .footer-quicklinks-mobile {
              display: none !important;
            }
            
            .footer-company-desktop,
            .footer-quicklinks-desktop {
              display: block !important;
            }
          }
          
          /* Accordion Animation */
          .footer-accordion-content {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            overflow: hidden !important;
          }
          
          .footer-accordion-header {
            transition: all 0.3s ease !important;
            user-select: none !important;
          }
          
          .footer-accordion-header:hover {
            background-color: rgba(18, 113, 91, 0.05) !important;
            transform: translateY(-1px) !important;
          }
          
          .accordion-icon {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          /* Smooth content animation */
          .footer-accordion-content ul {
            transition: opacity 0.3s ease !important;
          }
          
          /* Hover effects for links */
          .footer-accordion-content a {
            transition: color 0.3s ease, transform 0.2s ease !important;
          }
          
          .footer-accordion-content a:hover {
            transform: translateX(5px) !important;
          }
          
          /* Animation keyframes for smooth transitions */
          @keyframes slideDown {
            from {
              max-height: 0;
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              max-height: 300px;
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideUp {
            from {
              max-height: 300px;
              opacity: 1;
              transform: translateY(0);
            }
            to {
              max-height: 0;
              opacity: 0;
              transform: translateY(-10px);
            }
          }
          
          /* Enhanced mobile styles */
          @media (max-width: 768px) {
            .footer-accordion-header {
              padding: 16px 0 !important;
              border-radius: 8px !important;
              margin-bottom: 8px !important;
            }
            
            .footer-accordion-content {
              border-radius: 8px !important;
              margin-bottom: 8px !important;
            }
            
            .footer-accordion-content ul li {
              padding: 8px 0 !important;
              border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
            }
            
            .footer-accordion-content ul li:last-child {
              border-bottom: none !important;
            }
          }
        `
      }} />
    </AntFooter>
  );
};

export default Footer; 