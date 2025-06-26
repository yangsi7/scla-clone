# SCLA Platform 3.0 Documentation - CLEAN STRUCTURE

## 🎯 MAIN DOCUMENTS (Start Here!)

### For CEO/Executive Review
1. **[📄 MAIN VISION DOCUMENT](./scla-platform-3.0-comprehensive-vision.md)** - THE primary document (20 pages)
2. **[📋 Executive Brief](./SCLA-Platform-3.0-Executive-Brief.md)** - Quick overview

### For Implementation Team
3. **[🛠️ Implementation Planning](./revamped/implementation-planning/)** - Complete technical roadmap
   - [Implementation Plan](./revamped/implementation-planning/scla-platform-3.0-implementation-plan.md)
   - [User Journeys](./revamped/implementation-planning/user-journeys.md)
   - [Component Flows](./revamped/implementation-planning/component-flows.md)
   - [Mock Data Strategy](./revamped/implementation-planning/mock-data-strategy.md)

### Current System Documentation
4. **[📱 Current SCLA App](./current/scla/)** - Existing mobile app docs
5. **[💻 Current HHD](./current/hhd/)** - Existing dashboard docs
6. **[🏥 Current MVCP](./current/mvcp/)** - Existing clinical portal docs

## 📁 Folder Structure Explained

```
docs/
├── CLEAN-DOCS-README.md              👈 YOU ARE HERE
├── scla-platform-3.0-comprehensive-vision.md  ⭐ MAIN VISION DOC
├── SCLA-Platform-3.0-Executive-Brief.md       📄 Executive summary
│
├── current/                          📚 Existing system docs
│   ├── scla/                        📱 Mobile app
│   ├── hhd/                         💻 Dashboard  
│   └── mvcp/                        🏥 Clinical portal
│
├── revamped/                         ✨ New vision docs
│   └── implementation-planning/      🛠️ Technical implementation
│       ├── README.md                📋 Planning index
│       ├── implementation-plan.md   📅 10-week roadmap
│       ├── user-journeys.md         🚶 User flows
│       ├── component-flows.md       🔄 System architecture
│       └── mock-data-strategy.md    📊 Test data plan
│
├── mockups/                          🎨 UI designs
│   ├── scla-detailed-mockups.md    📱 Mobile mockups
│   └── hhd-enhanced-mockups.md     💻 Dashboard mockups
│
├── archive/                          🗄️ Old/outdated docs
│   └── [many nested folders]        ⚠️ IGNORE THESE
│
└── competitor_analysis.txt           🔍 Market research
```

## ❌ What to IGNORE

Everything in the `archive/` folder is outdated or superseded. It contains:
- Initial design attempts that were rejected
- Multiple drafts of the same documents
- Deeply nested folder structures from previous iterations

## ✅ Quick Navigation

### Need to understand the vision?
→ Read **[scla-platform-3.0-comprehensive-vision.md](./scla-platform-3.0-comprehensive-vision.md)**

### Need to implement?
→ Go to **[revamped/implementation-planning/](./revamped/implementation-planning/)**

### Need to see mockups?
→ Check **[mockups/](./mockups/)**

### Need current system info?
→ Browse **[current/](./current/)**

## 🚀 Implementation Order

1. **Vision Understanding**: Read the main vision document
2. **Technical Planning**: Review implementation-planning folder
3. **Current State**: Understand existing system from current/ folder
4. **Build**: Follow the 10-week implementation plan

## 📌 Key Concepts

- **Two-Layer Architecture**: Basic monitoring + Health modules
- **Three Components**: SCLA (mobile) + HHD (dashboard) + MVCP (clinical)
- **Four Modules**: Heart Health, AFib Management, BP Control, Cardiac Fitness
- **Mobile-First**: HHD is mobile web, not desktop-first

## 🗑️ Cleanup Recommendation

The `archive/` folder contains 50+ files that should probably be moved to a separate repository or deleted to avoid confusion. It includes:
- `initial-design-attempts/` - First rejected attempt
- `old-specs/scla-platform-3.0-drafts/` - Multiple nested drafts with 40+ files
- Various phases and iterations that are no longer relevant

Consider running:
```bash
# Move archive to backup location
mv archive/ ../scla-docs-archive-backup/

# Or if you're sure, delete it
# rm -rf archive/
```