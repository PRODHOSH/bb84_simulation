<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:286EFF,100:AA50FF&height=200&section=header&text=BB84%20Quantum%20Simulator&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Interactive%203D%20Quantum%20Key%20Distribution&descAlignY=55&descSize=20"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&duration=3000&pause=1000&color=286EFF&center=true&vCenter=true&width=700&lines=Quantum+Cryptography+in+3D;Secure+Communication+via+Physics;Real-time+Photon+Visualization;Unbreakable+Encryption+Demo" alt="Typing SVG" />

<br/>

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Click_Here-286EFF?style=for-the-badge)](https://prodhosh.github.io/bb84_simulation/)
[![GitHub Stars](https://img.shields.io/github/stars/PRODHOSH/bb84_simulation?style=for-the-badge&color=AA50FF)](https://github.com/PRODHOSH/bb84_simulation/stargazers)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

</div>

---

## � Overview

> **Experience quantum cryptography like never before** - Watch individual photons travel through space in real-time 3D as they establish an unbreakable secret key!

**BB84 Quantum Key Distribution Simulator** is a cutting-edge web application that brings quantum mechanics to life. Built with **React**, **Three.js**, and modern web technologies, it provides an immersive 3D visualization of the groundbreaking BB84 protocol invented by **Charles Bennett** and **Gilles Brassard** in 1984.

### 🎯 The Quantum Advantage

Traditional encryption can be broken with enough computing power. **Quantum Key Distribution** uses the laws of physics themselves to guarantee security - making it **future-proof against even quantum computers**!

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│  "Any observation of a quantum system disturbs its state"   │
│        - The principle that makes BB84 unbreakable          │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Interactive 3D Simulation
- **Real-time photon animation** in 3D space
- **Adjustable photon count** (8-32)
- **Color-coded basis matching**
  - 🟢 Green = Bases match (key kept)
  - 🔴 Red = Bases differ (discarded)
- **Smooth camera controls** and zoom
- **Particle effects** for quantum states

</td>
<td width="50%">

### 🔬 Quantum Physics Visualization
- **4 Polarization States** fully rendered:
  - Vertical (|) - Horizontal (—)
  - Diagonal (/) - Anti-diagonal (\)
- **Rectilinear (+) & Diagonal (×)** bases
- **Photon state collapse** on measurement
- **Quantum uncertainty** demonstrated

</td>
</tr>
<tr>
<td width="50%">

### 👁️ Eavesdropper Simulation
- **Toggle Eve mode** with one click
- **Real-time error injection**
- **QBER calculation** (Quantum Bit Error Rate)
- **Security threshold** visualization
- **Automatic detection** of tampering

</td>
<td width="50%">

### 📊 Advanced Analytics
- **Interactive dashboard** with charts
- **Key generation statistics**
- **Efficiency metrics**
- **Error rate analysis**
- **Basis matching breakdown**
- **Export simulation results**

</td>
</tr>
</table>

---

## 🎨 Stunning UI/UX

<div align="center">

### 💎 Modern Design Features

</div>

- 🌟 **Animated starfield** background with colorful particles
- 🎨 **Quantum gradient** color scheme (Blue → Purple)
- ✨ **Glow effects** on interactive elements
- 🎭 **Smooth transitions** and animations
- 📱 **Fully responsive** design for all devices
- 🌙 **Dark theme** optimized for long viewing
- 🎯 **Intuitive controls** with tooltips
- 💬 **Built-in AI chatbot** for instant help

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+ and npm/yarn/bun
```

### Installation

```bash
# Clone the repository
git clone https://github.com/PRODHOSH/bb84_simulation.git

# Navigate to project
cd bb84_simulation

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 How to Use

<div align="center">

### 🎬 Step-by-Step Guide

</div>

1. **⚙️ Set Parameters**
   - Adjust photon count using the slider (8-32)
   - Toggle Eve to simulate eavesdropping

2. **▶️ Run Simulation**
   - Click "Run Simulation" button
   - Watch photons travel in 3D space

3. **👀 Observe**
   - Green photons = Matching bases (kept)
   - Red photons = Different bases (discarded)
   - See polarization states in real-time

4. **📊 Analyze Results**
   - View secret key generated
   - Check error rates
   - Explore analytics dashboard

---

## 🔬 The Science

### Protocol Steps

```mermaid
graph TB
    A[🎲 Alice: Generate Random Bits] --> B[📡 Alice: Choose Random Bases]
    B --> C[🌟 Alice: Encode Photons]
    C --> D{👁️ Eve Intercepts?}
    D -->|Yes| E[⚠️ Eve: Measures & Disturbs]
    D -->|No| F[✅ Clean Transmission]
    E --> G[📬 Bob: Receives Photons]
    F --> G
    G --> H[🔍 Bob: Random Measurement]
    H --> I[📢 Public Basis Comparison]
    I --> J[🔑 Keep Matching Bases]
    J --> K[📊 Error Rate Check]
    K --> L{QBER > 25%?}
    L -->|Yes| M[❌ Abort - Eve Detected]
    L -->|No| N[✅ Secure Key Ready!]
    
    style A fill:#286EFF
    style N fill:#00FF88
    style M fill:#FF4444
    style D fill:#AA50FF
```

### Quantum States

| Basis | State | Symbol | Bit Value |
|-------|-------|--------|-----------|
| **Rectilinear (+)** | Vertical | \| | 0 |
| **Rectilinear (+)** | Horizontal | — | 1 |
| **Diagonal (×)** | Diagonal | / | 0 |
| **Diagonal (×)** | Anti-diagonal | \ | 1 |

### Security Guarantee

**No-Cloning Theorem** + **Heisenberg Uncertainty** = **Unbreakable Security** ✨

---

## 💻 Tech Stack

<div align="center">

### 🛠️ Built With Modern Tools

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/-Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/-R3F-000000?style=flat-square&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/-Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)

</div>

**Frontend Framework**: React 18 with TypeScript  
**3D Graphics**: Three.js + React Three Fiber  
**Build Tool**: Vite 5  
**Styling**: Tailwind CSS + Shadcn/ui components  
**State Management**: React Context API  
**Animations**: Framer Motion  
**Routing**: React Router v6  

---

## 📚 Educational Value

Perfect for:

- 🎓 **Students** learning quantum cryptography
- 👨‍🏫 **Educators** teaching quantum mechanics
- 🔬 **Researchers** demonstrating QKD concepts  
- 💼 **Professionals** exploring post-quantum security
- 🌟 **Enthusiasts** fascinated by quantum physics

### Learning Resources

- [📖 Original BB84 Paper](https://arxiv.org/abs/2003.06557)
- [🎓 Wikipedia: Quantum Key Distribution](https://en.wikipedia.org/wiki/Quantum_key_distribution)
- [⚛️ IBM Quantum Computing](https://quantum-computing.ibm.com/)
- [🔵 Google Quantum AI](https://quantumai.google/)

---

## 🎯 Project Structure

```
bb84_simulation/
├── src/
│   ├── components/
│   │   ├── simulation/
│   │   │   ├── PhotonScene.tsx       # 3D visualization
│   │   │   ├── PhotonParticle.tsx    # Individual photon
│   │   │   ├── KeyResults.tsx        # Results display
│   │   │   └── AnalyticsDashboard.tsx
│   │   └── ui/                       # Reusable UI components
│   ├── contexts/
│   │   └── SimulationContext.tsx     # State management
│   ├── hooks/
│   │   └── useBB84Simulation.ts      # Core BB84 logic
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Theory.tsx
│   │   ├── Simulation.tsx
│   │   └── NotFound.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   ├── team.html                     # Team page
│   └── images/
└── ...config files
```

---

## 👥 Meet the Team

<div align="center">

**VIT University Engineering Physics Project**

🔧 **Joshwa** - Hardware Engineer  
💻 **Prodhosh** - Full-Stack Developer  
📄 **Raghav** - Documentation Lead  
📊 **Sachin** - Presentation Specialist  
📊 **Sudhir** - Presentation Specialist  
📄 **Vijay Nishal** - Documentation Lead

[**→ View Full Team**](https://prodhosh.github.io/bb84_simulation/team.html)

</div>

---

## 🌟 Highlights

<div align="center">

### 🏆 What Makes This Special

✅ **Industry-Grade Code** - Production-ready React/TypeScript  
✅ **Real Physics** - Accurate quantum mechanics simulation  
✅ **3D Graphics** - Smooth 60fps rendering with Three.js  
✅ **Interactive Learning** - Hands-on quantum education  
✅ **Modern Stack** - Latest web technologies  
✅ **Open Source** - Free for educational use  
✅ **AI Chatbot** - Instant help and explanations  
✅ **Responsive Design** - Works on all devices  

</div>

---

## 🔮 Roadmap

- [ ] **VR Support** for immersive quantum experience
- [ ] **E91 Protocol** (entanglement-based QKD)
- [ ] **Bloch Sphere** visualization
- [ ] **Noise Models** for realistic channels
- [ ] **Performance Metrics** comparison
- [ ] **Multi-language** support
- [ ] **Tutorial Mode** with guided tours
- [ ] **Advanced Analytics** with ML predictions

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🔗 Links

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-286EFF?style=for-the-badge)](https://prodhosh.github.io/bb84_simulation/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/PRODHOSH/bb84_simulation)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-AA50FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://prodhosh.github.io/prodhosh-portfolio/)

</div>

---

## 💬 Connect

<div align="center">

**Prodhosh VS**

[![GitHub](https://img.shields.io/badge/GitHub-PRODHOSH-181717?style=for-the-badge&logo=github)](https://github.com/PRODHOSH)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-prodhoshvs-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/prodhoshvs)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF6B6B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://prodhosh.github.io/prodhosh-portfolio/)
[![Instagram](https://img.shields.io/badge/Instagram-itzprodhosh-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/itzprodhosh)

</div>

---

<div align="center">

### ⭐ If this project helped you, please give it a star!

**Made with ❤️ and Quantum Physics**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:286EFF,100:AA50FF&height=120&section=footer"/>

</div>

