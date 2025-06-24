# Database Migration Plan: JSON Files to PostgreSQL

## Current System Analysis

The current laptop recommendation system stores data in JSON files:
- People data
- Package data
- Laptop data
- Accessory data
- Toolkit data
- Survey responses

This approach has several limitations:
1. No data validation or referential integrity
2. Performance issues with larger datasets
3. No concurrent access support
4. Inefficient querying capabilities
5. No transaction support
6. Relationship management relies entirely on application code

## Migration Goals

1. Migrate to PostgreSQL database (currently used through Prisma)
2. Establish proper relationships between entities
3. Implement proper foreign key constraints
4. Maintain backward compatibility during transition
5. Improve query performance
6. Enable proper relationship querying

## Database Schema Design

### People Table
```sql
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  department VARCHAR(255),
  position VARCHAR(255),
  pc_reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Laptops Table
```sql
CREATE TABLE laptops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  price_type VARCHAR(3) NOT NULL,
  processor VARCHAR(255) NOT NULL,
  ram VARCHAR(50) NOT NULL,
  storage VARCHAR(50) NOT NULL,
  battery_life DECIMAL(4, 1) NOT NULL,
  performance_score DECIMAL(3, 1) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Laptop Supported Profiles
```sql
CREATE TABLE laptop_profiles (
  laptop_id UUID NOT NULL REFERENCES laptops(id) ON DELETE CASCADE,
  profile VARCHAR(50) NOT NULL,
  PRIMARY KEY (laptop_id, profile)
);
```

### Laptop Supported Operating Systems
```sql
CREATE TABLE laptop_os (
  laptop_id UUID NOT NULL REFERENCES laptops(id) ON DELETE CASCADE,
  os VARCHAR(50) NOT NULL,
  PRIMARY KEY (laptop_id, os)
);
```

### Accessories Table
```sql
CREATE TABLE accessories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  price_type VARCHAR(3) NOT NULL,
  image VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Packages Table
```sql
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  laptop_id UUID NOT NULL REFERENCES laptops(id),
  status VARCHAR(50) NOT NULL,
  price_type VARCHAR(3) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Package-Accessories Junction Table
```sql
CREATE TABLE package_accessories (
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  accessory_id UUID NOT NULL REFERENCES accessories(id) ON DELETE CASCADE,
  PRIMARY KEY (package_id, accessory_id)
);
```

### Package Assignments Table
```sql
CREATE TABLE package_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  pc_reference VARCHAR(255),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (package_id, person_id) -- Optional: can be removed if a package can be assigned to multiple people
);
```

### Tools Table
```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  download_url VARCHAR(255),
  installation_notes TEXT,
  is_required BOOLEAN NOT NULL DEFAULT false,
  icon VARCHAR(255),
  popularity INTEGER,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Tool Alternatives
```sql
CREATE TABLE tool_alternatives (
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  alternative VARCHAR(255) NOT NULL,
  PRIMARY KEY (tool_id, alternative)
);
```

### Toolkits Table
```sql
CREATE TABLE toolkits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_name VARCHAR(255) NOT NULL,
  description TEXT,
  operating_system VARCHAR(50) NOT NULL,
  icon VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Toolkit-Tools Junction Table
```sql
CREATE TABLE toolkit_tools (
  toolkit_id UUID NOT NULL REFERENCES toolkits(id) ON DELETE CASCADE,
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  PRIMARY KEY (toolkit_id, tool_id)
);
```

### Survey Responses Table
```sql
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  primary_role VARCHAR(50),
  development_percentage INTEGER,
  primary_os VARCHAR(50),
  preferred_os VARCHAR(50),
  os_preference_reason TEXT,
  
  -- Various survey fields as needed
  -- Storing arrays for multi-select fields
  programming_languages TEXT[],
  other_languages TEXT,
  development_type TEXT[],
  other_development_type TEXT,
  resource_intensive_environments BOOLEAN,
  multiple_environments BOOLEAN,
  terminal_importance INTEGER,
  client_presentation_frequency VARCHAR(50),
  large_data_models BOOLEAN,
  specialized_software BOOLEAN,
  specialized_software_list TEXT,
  battery_life_importance INTEGER,
  remote_work_frequency VARCHAR(50),
  selected_tools TEXT[],
  other_tools TEXT,
  simultaneous_applications TEXT,
  
  -- Matched toolkit results
  matched_toolkit_id UUID REFERENCES toolkits(id),
  match_score INTEGER,
  
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Migration Process

### Phase 1: Setup and Preparation
1. Update Prisma schema to reflect the new database design
2. Create migration scripts using Prisma migrations
3. Set up database connection and configuration
4. Implement data validation and transformation functions

### Phase 2: Data Migration
1. Create data migration scripts to:
   - Extract data from JSON files
   - Transform data into the new schema format
   - Load data into PostgreSQL tables
2. Validate data consistency after migration
3. Generate proper relationships and foreign keys

### Phase 3: Code Updates
1. Update API endpoints to use the new database schema
2. Refactor data access code to use Prisma instead of direct file operations
3. Update package assignment logic to use the new relationship model
4. Implement proper transaction support for multi-table operations

### Phase 4: Testing and Verification
1. Develop comprehensive tests to validate data integrity
2. Test API functionality with the new database
3. Verify relationships and constraints are working properly
4. Performance testing for queries and operations

### Phase 5: Deployment and Monitoring
1. Deploy the new database schema to production
2. Monitor database performance and queries
3. Implement backup and recovery procedures
4. Retire the JSON file storage system

## Backward Compatibility Considerations

During the transition period:
1. Maintain field mapping between old and new schemas
2. Keep compatibility for fields like `assignedTo` while transitioning to proper relationships
3. Implement data synchronization if both systems need to run in parallel temporarily

## Timeline

1. **Week 1-2**: Schema design and Prisma setup
2. **Week 3**: Data migration scripts development
3. **Week 4**: Code refactoring and API updates
4. **Week 5**: Testing and validation
5. **Week 6**: Production deployment and monitoring

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Data loss during migration | Create backups of all JSON files before migration |
| Schema incompatibilities | Thoroughly test data transformations |
| Performance issues | Implement proper indexes and query optimization |
| Downtime during migration | Schedule migration during low-usage periods |
| Application errors after migration | Comprehensive testing before deployment |

## Benefits of Migration

1. **Data Integrity**: Enforced constraints and relationships
2. **Performance**: Better query optimization and indexing
3. **Scalability**: Proper database scaling options
4. **Feature Enhancement**: Ability to implement more complex relationships
5. **Maintenance**: Easier data management and backup procedures
6. **Development**: Simpler query construction and data access 