import * as React from 'react';
import {
  SafeAreaView,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Box } from './components/Box';
import { Heading, Paragraph } from './components/Heading';
import { Stagger } from '@animatereactnative/stagger';

import {
  FadeInDown,
  FadeOutDown,
  ZoomInEasyDown,
} from 'react-native-reanimated';
// import { TextInput } from 'react-native-paper';

const primary = true;

export default function App() {
  const [show, setShow] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          zIndex: 99,
        }}
      >
        <Button
          title={`Show: ${show.toString()}`}
          onPress={() => {
            setShow((show) => !show);
          }}
        />
      </View>
      {show && (
        <Stagger
          stagger={50}
          duration={300}
          exitDirection={-1}
          entering={() => ZoomInEasyDown.springify()}
          exiting={() => FadeOutDown.springify()}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          {[...Array(6).keys()].map((item, index) => {
            return (
              <Box
                key={`item_${item}`}
                spacing={0}
                size={100}
                primary={primary}
              >
                {(index + 1) % 2 === 0 ? (
                  <Image
                    source={{
                      uri: `https://source.unsplash.com/random/${100 + index}x${
                        100 + index
                      }/?landscape`,
                    }}
                    style={StyleSheet.absoluteFillObject}
                  />
                ) : (
                  <Heading primary={!primary}>{index}</Heading>
                )}
              </Box>
            );
          })}
        </Stagger>
      )}
      {show && (
        <Stagger
          stagger={70}
          duration={300}
          exitDirection={-1}
          entering={() => {
            return FadeInDown.springify();
          }}
          style={{ flex: 1, marginTop: 32 }}
        >
          <Heading>Works with any</Heading>
          <Heading>Element</Heading>
          <Paragraph>1. Custom duration</Paragraph>
          <Paragraph>2. Custom stagger</Paragraph>
          <Paragraph>3. Custom animation</Paragraph>
          <Paragraph>4. Custom enter/exit direction</Paragraph>
          <View style={{ height: 20 }} />
          <Paragraph style={{ fontSize: 18 }}>
            Powered by Reanimated 3
          </Paragraph>
          <Paragraph style={{ fontSize: 18 }}>Works with Expo</Paragraph>
          <View style={{ height: 40 }} />
          <Paragraph>@animatereactnative/stagger</Paragraph>
          <View style={{ height: 60 }} />
          <Image
            source={{
              uri: 'https://www.animatereactnative.com/animatereactnative_dark.svg',
            }}
            style={{ width: '100%', height: 100 }}
            contentFit="contain"
          />
        </Stagger>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: !primary ? '#F0F464' : '#1F1F1F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
