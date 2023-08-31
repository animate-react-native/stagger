import * as React from 'react';

import Animated, {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';

export type StaggerProps = React.PropsWithChildren<{
  stagger?: number;
  /**
   * The direction of the enter animation.
   *
   * -1 means the animation will start from the last child and go to the first child.
   *
   * 1 means the animation will start from the first child and go to the last child.
   */
  enterDirection?: -1 | 1;
  /**
   * The direction of the exit animation.
   *
   * -1 means the animation will start from the last child and go to the first child.
   *
   * 1 means the animation will start from the first child and go to the last child.
   */
  exitDirection?: -1 | 1;
  duration?: number;
  style?: ViewStyle;
  /**
   * Return the desired animation builder. It can be any of
   * https://www.reanimated2.com/docs/api/LayoutAnimations/entryAnimations.
   *
   * Custom animation: https://www.reanimated2.com/docs/api/LayoutAnimations/customAnimations.
   *
   * Keyframes animations: https://www.reanimated2.com/docs/api/LayoutAnimations/keyframeAnimations
   *
   */
  entering?: () => ComplexAnimationBuilder;
  /**
   * Return the desired animation builder. It can be any of
   * https://www.reanimated2.com/docs/api/LayoutAnimations/exitAnimations.
   *
   * Custom animation: https://www.reanimated2.com/docs/api/LayoutAnimations/customAnimations.
   *
   * Keyframes animations: https://www.reanimated2.com/docs/api/LayoutAnimations/keyframeAnimations
   *
   */
  exiting?: () => ComplexAnimationBuilder;

  initialEnteringDelay?: number;
  initialExitingDelay?: number;
}>;
export function Stagger({
  children,
  stagger = 50,
  enterDirection = 1,
  exitDirection = -1,
  duration = 400,
  style,
  entering = () => FadeInDown.duration(400),
  exiting = () => FadeOutDown.duration(400),
  initialEnteringDelay = 0,
  initialExitingDelay = 0,
}: StaggerProps) {
  if (!children) {
    return null;
  }

  return (
    <Animated.View style={style} layout={Layout}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        return (
          <Animated.View
            key={child.key ?? index}
            layout={Layout}
            entering={entering()
              .delay(
                initialEnteringDelay +
                  (enterDirection === 1
                    ? index * stagger
                    : (React.Children.count(children) - index) * stagger)
              )
              .duration(duration)}
            exiting={exiting()
              .delay(
                initialExitingDelay +
                  (exitDirection === 1
                    ? index * stagger
                    : (React.Children.count(children) - index) * stagger)
              )
              .duration(duration)}
          >
            {child}
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}
