# Laptop Recommendation System

## Overview
A sophisticated web-based system that provides personalized laptop recommendations based on user profiles and requirements. The system combines survey data collection, intelligent matching algorithms, and toolkit recommendations to ensure optimal hardware configurations for different user roles. It includes a comprehensive laptop database and predefined toolkit packages for different professional profiles.

## Core Features

### 1. Smart Survey System
- **Adaptive Questionnaire**: Dynamically adjusts questions based on user role (Developer/Consultant)
- **Multi-Section Data Collection**:
  - Personal Information & Role Identification
  - OS Preferences & Experience
  - Development/Consultant-specific Requirements
  - Software Tools & Usage Patterns
  - Hardware Requirements
  - Special Considerations

### 2. Intelligent Matching Engine
- **Scoring Algorithm**: Evaluates user requirements against predefined toolkits
- **Weighted Analysis**:
  - Role-specific tool requirements
  - OS compatibility
  - Development intensity
  - Resource usage patterns
  - Specialized software needs

### 3. Laptop Database Management
- **Comprehensive Catalog**: Detailed database of available laptop models
- **Specifications Tracking**:
  - Hardware specifications (CPU, RAM, Storage, GPU)
  - Performance metrics and benchmarks
  - Battery life and portability features
  - Price points and availability
- **Dynamic Updates**: Regular updates to laptop inventory and specifications
- **Price Type Management**: Support for different pricing schemes (HT/TTC)

### 4. Toolkit Package System
- **Predefined Toolkits**: Curated software and hardware combinations for specific roles
- **Package Components**:
  - Base laptop configuration
  - Required accessories (docks, peripherals)
  - Software tool bundles
  - OS configurations
- **Status Tracking**: Monitor package proposals, approvals, and deliveries
- **Customization Options**: Flexible toolkit modifications based on specific needs

### 5. Administration Interface
- **Response Management**: View, edit, and delete survey submissions
- **Data Migration Tools**: Support for importing existing survey data
- **Secure Access**: Admin authentication system
- **Detailed Analytics**: Score breakdowns and matching explanations
- **Package Management**: Create and modify toolkit packages
- **Inventory Control**: Track laptop availability and assignments

### 6. Technical Implementation
- **Frontend**: Next.js with TypeScript
- **Backend**: API routes with database integration
- **Security**: Role-based access control
- **Data Persistence**: Prisma ORM with relational database
- **UI Components**: Shadcn/UI component library

## Key Benefits
- Evidence-based hardware recommendations
- Role-optimized configurations
- Streamlined IT procurement process
- Consistent evaluation criteria
- Maintainable and extensible architecture
- Standardized equipment packages
- Efficient resource allocation
- Cost optimization through role-based standardization

## Target Users
- IT Administrators
- Developers/Engineers
- Consultants/Analysts
- Department Managers
- Procurement Teams
- Hardware Asset Managers 