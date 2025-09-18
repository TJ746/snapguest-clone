# SnapGuest Clone

A modern event photo-sharing platform built with Next.js and NestJS.

## 🚀 Features

### Guest App
- **4-Tab Navigation**: Info, Calendar, Gallery, Chat
- **Event Info**: Title, description, dates, social links, share button
- **Timeline/Calendar**: Multi-day events with schedule items, location links
- **Photo Gallery**: Upload photos/videos, like, comment, download, filter
- **Live Chat**: Real-time messaging without login required
- **PWA Support**: Dynamic manifest, offline-ready
- **Multi-language**: German (de_CH) and English (en_GB)

### Admin Console
- **Event Management**: Create, edit, copy, delete events
- **3-Step Event Wizard**: Basic info, dates/features, visual customization
- **Timeline Editor**: Drag-and-drop schedule management
- **Media Moderation**: View, approve, delete uploaded content
- **Export Functions**: Download all media, generate PDF invitations, QR codes
- **Analytics**: View engagement stats per event

### Technical Features
- **No-Login Guest Access**: Client-ID based ownership for uploads/chat
- **Modern UI**: Instagram/TikTok-inspired design with Tailwind CSS
- **Real-time Updates**: Live chat, media uploads
- **Secure**: Event-specific URLs, temporary access
- **Scalable**: PostgreSQL + Prisma ORM, modular architecture

## 🛠 Tech Stack

### Frontend
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** (Modern styling)
- **React Hooks** (State management)

### Backend
- **NestJS** (Node.js framework)
- **Prisma ORM** (Database management)
- **PostgreSQL** (Neon hosted)

### Infrastructure
- **Neon** (PostgreSQL hosting)
- **Supabase Storage** (Media uploads - ready for integration)

## 📁 Project Structure

```
snapguest-clone/
├── apps/
│   ├── frontend/          # Next.js app
│   │   ├── src/
│   │   │   ├── app/       # App Router pages
│   │   │   │   ├── [lang]/by-id/[eventId]/  # Guest event page
│   │   │   │   ├── admin/                   # Admin dashboard
│   │   │   │   └── api/                     # API routes (manifest)
│   │   │   └── components/
│   │   │       ├── event/                   # Guest app components
│   │   │       ├── admin/                   # Admin components
│   │   │       └── ui/                      # Shared UI components
│   └── backend/           # NestJS API
│       ├── src/
│       │   ├── events/    # Event management
│       │   ├── admin/     # Admin operations
│       │   ├── media/     # Photo/video handling
│       │   ├── chat/      # Live messaging
│       │   ├── prisma/    # Database service
│       │   └── seed/      # Test data
│       └── prisma/        # Database schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS)
- PostgreSQL database (Neon account)

### Installation

1. **Clone and install dependencies:**
```bash
cd C:\Users\TinonJacob\CascadeProjects\snapguest-clone
cd apps/backend && npm install
cd ../frontend && npm install
```

2. **Set up database:**
```bash
cd apps/backend
cp .env.example .env
# Edit .env with your Neon database URL
npm run prisma:migrate
npm run prisma:generate
```

3. **Seed test data:**
```bash
# Start backend first
npm run start:dev

# In another terminal, seed data
curl -X POST http://localhost:3001/seed/test-data
```

4. **Start development servers:**
```bash
# Backend (Terminal 1)
cd apps/backend
npm run start:dev

# Frontend (Terminal 2)  
cd apps/frontend
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Test Event**: http://localhost:3000/de_CH/by-id/testevent
- **Admin Dashboard**: http://localhost:3000/admin
- **API Health**: http://localhost:3001/health

## 📱 Usage

### For Guests
1. Scan QR code or click event link
2. Browse event info, timeline, and photos
3. Upload photos/videos with your name
4. Chat with other guests
5. Like, comment, and download media

### For Admins
1. Go to `/admin` and create events
2. Configure timeline with schedule items
3. Moderate uploaded content
4. Export media and generate invitations
5. Share event link/QR with guests

## 🔧 API Endpoints

### Guest APIs
- `GET /events/:id` - Event details
- `GET /events/:id/schedule` - Timeline items
- `GET /events/:id/media` - Photo gallery
- `GET /chat/:eventId/messages` - Chat messages
- `POST /media/upload/:eventId` - Upload media
- `POST /chat/:eventId/messages` - Send message

### Admin APIs
- `GET /admin/events` - List admin's events
- `POST /admin/events` - Create event
- `POST /admin/events/:id/schedule` - Add timeline item
- `DELETE /admin/media/:id` - Delete media
- `POST /admin/events/:id/export/media` - Export media
- `POST /admin/events/:id/export/qr` - Generate QR code

## 🎨 Design Philosophy

- **Instagram-inspired Gallery**: Familiar grid layout, swipe viewer
- **TikTok-like Navigation**: Bottom tab bar, smooth transitions  
- **WhatsApp-style Chat**: Bubble messages, real-time updates
- **Modern Admin UI**: Clean dashboard, step-by-step wizards
- **Mobile-first**: Responsive design, touch-friendly interactions

## 🔐 Security & Privacy

- **Event Isolation**: Each event has unique URL/ID
- **Client-based Auth**: No accounts needed, localStorage ownership
- **Temporary Access**: Events can expire automatically
- **Content Moderation**: Admin approval workflow
- **Data Protection**: GDPR-compliant data handling

## 🚀 Deployment

Ready for deployment to:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, DigitalOcean
- **Database**: Neon (already configured)
- **Storage**: Supabase Storage (integration ready)

## 📝 License

Private project - All rights reserved.

---

**Built with ❤️ for modern event experiences**
