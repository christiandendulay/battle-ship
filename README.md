# Project Infrastructure Documentation

## Deployment Architecture

This project is deployed on **Amazon Web Services (AWS)** using the following infrastructure components:

### Compute Layer: AWS ECS

- **Service**: Amazon Elastic Container Service (ECS)
- **Deployment Model**: Containerized application running on ECS
- **Orchestration**: Managed container orchestration for scalable and reliable application deployment

### Asset Storage: Amazon S3

- **Service**: Amazon Simple Storage Service (S3)
- **Purpose**: Dedicated S3 bucket for storing project assets
- **Usage**: All static assets, media files, and related resources are hosted and served from the S3 bucket

## Architecture Overview

```
┌─────────────────┐
│   AWS ECS       │  ← Application Containers
│   (Compute)     │
└────────┬────────┘
         │
         │ Serves
         ▼
┌─────────────────┐
│   AWS S3        │  ← Static Assets & Media
│   (Storage)     │
└─────────────────┘
```

## Summary

- **Application Hosting**: AWS ECS
- **Asset Storage**: AWS S3 Bucket
