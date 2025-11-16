import type { Article, FactCheck, PollData } from '../types';

// Mock articles data
const mockArticlesByCategory: Record<string, Article[]> = {
  Latest: [
    {
      id: '1',
      title: 'Revolutionary AI Model Breaks Language Barriers',
      excerpt: 'A new AI system can translate between over 100 languages in real-time, making global communication seamless and instant.',
      content: `# Revolutionary AI Model Breaks Language Barriers

The world of artificial intelligence has reached another milestone with the introduction of a groundbreaking translation system that supports over 100 languages.

## What Makes It Special

This new AI model uses advanced neural networks to understand context, idioms, and cultural nuances that traditional translation tools miss. Unlike previous systems that translate word-by-word, this model understands the complete meaning of sentences and paragraphs.

## Real-World Applications

Companies worldwide are already implementing this technology to break down communication barriers. Customer service departments can now provide support in any language instantly. Educational platforms can offer courses to students regardless of their native language.

The system also handles regional dialects and slang, making translations more natural and accurate. This is particularly important for languages with many regional variations.

## Technical Innovations

The model was trained on billions of multilingual text pairs, learning not just translation but also the cultural context behind words and phrases. It can detect when a phrase needs a cultural adaptation rather than a literal translation.

Developers are excited about the API, which allows easy integration into existing applications. The low latency ensures that real-time conversations flow naturally.

## Future Potential

Researchers believe this is just the beginning. Future versions may include voice translation, sign language support, and even translation of ancient languages that have been lost to time.

This breakthrough represents a significant step toward true global understanding and collaboration.`,
      category: 'AI',
      tags: ['#AI', '#Translation', '#Language', '#Technology', '#Innovation'],
      author: 'Alex Chen',
      date: 'December 15, 2024',
      imageUrl: '/placeholder-1280x720-1.jpg',
      readingTime: 5,
      popularity: 87,
      factChecks: [
        {
          claim: 'A new AI system can translate between over 100 languages in real-time',
          verdict: 'Likely True',
          explanation: 'While exact capabilities vary, modern AI translation systems do support 100+ languages with varying degrees of real-time performance.'
        }
      ],
      poll: {
        question: 'Do you think AI translation will replace human translators?',
        options: [
          { text: 'Yes, completely', votes: 45 },
          { text: 'Partially', votes: 120 },
          { text: 'No, they will work together', votes: 89 },
          { text: 'Not sure', votes: 23 }
        ]
      }
    },
    {
      id: '2',
      title: 'Quantum Computing Reaches New Milestone',
      excerpt: 'Scientists achieve quantum supremacy with a 1000-qubit processor, solving complex problems that would take classical computers millennia.',
      content: `# Quantum Computing Reaches New Milestone

The field of quantum computing has achieved what many thought impossible just a decade ago: a stable 1000-qubit quantum processor.

## Breaking Down the Achievement

Quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously. This allows them to perform calculations at speeds that are exponentially faster than classical computers for certain problems.

Previous quantum computers were limited by stability and error rates. This new processor maintains quantum coherence for much longer periods, enabling more complex calculations.

## Practical Applications

The implications are vast. Drug discovery could be accelerated dramatically, as quantum computers can simulate molecular interactions at an atomic level. Climate modeling could become far more accurate, helping us understand and combat climate change.

Cryptography will need to evolve, as quantum computers can potentially break current encryption methods. But they also offer new, quantum-based encryption that could be unbreakable.

## The Path Forward

While this is a major achievement, practical quantum computing for everyday use is still years away. The systems require extremely cold temperatures and are highly sensitive to environmental interference.

However, cloud-based quantum computing services are already allowing researchers and companies to experiment with quantum algorithms without owning the hardware.

## Challenges Remaining

Error correction remains a significant challenge. Quantum states are fragile, and maintaining them across 1000 qubits is incredibly difficult. Researchers are working on error correction codes that could make quantum computers more reliable.

This milestone represents not just technological achievement but the opening of entirely new fields of research and application.`,
      category: 'Hardware',
      tags: ['#QuantumComputing', '#Hardware', '#Science', '#Innovation'],
      author: 'Dr. Sarah Johnson',
      date: 'December 14, 2024',
      imageUrl: '/placeholder-1280x720-2.jpg',
      readingTime: 6,
      popularity: 92
    },
    {
      id: '3',
      title: 'New Open Source Framework Simplifies Web Development',
      excerpt: 'Developers release a revolutionary framework that reduces web app development time by 70%, with built-in support for modern features.',
      content: `# New Open Source Framework Simplifies Web Development

A team of developers has released an open-source framework that's changing how web applications are built, cutting development time significantly.

## What Sets It Apart

This framework eliminates much of the boilerplate code that developers typically write. It includes built-in state management, routing, and API handling, reducing the need for multiple libraries.

The framework uses a component-based architecture that makes code more reusable and easier to maintain. Developers can build complex applications with less code and fewer dependencies.

## Developer Experience

One of the key focuses was developer experience. The framework includes excellent tooling, comprehensive documentation, and a helpful community. The learning curve is gentle, making it accessible to developers of all skill levels.

Hot module replacement means developers see changes instantly without page refreshes. The build system is optimized for fast compilation and small bundle sizes.

## Performance Optimizations

The framework is designed with performance in mind. It includes automatic code splitting, lazy loading, and optimized rendering. Applications built with it load quickly and run smoothly.

The architecture allows for progressive enhancement, so applications work well even on slower devices or network connections.

## Adoption and Community

Since its release, thousands of developers have adopted the framework. Major companies are using it for production applications, proving its reliability and scalability.

The open-source nature means the community actively contributes improvements, bug fixes, and new features. Regular updates keep the framework modern and aligned with web standards.

This framework represents a shift toward more productive and enjoyable web development, allowing developers to focus on building great user experiences rather than wrestling with configuration.`,
      category: 'Software',
      tags: ['#WebDevelopment', '#OpenSource', '#Framework', '#Programming'],
      author: 'Marcus Williams',
      date: 'December 13, 2024',
      imageUrl: '/placeholder-1280x720-3.jpg',
      readingTime: 4,
      popularity: 78
    },
    {
      id: '4',
      title: 'Cybersecurity Threats Reach Record High',
      excerpt: 'New report shows a 300% increase in sophisticated cyber attacks targeting critical infrastructure and personal data.',
      content: `# Cybersecurity Threats Reach Record High

A comprehensive cybersecurity report has revealed alarming trends in digital threats, with attacks becoming both more frequent and more sophisticated.

## The Growing Threat Landscape

Cybercriminals are using increasingly advanced techniques, including AI-powered attacks that can adapt and learn. These aren't just script kiddies anymore—well-funded groups are targeting everything from personal data to critical national infrastructure.

Ransomware attacks have evolved beyond simple file encryption. Attackers now steal data before encrypting it, threatening to release sensitive information if ransoms aren't paid.

## Critical Infrastructure at Risk

Power grids, water systems, and transportation networks are becoming prime targets. These attacks can cause real-world damage beyond just data loss. The interconnected nature of modern infrastructure means a single breach can have cascading effects.

Many critical systems still run on outdated software that can't be easily updated. The challenge is maintaining uptime while improving security.

## The Role of AI in Defense

Just as attackers use AI, defenders are deploying it too. AI systems can detect unusual patterns and respond to threats in real-time, far faster than human security teams could.

However, AI systems themselves can be attacked or manipulated. This creates an arms race between offensive and defensive AI capabilities.

## Best Practices for Protection

For individuals, using strong, unique passwords and enabling two-factor authentication remains crucial. Regular software updates patch known vulnerabilities.

Organizations need comprehensive security strategies that include employee training, regular audits, and incident response plans. No system is perfectly secure, so preparation for breaches is essential.

## Looking Ahead

The cybersecurity landscape will continue to evolve. Quantum computing may break current encryption methods, requiring new cryptographic approaches. The Internet of Things expands the attack surface, requiring new security considerations.

This report serves as a wake-up call that cybersecurity isn't just an IT concern—it's a fundamental requirement for our digital society.`,
      category: 'Cybersecurity',
      tags: ['#Cybersecurity', '#Privacy', '#Threats', '#Infrastructure'],
      author: 'TechPulse Security Team',
      date: 'December 12, 2024',
      imageUrl: '/placeholder-1280x720-4.jpg',
      readingTime: 7,
      popularity: 85,
      factChecks: [
        {
          claim: 'A 300% increase in sophisticated cyber attacks',
          verdict: 'Needs Context',
          explanation: 'Attack frequency varies by region and organization type. The overall trend is upward, but specific percentages depend on measurement criteria.'
        }
      ]
    }
  ],
  AI: [
    {
      id: '5',
      title: 'AI Personal Assistant Becomes Truly Conversational',
      excerpt: 'Latest AI assistant can maintain context across days-long conversations and remember personal preferences with remarkable accuracy.',
      content: `# AI Personal Assistant Becomes Truly Conversational

The latest generation of AI assistants has achieved what seemed impossible: truly natural, context-aware conversations that feel genuinely helpful.

## The Breakthrough

Previous AI assistants would lose context quickly or give generic responses. This new system maintains context across entire conversations, even when those conversations span multiple days or cover dozens of topics.

The AI remembers your preferences, past conversations, and even your communication style. It learns how you like information presented and adapts accordingly.

## Practical Benefits

Imagine an assistant that knows you're planning a trip and proactively finds flights that match your schedule and preferences. Or one that remembers you mentioned a book and follows up weeks later to see if you enjoyed it.

The system can handle complex, multi-step requests. Instead of simple commands, you can have actual conversations about your goals, and the AI will help you achieve them.

## Privacy and Control

All of this raises important privacy questions. The system is designed with privacy in mind—you can see what it remembers, delete memories, and control what information is stored.

The AI runs on-device when possible, keeping sensitive data local. Cloud processing is optional and clearly indicated when used.

## The Future of Human-Computer Interaction

This represents a shift from commanding computers to truly collaborating with them. As these systems improve, they could become essential productivity and life management tools.

The technology isn't perfect yet—it can still misunderstand or make mistakes. But the progress is remarkable and suggests we're approaching AI that genuinely assists rather than just responds.

For now, early adopters are finding these assistants genuinely useful for managing schedules, researching topics, and staying organized. The question is no longer whether AI assistants will be useful, but how we'll integrate them into our daily lives.`,
      category: 'AI',
      tags: ['#AI', '#Assistant', '#Conversational', '#Productivity'],
      author: 'Jordan Lee',
      date: 'December 11, 2024',
      imageUrl: '/placeholder-1280x720-5.jpg',
      readingTime: 5,
      popularity: 81
    }
  ],
  Software: [
    {
      id: '6',
      title: 'Container Technology Evolves Beyond Docker',
      excerpt: 'New container runtime offers better performance and security while maintaining compatibility with existing container images.',
      content: `# Container Technology Evolves Beyond Docker

While Docker popularized containers, new runtimes are emerging that address limitations and push the technology forward.

## Why Move Beyond Docker?

Docker revolutionized software deployment, but it was designed over a decade ago. Modern applications have different needs around performance, security, and resource usage.

The new runtime uses a different architecture that reduces overhead. Applications start faster and use less memory. For organizations running thousands of containers, these improvements add up to significant cost savings.

## Security Improvements

One major focus is security. The new runtime has a smaller attack surface and better isolation between containers. It implements security best practices by default rather than requiring configuration.

Security scanning is built-in, automatically checking container images for known vulnerabilities before deployment. This helps organizations maintain security without slowing down development.

## Compatibility and Migration

Despite the architectural differences, the runtime maintains compatibility with Docker images. This means teams can adopt it gradually without rewriting their entire infrastructure.

Migration tools help convert Docker Compose files and container configurations. Most applications work without modification, though some may need minor adjustments for optimal performance.

## Performance Gains

Benchmarks show significant performance improvements. Container startup time is reduced by up to 50%, and memory usage can be 30% lower for typical workloads.

These improvements are especially valuable for serverless platforms and edge computing, where fast startup and low resource usage are critical.

## The Ecosystem

A growing ecosystem of tools and services supports this new runtime. Major cloud providers are offering native support, and monitoring and management tools are quickly adding compatibility.

This evolution demonstrates how open-source technologies can improve while maintaining backward compatibility, allowing gradual adoption and migration.`,
      category: 'Software',
      tags: ['#Containers', '#DevOps', '#Software', '#Cloud'],
      author: 'Ryan Martinez',
      date: 'December 10, 2024',
      imageUrl: '/placeholder-1280x720-6.jpg',
      readingTime: 6,
      popularity: 74
    }
  ],
  Hardware: [
    {
      id: '7',
      title: 'Next-Gen Processors Deliver 50% Performance Boost',
      excerpt: 'Latest CPU architecture uses 3D stacking technology to pack more transistors while improving efficiency.',
      content: `# Next-Gen Processors Deliver 50% Performance Boost

The latest processor generation has launched, promising significant performance improvements through innovative manufacturing techniques.

## 3D Stacking Technology

Traditional processors are flat—transistors are arranged in a single layer. This new architecture stacks multiple layers, dramatically increasing transistor density without making chips larger.

The technology allows for specialized layers optimized for different functions. One layer might handle high-performance cores while another manages efficiency cores, all working together seamlessly.

## Performance in Real-World Use

Benchmarks show impressive gains, but real-world performance depends on the workload. Applications that can utilize multiple cores see the biggest improvements.

Gaming performance is up significantly, with better frame rates and smoother gameplay. Content creators benefit from faster video encoding and rendering times.

## Efficiency Improvements

Despite the performance gains, power efficiency has actually improved. The new architecture allows for better power management, with more granular control over which parts of the chip are active.

Laptops benefit from better battery life, while data centers can pack more computing power into the same energy budget. This is crucial as computational demands continue growing.

## Manufacturing Challenges

3D stacking is complex and expensive. Yield rates are lower than traditional manufacturing, which affects costs. However, as the technology matures, costs should decrease.

The cooling requirements are also different. Stacked chips generate more heat in a smaller space, requiring improved thermal solutions.

## The Road Ahead

This represents the direction processor technology is heading. As traditional 2D scaling becomes harder, 3D approaches offer a path forward.

Future generations will refine these techniques, potentially stacking even more layers or using different materials for better performance. We're entering an exciting new era of processor design.

For consumers, this means more capable devices without the bulk or battery life compromises of the past.`,
      category: 'Hardware',
      tags: ['#Hardware', '#CPU', '#Performance', '#Technology'],
      author: 'David Park',
      date: 'December 9, 2024',
      imageUrl: '/placeholder-1280x720-7.jpg',
      readingTime: 5,
      popularity: 88
    }
  ],
  Cybersecurity: [
    {
      id: '8',
      title: 'Zero-Trust Architecture Becomes Industry Standard',
      excerpt: 'Organizations worldwide adopt zero-trust security models, treating every access request as potentially hostile.',
      content: `# Zero-Trust Architecture Becomes Industry Standard

The traditional "trust but verify" approach to network security is being replaced by zero-trust principles that assume nothing is safe by default.

## What is Zero-Trust?

Zero-trust means verifying every access request, regardless of where it comes from. In the past, networks had perimeters—once inside, users and devices were trusted. Modern threats make this approach inadequate.

Even devices on the corporate network must authenticate and be authorized for each resource they access. This continuous verification reduces the impact of breaches.

## Implementation Challenges

Moving to zero-trust isn't easy. It requires rethinking network architecture, updating applications, and changing how users interact with systems. The user experience must remain smooth despite increased security checks.

Identity management becomes critical. Organizations need robust systems for verifying users and devices, often using multiple factors of authentication.

## Benefits

The benefits are significant. Breaches are contained more effectively because compromised credentials don't automatically grant broad access. The damage from insider threats is reduced.

Compliance becomes easier since zero-trust architectures provide detailed audit logs of all access attempts. This helps meet regulatory requirements.

## Industry Adoption

Major tech companies led the way, but adoption is spreading. Government agencies, financial institutions, and healthcare organizations are implementing zero-trust principles.

Cloud providers offer tools and services that make zero-trust implementation easier. Managed services help organizations transition without rebuilding everything from scratch.

## The Future

Zero-trust isn't a destination but a journey. As threats evolve, security models must adapt. The principles of zero-trust—verify explicitly, use least privilege, assume breach—will guide security for years to come.

Organizations that haven't started this transition should begin planning now. The move to zero-trust is not optional—it's necessary for modern security.`,
      category: 'Cybersecurity',
      tags: ['#Cybersecurity', '#ZeroTrust', '#Security', '#Architecture'],
      author: 'Lisa Anderson',
      date: 'December 8, 2024',
      imageUrl: '/placeholder-1280x720-8.jpg',
      readingTime: 6,
      popularity: 79
    }
  ],
  Startups: [
    {
      id: '9',
      title: 'Startup Raises $100M to Democratize AI Development',
      excerpt: 'Company building no-code AI tools receives massive funding round, aiming to make AI accessible to businesses of all sizes.',
      content: `# Startup Raises $100M to Democratize AI Development

A startup focused on making AI accessible to non-technical users has secured a massive funding round, signaling strong investor confidence in the no-code AI space.

## The Vision

The company's platform allows businesses to build and deploy AI models without writing code. Users can train models using simple interfaces, drag-and-drop workflows, and natural language descriptions of what they want to achieve.

This democratization could bring AI capabilities to small businesses and industries that haven't yet adopted the technology due to lack of technical expertise.

## The Technology

Behind the simple interface is sophisticated technology that automates model selection, hyperparameter tuning, and deployment. The platform handles the complexity while giving users control over the results.

Pre-built templates cover common use cases like customer service chatbots, demand forecasting, and image classification. These templates can be customized for specific needs.

## Market Opportunity

While big tech companies have vast AI resources, most businesses don't. The no-code approach could unlock AI adoption across retail, manufacturing, healthcare, and other sectors.

Early customers report significant productivity gains. A retail chain used the platform to predict inventory needs, reducing waste by 30% without hiring data scientists.

## Challenges Ahead

No-code tools have limitations. Complex, custom AI solutions still require technical expertise. The platform needs to balance simplicity with capability.

Competition is fierce. Major cloud providers offer similar tools, and other startups are pursuing the same vision. Standing out requires exceptional user experience and results.

## The Future

If successful, this could fundamentally change who builds AI systems. Instead of just data scientists at large companies, business analysts, domain experts, and entrepreneurs could create AI solutions for their specific needs.

The funding round will accelerate product development and market expansion. The company plans to add more templates, improve model capabilities, and expand integrations with popular business tools.

This investment reflects a broader trend: making advanced technology accessible to everyone, not just technical experts.`,
      category: 'Startups',
      tags: ['#Startups', '#AI', '#NoCode', '#Funding'],
      author: 'Morgan Taylor',
      date: 'December 7, 2024',
      imageUrl: '/placeholder-1280x720-9.jpg',
      readingTime: 7,
      popularity: 76
    }
  ]
};

// Generate placeholder image URLs using a local pattern
const generateImageUrl = (articleId: string): string => {
  return `/placeholder-${articleId}.jpg`;
};

export const getMockArticles = (category: string): Article[] => {
  const categoryKey = category || 'Latest';
  const articles = mockArticlesByCategory[categoryKey] || mockArticlesByCategory['Latest'];
  
  // Update image URLs to use local placeholders
  return articles.map(article => ({
    ...article,
    imageUrl: generateImageUrl(article.id)
  }));
};

