import React from 'react';
import {
  Modal,
  Descriptions,
  Tag,
  Typography,
  Card,
  Row,
  Col,
  Divider,
  Button,
  Space
} from 'antd';
import { EditOutlined, BookOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Concept {
  _id: string;
  id: string;
  title: string;
  description: string;
  metaphor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  framework?: string;
  story?: {
    title: string;
    scene: string;
    problem: string;
    solution: string;
    characters: Record<string, string>;
    mapping: Record<string, string>;
    realWorld: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ConceptViewProps {
  visible: boolean;
  concept?: Concept | null;
  onCancel: () => void;
  onEdit?: () => void;
}

const ConceptView: React.FC<ConceptViewProps> = ({
  visible,
  concept,
  onCancel,
  onEdit
}) => {
  if (!concept) return null;

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'green',
      intermediate: 'orange',
      advanced: 'red'
    };
    return colors[difficulty as keyof typeof colors] || 'default';
  };

  return (
    <Modal
      title={
        <Space>
          <BookOutlined />
          <Title level={4} style={{ margin: 0 }}>
            {concept.title}
          </Title>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>
            Close
          </Button>
          {onEdit && (
            <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
              Edit Concept
            </Button>
          )}
        </Space>
      }
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Descriptions title="Basic Information" column={2}>
              <Descriptions.Item label="Concept ID">
                <Text code>{concept.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Framework">
                <Tag color="blue">{concept.framework || 'N/A'}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Difficulty">
                <Tag color={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Estimated Time">
                <Space>
                  <ClockCircleOutlined />
                  <Text>{concept.estimatedTime}</Text>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Description">
            <Paragraph>{concept.description}</Paragraph>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Visual Metaphor">
            <Paragraph style={{ fontStyle: 'italic' }}>
              {concept.metaphor}
            </Paragraph>
          </Card>
        </Col>

        {concept.story && (
          <>
            <Col span={24}>
              <Card title="Interactive Story">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Title level={5}>Story Title</Title>
                    <Text>{concept.story.title}</Text>
                  </Col>
                  <Col span={12}>
                    <Title level={5}>Scene</Title>
                    <Text>{concept.story.scene}</Text>
                  </Col>
                  <Col span={24}>
                    <Title level={5}>Problem</Title>
                    <Paragraph>{concept.story.problem}</Paragraph>
                  </Col>
                  <Col span={24}>
                    <Title level={5}>Solution</Title>
                    <Paragraph>{concept.story.solution}</Paragraph>
                  </Col>
                  <Col span={24}>
                    <Title level={5}>Real World Application</Title>
                    <Paragraph>{concept.story.realWorld}</Paragraph>
                  </Col>
                </Row>

                {concept.story.characters && Object.keys(concept.story.characters).length > 0 && (
                  <>
                    <Divider />
                    <Title level={5}>Character Mapping</Title>
                    <Row gutter={[16, 8]}>
                      {Object.entries(concept.story.characters).map(([key, value]) => (
                        <Col span={12} key={key}>
                          <Card size="small">
                            <Text strong>{key}:</Text> {value}
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {concept.story.mapping && Object.keys(concept.story.mapping).length > 0 && (
                  <>
                    <Divider />
                    <Title level={5}>Concept Mapping</Title>
                    <Row gutter={[16, 8]}>
                      {Object.entries(concept.story.mapping).map(([key, value]) => (
                        <Col span={12} key={key}>
                          <Card size="small">
                            <Text strong>{key}:</Text> {value}
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          </>
        )}

        <Col span={24}>
          <Card title="Metadata">
            <Descriptions column={2}>
              <Descriptions.Item label="Created">
                {concept.createdAt ? new Date(concept.createdAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {concept.updatedAt ? new Date(concept.updatedAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ConceptView; 