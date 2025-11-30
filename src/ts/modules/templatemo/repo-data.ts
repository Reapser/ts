import type { PortfolioItem, Skill } from '../../types/index';

export const portfolioData: PortfolioItem[] = [
  { id: 1, title: 'Neural Network', description: 'Advanced AI system with deep learning capabilities for predictive analytics and pattern recognition.', image: 'assets/images/neural-network.jpg', tech: ['TensorFlow', 'Python', 'CUDA'] },
  { id: 2, title: 'Quantum Cloud', description: 'Next-generation cloud infrastructure leveraging quantum computing for unprecedented processing power.', image: 'assets/images/quantum-cloud.jpg', tech: ['AWS', 'Kubernetes', 'Docker'] },
  { id: 3, title: 'Blockchain Vault', description: 'Secure decentralized storage solution using advanced encryption and distributed ledger technology.', image: 'assets/images/blockchain-vault.jpg', tech: ['Ethereum', 'Solidity', 'Web3'] },
  { id: 4, title: 'Cyber Defense', description: 'Military-grade cybersecurity framework with real-time threat detection and automated response.', image: 'assets/images/cyber-defense.jpg', tech: ['Zero Trust', 'AI Defense', 'Encryption'] },
  { id: 5, title: 'Data Nexus', description: 'Big data processing platform capable of analyzing petabytes of information in real-time.', image: 'assets/images/data-nexus.jpg', tech: ['Apache Spark', 'Hadoop', 'Kafka'] },
  { id: 6, title: 'AR Interface', description: 'Augmented reality system for immersive data visualization and interactive experiences.', image: 'assets/images/ar-interface.jpg', tech: ['Unity', 'ARCore', 'Computer Vision'] },
  { id: 7, title: 'IoT Matrix', description: 'Intelligent IoT ecosystem connecting millions of devices with edge computing capabilities.', image: 'assets/images/iot-matrix.jpg', tech: ['MQTT', 'Edge AI', '5G'] },
];

export const skillsData: Skill[] = [
  { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
  { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
  { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
  { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
  { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
  { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
  { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
  { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
  { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
  { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
  { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
  { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' },
];
