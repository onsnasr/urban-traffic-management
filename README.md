# Urban Traffic Management Platform

A distributed urban traffic management platform built with NestJS, GraphQL, and PostgreSQL.

## Tech Stack
- Backend: NestJS
- API: GraphQL (Apollo Server)
- Database: PostgreSQL + TypeORM
- Authentication: JWT
- Validation: class-validator

## Services
- Auth Service - Register, login, JWT, roles (ADMIN/OPERATOR)
- Vehicles Service - CRUD, GPS tracking, movement history
- Traffic Service - Zones, density, congestion detection
- Incidents Service - Declare, consult, update status
- Notifications Service - Send, consult, mark as read

## Setup
1. Clone the repo
2. Run npm install
3. Create .env file with DB and JWT config
4. Create database urban_traffic in PostgreSQL
5. Run npm run start
6. Open http://localhost:3000/graphql
