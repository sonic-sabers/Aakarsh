import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, StatusBar, TouchableOpacity, View } from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector,
  ViroNode,
  ViroTrackingStateConstants,
  ViroMaterials,
  ViroFlexView,
} from '@viro-community/react-viro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BlLogo = () => {
  const droneRef = useRef(null);
  const [isARSceneMounted, setARSceneMounted] = useState(true);

  ViroMaterials.createMaterials({
    arrow: {
      diffuseTexture: require('../assets/arrow/textures/Arrow5_baseColor.png'),
      roughnessTexture: require('../assets/arrow/textures/Arrow5_metallicRoughness.png'),
      normalTexture: require('../assets/arrow/textures/Arrow5_normal.png'),
    },
    logo: {
      diffuseTexture: require('../assets/bluelearn/Full_white.png'),
    },
    arrow2: {
      diffuseTexture: require('../assets/arrow-5/textures/Arrow5Albedo.png'),
      roughnessTexture: require('../assets/arrow-5/textures/Arrow5Rough.png'),
      normalTexture: require('../assets/arrow-5/textures/Arrow5Normal.png'),
    },
  });
  const [dronePosition, setDronePosition] = useState([0, 0, -1]);
  const [direction, setDirection] = useState(null);
  const [tracked, setTracked] = useState(false);

  const moveDrone = () => {
    let newPosition = [...dronePosition];
    const step = 0.1;

    switch (direction) {
      case 'up':
        newPosition[2] -= step;
        break;
      case 'down':
        newPosition[2] += step;
        break;
      case 'left':
        newPosition[0] -= step;
        break;
      case 'right':
        newPosition[0] += step;
        break;
      default:
        break;
    }

    setDronePosition(newPosition);
  };

  useEffect(() => {
    moveDrone();
  }, [direction]);

  const handleButtonPress = (dir) => {
    setDirection(dir);
  };

  const onInitialized = (state, _reason) => {
    if (
      state === ViroTrackingStateConstants.TRACKING_NORMAL ||
      state === ViroTrackingStateConstants.TRACKING_LIMITED
    ) {
      setTracked(false);
    } else {
      setTracked(true);
    }
  };

  const HelloWorldSceneAR = () => (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {tracked ? (
        <ViroText
          text="Loading"
          // scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      ) : (
        <>
        {(Tracked && opacityStyle) ? <Viro360Image source={{ uri: mainimageURl2 }}
          rotation={[0, 90, 0]}
        /> : null}
          <ViroNode position={dronePosition}>
            {/* <ViroText
              text="DRONE"
              scale={[0.1, 0.1, 0.1]}
              position={[0, 0.05, 0]}
              materials={['logo']}
              rotation={[1, 0, 0]}
              ref={droneRef}
            /> */}
            <ViroFlexView
              height={0.40}
              width={1.3}
              materials={['logo']}
              position={[0, 0, -0.4]}
            // style={{
            //   shadowColor: "#000",
            //   shadowOffset: {
            //     width: 0,
            //     height: 4,
            //   },
            //   shadowOpacity: 0.30,
            //   shadowRadius: 4.65,

            //   elevation: 8,
            // }}
            />
          </ViroNode>
        </>
      )}
    </ViroARScene>
  );

  const handleResetARSession = () => {
    console.log('123')
    setARSceneMounted(false);
    setTimeout(() => {
      setARSceneMounted(true);
    }, 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} animated={true} />

      {isARSceneMounted ?

        <ViroARSceneNavigator
          autofocus={true}
          worldAlignment='Gravity'
          videoQuality='High'
          hdrEnabled={true}
          shadowsEnabled={true}
          initialScene={{ scene: HelloWorldSceneAR }}
        />

        : <View style={{ flex: 1, backgroundColor: '#df3c21' }} />}
      {/* <Pressable onPress={() => handleResetARSession()}


        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 3000,
          padding: 7,
          marginBottom: 20,
          backgroundColor: '#9a9a9a',
          borderRadius: 5,
          zIndex: 3000

        }}>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000',
          }}>
          Reset
        </Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  switch: {
    padding: 7,
    marginBottom: 20,
    backgroundColor: '#9a9a9a',
    borderRadius: 5,
    zIndex: 3000

  },
});

export default BlLogo;
