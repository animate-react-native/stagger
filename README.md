<div>
<h1>React Native Stagger</h1>
  
  
<img alt="AnimateReactNative.com - Premium and Custom React Native animations." src="./animatereactnative-stagger-preview.gif" align="right"/>

  <br />

[![NPM Version](https://img.shields.io/npm/v/@animatereactnative/stagger.svg?style=flat&color=black)](https://www.npmjs.org/package/@animatereactnative/stagger) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/) [![npm](https://img.shields.io/npm/l/@animatereactnative/stagger?style=flat-square)](https://www.npmjs.com/package/@animatereactnative/stagger) [![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/@animatereactnative/stagger) <a href="https://twitter.com/mironcatalin"><img src="https://img.shields.io/twitter/follow/mironcatalin?label=Follow @mironcatalin&color=black" alt="Follow Miron Catalin"></a>


React Native Stagger component, a cross-platform stagger orchestrator component, powered by Reanimated:

</div>

- 🔋 Powered by **Reanimated 3** Layout Animations
- 📱 Works with **Expo**
- ✅ Cross-platform (iOS, Android, Web - requires `reanimated@>=3.4.0`)
- ⚡️ 60-120fps
- 🪝 Works with any React Native element/component
- ⌨️ Written in TypeScript

## Installation

```sh
npm install @animatereactnative/stagger
```

> Also, you need to install [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), and follow their installation instructions.

## Usage

```js
import { Stagger } from '@animatereactnative/stagger';

// ...

export function Example() {
  return (
    <Stagger spacing={20} speed={1}>
      <Paragraph>1. Custom duration</Paragraph>
      <Paragraph>2. Custom stagger</Paragraph>
      <Paragraph>3. Custom animation</Paragraph>
      <Paragraph>4. Custom enter/exit direction</Paragraph>
      <Heading>AnimateReactNative.com</Heading>
      <Heading>Powered by Reanimated 3</Heading>
      <Heading>Works with Expo ❤️</Heading>
    </Stagger>
  );
}
```

## Props

| name                   | description                                                                                                  | required | type                            | default       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------- | ------------- |
| `children`             | Any component that you'd like to apply infinite scrolling / marquee effect                                   | YES      | `React.ReactNode`               | 1             |
| `stagger`              | Stagger duration between elements                                                                            | NO       | `number`                        | 50            |
| `duration`             | Enter/Exit animation duration                                                                                | NO       | `number`                        | 400           |
| `enterDirection`       | The direction of the animation. `1 -> top to bottom`, `-1 -> bottom to top`                                  | NO       | `number`                        | 0             |
| `exitDirection`        | The direction of the animation. `1 -> top to bottom`, `-1 -> bottom to top`                                  | NO       | `number`                        | 0             |
| `initialEnteringDelay` | Initial enter animation delay                                                                                | NO       | number                          | 1             |
| `initialExistingDelay` | Initial exit animation delay                                                                                 | NO       | number                          | -1            |
| `enter`                | [Reanimated Enter animation](https://www.reanimated3.com/docs/layout-animations/entering-exiting-animations) | NO       | `() => ComplexAnimationBuilder` | `FadeInDown`  |
| `exiting`              | [Reanimated Exit animation](https://www.reanimated3.com/docs/layout-animations/entering-exiting-animations)  | NO       | `() => ComplexAnimationBuilder` | `FadeOutDown` |
| `style`                | View style to be applied to Marquee container.                                                               | NO       | `StyleProp<ViewStyle>`          |               |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](./LICENSE)

---

<p align="center">
  <a href="https://www.animatereactnative.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://www.animatereactnative.com/animatereactnative_dark.svg">
      <img alt="AnimateReactNative.com - Premium and Custom React Native animations." src="https://www.animatereactnative.com/animatereactnative_logo.svg" width="50%">
    </picture>
  </a>
</p>
