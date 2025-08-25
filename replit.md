# Overview

This project is a comprehensive Discord bot application featuring a modern web dashboard built with React and TypeScript. The bot provides 133+ commands across multiple categories including moderation, music, economy, games, and utility functions. The application uses a full-stack architecture with Express.js backend, React frontend, and supports multiple database options through Drizzle ORM with PostgreSQL as the primary database.

The project includes both a main bot implementation and a legacy Discord.js bot template, suggesting this is either a migration project or a comprehensive bot development toolkit. The bot features a "kawaii" (cute/adorable) personality theme throughout its interface and interactions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses a modern React setup with TypeScript and Vite for development. Key architectural decisions include:

- **UI Framework**: React with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom kawaii-themed color variables and animations
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Development**: Vite with Hot Module Replacement for fast development cycles

The frontend follows a component-based architecture with reusable kawaii-themed UI components and a dashboard layout displaying bot statistics, command categories, recent activity, and system status.

## Backend Architecture
The server uses Express.js with TypeScript in an ESM module setup. Core architectural patterns include:

- **API Layer**: RESTful API with route handlers for bot statistics, commands, activity logs, and system status
- **Storage Abstraction**: Interface-based storage layer allowing for different database implementations
- **Development Integration**: Vite middleware integration for seamless full-stack development
- **CORS Configuration**: Cross-origin resource sharing enabled for frontend-backend communication

## Data Layer
The application uses Drizzle ORM with PostgreSQL as the primary database solution:

- **ORM**: Drizzle Kit for schema management and migrations
- **Database**: PostgreSQL with Neon Database serverless driver support
- **Schema Design**: Comprehensive schema definitions for bot stats, command categories, activity logs, system status, users, and guild configurations
- **Migration Strategy**: Database migrations stored in dedicated migrations directory

## Discord Bot Implementation
The bot architecture includes:

- **Multiple Bot Variants**: Main kawaii-themed bot and legacy Discord.js template
- **Command System**: Slash commands and context menus with cooldown management
- **Event Handling**: Comprehensive event system for Discord interactions
- **Modular Design**: Plugin-based architecture for features like automod, music, economy, and giveaways
- **Session Management**: Express sessions with MongoDB storage for dashboard authentication

## Authentication & Sessions
- **Session Storage**: connect-mongo for MongoDB-backed session storage
- **OAuth Integration**: Discord OAuth2 for user authentication
- **Permission System**: Role-based access control for bot management features

# External Dependencies

## Core Framework Dependencies
- **Discord.js**: v14.x for Discord bot functionality and API interactions
- **React**: v18.x with TypeScript for frontend development
- **Express.js**: Web server framework for API and middleware
- **Vite**: Build tool and development server with React plugin

## Database & ORM
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect support
- **@neondatabase/serverless**: Neon Database driver for serverless PostgreSQL
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Headless UI components (@radix-ui/react-* packages)
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography

## State Management & Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with @hookform/resolvers for validation

## Development & Build Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TSX**: TypeScript execution engine for development

## Discord Bot Specific
- **connect-mongo**: MongoDB session storage adapter
- **discord-giveaways**: Giveaway management system
- **lavaclient**: Lavalink client for music functionality
- **mongoose**: MongoDB object modeling (for legacy bot features)

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class management
- **cors**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management
- **zod**: Runtime type validation and schema definition