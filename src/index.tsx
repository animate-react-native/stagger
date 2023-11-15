import * as React from 'react';

import type { ViewStyle } from 'react-native';
import type {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  Keyframe,
} from 'react-native-reanimated';
import Animated, {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown,
  Layout,
  runOnJS,
} from 'react-native-reanimated';

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
  entering?: () =>
    | ComplexAnimationBuilder
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | typeof Keyframe;
  /**
   * Return the desired animation builder. It can be any of
   * https://www.reanimated2.com/docs/api/LayoutAnimations/exitAnimations.
   *
   * Custom animation: https://www.reanimated2.com/docs/api/LayoutAnimations/customAnimations.
   *
   * Keyframes animations: https://www.reanimated2.com/docs/api/LayoutAnimations/keyframeAnimations
   *
   */
  exiting?: () =>
    | ComplexAnimationBuilder
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | typeof Keyframe;

  onEnterFinished?: () => void;
  onExitFinished?: () => void;
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
  onEnterFinished,
  onExitFinished,
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

        const isLastEnter =
          index ===
          (enterDirection === 1 ? React.Children.count(children) - 1 : 0);
        const isLastExit =
          index ===
          (enterDirection === -1 ? React.Children.count(children) - 1 : 0);

        return (
          <Animated.View
            key={child.key ?? index}
            layout={Layout}
            entering={(entering() as ComplexAnimationBuilder)
              .delay(
                initialEnteringDelay +
                  (enterDirection === 1
                    ? index * stagger
                    : (React.Children.count(children) - index) * stagger)
              )
              .duration(duration)
              .withCallback((finished) => {
                'worklet';
                if (finished && isLastEnter && onEnterFinished) {
                  runOnJS(onEnterFinished)();
                }
              })}
            exiting={(exiting() as ComplexAnimationBuilder)
              .delay(
                initialExitingDelay +
                  (exitDirection === 1
                    ? index * stagger
                    : (React.Children.count(children) - index) * stagger)
              )
              .duration(duration)
              .withCallback((finished) => {
                'worklet';
                if (finished && isLastExit && onExitFinished) {
                  runOnJS(onExitFinished)();
                }
              })}
            style={child.props.style}
          >
            {child}
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}
