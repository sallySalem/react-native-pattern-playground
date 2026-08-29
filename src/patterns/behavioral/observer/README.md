# Observer Pattern - Authentication Event Notifications

## Overview

The **Observer Pattern** is a behavioral design pattern that defines a one-to-many dependency between objects.

When the state of a subject changes, all registered observers are automatically notified and can react independently.

In this example, we simulate an authentication flow where multiple independent parts of the application need to react
when the authentication state changes:

* **Profile Observer** — updates the user's profile-related state
* **Analytics Observer** — tracks authentication events
* **Payment Observer** — enables or disables payment capabilities

The observers are composed with the subject at runtime.

The `AuthSubject` does not know about concrete observer implementations. It only knows the `Observer` interface.

This demonstrates:

* Runtime composition of multiple observers
* Program to an interface, not an implementation
* Favor composition over inheritance
* Identify what varies and separate it from what stays the same
* Loose coupling between the subject and observers
* Independent observer responsibilities
* Clean separation between the design pattern and React Native integration

---

## The Problem Without Observer Pattern

Imagine an authentication service that needs to perform several actions whenever a user logs in or logs out.

A naive implementation might put all of this logic directly inside the authentication flow:

```ts
class AuthService {
    login(username: string) {
        // Authentication logic
        this.updateProfile(username);
        this.trackAnalytics(username);
        this.enablePayment(username);
        this.sendNotification(username);
    }

    logout() {
        // Authentication logic
        this.clearProfile();
        this.trackLogout();
        this.disablePayment();
        this.sendLogoutNotification();
    }

    // ...
}
```

At first this looks simple.

But as the application grows, more responsibilities are added:

```text
AuthService
├── Authentication
├── Profile
├── Analytics
├── Payment
├── Notifications
├── Error Reporting
├── Recommendations
└── ...
```

The authentication service gradually becomes responsible for knowing every part of the application that depends on
authentication.

### Problems With This Approach

#### 1. High Coupling

The authentication logic knows about every consumer:

```text
AuthService
   │
   ├── Profile
   ├── Analytics
   ├── Payment
   ├── Notifications
   └── Error Reporting
```

Adding or removing a consumer requires modifying the subject.

#### 2. Violates the Open/Closed Principle

The authentication flow must repeatedly be modified whenever a new reaction is introduced.

The subject is not stable.

#### 3. Too Many Responsibilities

The authentication service becomes responsible for:

* Authentication
* Profile updates
* Analytics
* Payment state
* Notifications
* Error reporting

This makes the class harder to understand and maintain.

#### 4. Difficult Testing

Testing authentication requires knowing about all the side effects triggered by authentication.

Individual behaviors become harder to isolate.

#### 5. Difficult Runtime Configuration

The authentication service itself determines which consumers exist.

It cannot easily support different observer combinations for different application configurations.

---

## Observer Pattern Solution

Instead of hard-coding every reaction inside the subject, we introduce an `Observer` contract.

```ts
interface Observer<T> {
    update(data: T): void;
}
```

The subject maintains a collection of observers:

```text
                 AuthSubject
                     │
                 observers
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Profile        Analytics      Payment
   Observer        Observer       Observer
```

When authentication changes:

```ts
subject.notify();
```

The subject sends the new state to every registered observer:

```ts
observer.update(this.state);
```

The subject does not need to know whether the observer is:

* Profile
* Analytics
* Payment
* Error Reporting
* Notifications
* or any future observer

It only depends on the `Observer` interface.

## Core Concept

The Observer Pattern consists of two main roles.

### Subject

The object whose state changes.

```text
AuthSubject
```

The subject is responsible for:

* Maintaining observers
* Registering observers
* Removing observers
* Notifying observers
* Managing authentication state

### Observer

An object that wants to react when the subject changes.

All observers implement:

```ts
interface Observer<T> {
    update(data: T): void;
}
```

Our concrete observers are:

```text
ProfileObserver
AnalyticsObserver
PaymentObserver
```

Each observer has its own independent reaction.

### Runtime Composition

One of the main goals of this implementation is to demonstrate:

> Compose any number of observers with their subject at runtime.

The subject starts independently:

```ts
const subject = new AuthSubject();
```

Observers are then composed with it:

```ts
const profileObserver = new ProfileObserver();
const analyticsObserver = new AnalyticsObserver();
const paymentObserver = new PaymentObserver();

subject.subscribe(profileObserver);
subject.subscribe(analyticsObserver);
subject.subscribe(paymentObserver);
```

The composition is dynamic.

We can add another observer without changing `AuthSubject`:

```ts
const errorReporter = new ErrorReporter();

subject.subscribe(errorReporter);
```

We can also remove an observer:

```ts
subject.unsubscribe(paymentObserver);
```

The subject itself does not need to change.

### Why Runtime Composition Matters

The subject should not decide:

```ts
if (profileEnabled) {
    // profile logic
}

if (analyticsEnabled) {
    // analytics logic
}

if (paymentEnabled) {
    // payment logic
}
```

Instead, the application composes the required observers:

```ts
subject.subscribe(profileObserver);
subject.subscribe(analyticsObserver);
subject.subscribe(paymentObserver);
```

This keeps the subject independent from concrete behaviors.

### Composition Over Inheritance

> Favor composition over inheritance.

This implementation intentionally uses:

```ts
implements
Observer<AuthState>
```

instead of:

```ts
extends
SomeObserverBaseClass
```

Each observer is an independent object that implements the observer contract.

```ts
class ProfileObserver implements Observer<AuthState> {
    // ...
}

class AnalyticsObserver implements Observer<AuthState> {
    // ...
}

class PaymentObserver implements Observer<AuthState> {
    // ...
}
```

There is no observer inheritance hierarchy.

#### Is-A Relationship ❌

We intentionally avoid creating a hierarchy such as:

```text
BaseObserver
     ↑
     ├── ProfileObserver
     ├── AnalyticsObserver
     └── PaymentObserver
```

This creates unnecessary coupling between observers.

#### Has-A / Composition Relationship ✅

Instead, the system is composed from independent objects:

```text
AuthSubject
    │
    ├── HAS-A collection of Observer
    │
    ├── ProfileObserver
    ├── AnalyticsObserver
    └── PaymentObserver
```

And each observer can compose supporting behavior when needed.

For example:

```text
ProfileObserver
      │
      └── HAS-A → ObservableState
```

This is composition rather than inheritance.

### Program to an Interface, Not an Implementation

The `AuthSubject` does not depend on:

```ts
ProfileObserver
AnalyticsObserver
PaymentObserver
```

Instead, it depends on:

```ts
Observer<AuthState>
```

The subject stores:

```ts
private readonly
observers: Observer < AuthState > [] = [];
```

And not:

```ts
private
profiles: ProfileObserver[];
private
analytics: AnalyticsObserver[];
private
payments: PaymentObserver[];
```

The notification mechanism is also abstraction-based:

```ts
this.observers.forEach(observer => {
    observer.update(this.state);
});
```

The subject only knows:

> "This object can receive an update."

It does not care what the object does with it.

### Identify What Varies

Another important design principle demonstrated by this implementation is:

> Identify the aspects of your application that vary and separate them from what stays the same.

**What stays the same?**

The notification mechanism:

```text
Subscribe
   ↓
Store observers
   ↓
State changes
   ↓
Notify observers
   ↓
Call update()
```

This behavior belongs to the subject.

**What varies?**

The reaction to the authentication change.

```text
ProfileObserver
    → Update profile

AnalyticsObserver
    → Track event

PaymentObserver
    → Enable/disable payment

Future ErrorReporter
    → Report authentication error
```

Each behavior is isolated in its own observer.

---

## Architecture

```text
                         AuthSubject
                              │
                         notify()
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
        ProfileObserver  AnalyticsObserver  PaymentObserver
              │               │               │
              ↓               ↓               ↓
        Profile update    Track event    Payment state
```

The subject depends only on the abstraction:

```text
AuthSubject
     │
     ↓
Observer<AuthState>
     ↑
     │
 ┌───┼───────────────┐
 │   │               │
Profile Analytics   Payment
```

---

## Architecture Boundaries

This implementation intentionally separates the core design pattern from the React Native integration.

```text
observer/
│
├── observer/
│   ├── Observer.ts
│   ├── ProfileObserver.ts
│   ├── AnalyticsObserver.ts
│   └── PaymentObserver.ts
│
├── subject/
│   ├── Subject.ts
│   └── AuthSubject.ts
│
├── model/
│   └── AuthState.ts
│
├── support/
│   ├── ListenerRegistry.ts
│   └── ObservableState.ts
│
├── react/
│   └── useObserver.ts
│
├── demo/
│   └── ObserverScreen.tsx
│
└── __tests__/
```

### React Native Integration

The Observer Pattern itself does not depend on React.

React is only responsible for displaying the current observer state.

The integration uses React's `useSyncExternalStore` instead of forcing a component to re-render manually.

There is intentionally:

```text
❌ no forceUpdate
❌ no manual render triggering
❌ no React dependency inside AuthSubject
```

The React integration listens to observer changes through the supporting observable state.

### React Integration Flow

```text
User taps Login
       ↓
AuthSubject.login()
       ↓
AuthSubject.notify()
       ↓
┌──────────────┬──────────────┬──────────────┐
↓              ↓              ↓
Profile        Analytics      Payment
update()       update()       update()
↓              ↓              ↓
State changes
       ↓
React subscription notified
       ↓
useSyncExternalStore
       ↓
React re-renders
       ↓
Updated UI
```

The important distinction is:

> The Observer Pattern triggers the business reactions.

> The React integration only reflects those changes in the UI.

### Adding a New Observer

Suppose we need an `ErrorReporter`.

We create a new class:

```ts
class ErrorReporter implements Observer<AuthState> {
    update(data: AuthState): void {
        // Error reporting behavior
    }
}
```

Then compose it:

```ts
const errorReporter = new ErrorReporter();

subject.subscribe(errorReporter);
```

The `AuthSubject` does not change.

No new:

```ts
if
else
switch
```

is added to the subject.

This is one of the main benefits of the pattern.

### Removing an Observer

Observers can also be removed dynamically:

```ts
subject.unsubscribe(paymentObserver);
```

After that:

```text
AuthSubject
    │
    ├── ProfileObserver
    └── AnalyticsObserver
```

The payment observer no longer receives notifications.

---

## Design Principles Demonstrated

#### 1. Favor Composition Over Inheritance

```text
AuthSubject
    │
    └── HAS-A → collection of Observer

ProfileObserver
    │
    └── HAS-A → supporting observable state
```

No observer inheritance hierarchy is required.

#### 2. Program to an Interface, Not an Implementation

The Subject depends on:

```ts
Observer<AuthState>
```

not:

```ts
ProfileObserver
AnalyticsObserver
PaymentObserver
```

This keeps the Subject loosely coupled.

#### 3. Identify What Varies

The notification mechanism stays stable.

The observer reactions vary.

```text
Stable:
Subject → notify → Observer.update()

Variable:
Profile behavior
Analytics behavior
Payment behavior
Future observer behaviors
```

The varying behavior is separated into independent classes.

---

## SOLID Principles

#### Single Responsibility Principle

Each observer has one responsibility.

```text
ProfileObserver
→ Profile reaction

AnalyticsObserver
→ Analytics reaction

PaymentObserver
→ Payment reaction
```

`AuthSubject` coordinates notification rather than implementing all reactions.

#### Open/Closed Principle

The system is open for adding new observers without modifying the Subject.

```ts
class NotificationObserver implements Observer<AuthState> {
    update(data: AuthState): void {
        // notification behavior
    }
}
```

Then:

```ts
subject.subscribe(notificationObserver);
```

#### Dependency Inversion Principle

The Subject depends on the abstraction:

```ts
Observer<AuthState>
```

rather than concrete observer classes.

---

## When to Use Observer Pattern

Use Observer when:

* Multiple objects need to react to the same state change
* The number of consumers can grow over time
* Consumers should be independently added or removed
* You want to reduce coupling between a state owner and its consumers
* Different consumers perform different reactions
* Runtime subscription/unsubscription is useful
* The subject should not know concrete consumers

---

## When Not to Use Observer Pattern

Avoid it when:

* There is only one consumer
* The relationship is simple and unlikely to grow
* Notification adds unnecessary complexity
* A direct method call is clearer
* The event flow becomes difficult to trace
* The observers introduce hidden side effects that make the system harder to understand

The pattern should solve a real dependency problem, not be added only because it is a design pattern.

---

## Final Concept

The essence of this implementation is:

```text
                    SUBJECT
                 AuthSubject
                      │
                  state changes
                      │
                    notify()
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       OBSERVER    OBSERVER    OBSERVER
       Profile     Analytics    Payment
          │           │           │
          ↓           ↓           ↓
       React to    React to     React to
       profile     event        payment
       change      change       change
```

The Subject does not need to know what each observer does.

It only knows:

```ts
observer.update(data);
```

That is the core of the Observer Pattern.
