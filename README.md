# React Native Design Patterns Playground

A practical exploration of software design patterns implemented with **React Native + TypeScript**.

This repository is a hands-on learning playground where each pattern is explained, visualized, implemented, and demonstrated through a small React Native example.

> **Learn the pattern → Visualize the design → Explore the implementation → Run the example**

📚 **[Explore the Documentation](#documentation)**

---

## About

The goal of this project is to explore how software design patterns can be applied to real-world mobile application development.

Each pattern focuses on:

* 🧠 **Concept** — What problem does the pattern solve?
* 📐 **Design** — How are the objects/components structured?
* 💻 **Implementation** — How can the pattern be implemented with TypeScript?
* 📱 **React Native Demo** — How does the pattern look in a real mobile application?
* 🧪 **Testing** — How can the design be tested and maintained?

The examples are intentionally small and focused so the design of each pattern is easy to understand.

---

## 📚 Documentation

The full pattern walkthroughs, diagrams, and explanations will be available through the project's documentation site.

**🚧 Documentation site coming soon**

> The documentation will provide a structured way to explore the patterns by category, with diagrams, explanations, implementation details, and interactive examples.

---

## 🧩 Patterns

### Behavioral Patterns

| Pattern      | Example                    | Documentation                                           |
| ------------ | -------------------------- | ------------------------------------------------------- |
| **Strategy** | Dynamic Payment Processing | [Read the walkthrough](src/patterns/strategy/README.md) |
| Observer     | Coming soon                | —                                                       |
| Command      | Coming soon                | —                                                       |
| State        | Coming soon                | —                                                       |

### Creational Patterns

| Pattern   | Example     | Documentation |
| --------- | ----------- | ------------- |
| Factory   | Coming soon | —             |
| Builder   | Coming soon | —             |
| Singleton | Coming soon | —             |

### Structural Patterns

| Pattern   | Example     | Documentation |
| --------- | ----------- | ------------- |
| Adapter   | Coming soon | —             |
| Decorator | Coming soon | —             |
| Facade    | Coming soon | —             |
| Proxy     | Coming soon | —             |

> More patterns will be added progressively.

---

## 🚀 Quick Start

### Prerequisites

* Node.js (16+) and npm or Yarn
* Xcode for iOS development (macOS)
* Android Studio + Android SDK for Android
* CocoaPods (for iOS native dependencies)

### Install dependencies

```sh
npm install
```

Or:

```sh
yarn install
```

### Start Metro

```sh
npm start
```

### Run on Android

```sh
npm run android
```

### Run on iOS

```sh
bundle install
bundle exec pod install --project-directory=ios
npm run ios
```

---

## 🗂️ Project Structure

```text
src/
├── patterns/
│   ├── strategy/
│   │   ├── README.md
│   │   ├── diagrams/
│   │   └── ...
│   ├── observer/
│   │   └── ...
│   └── ...
│
├── demo/              # App demo screens
└── services/          # Example services used by demos
```

Each pattern is kept self-contained with its explanation, implementation, and supporting resources.

---

## 🛠️ Scripts

Common npm scripts (see `package.json` for exact commands):

```text
npm start        Start Metro bundler
npm run android  Build & run on Android
npm run ios      Build & run on iOS
npm test         Run tests
```

---

## 🤝 Contributing

Contributions are welcome.

If you would like to add a new pattern:

1. Create a dedicated pattern folder under `src/patterns`.
2. Include a README explaining the pattern.
3. Add diagrams where they help explain the design.
4. Add a small React Native demo.
5. Add tests where appropriate.
6. Keep the example focused on the pattern itself.

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.


