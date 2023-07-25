import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector,
  ViroNode,
  ViroTrackingStateConstants,
  ViroMaterials,
} from '@viro-community/react-viro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DroneControlSceneAR = () => {
  const droneRef = useRef(null);

  ViroMaterials.createMaterials({
    arrow: {
      diffuseTexture: require('../assets/arrow/textures/Arrow5_baseColor.png'),
      roughnessTexture: require('../assets/arrow/textures/Arrow5_metallicRoughness.png'),
      normalTexture: require('../assets/arrow/textures/Arrow5_normal.png'),
    },
    drone2: {
      diffuseTexture: require('../assets/Drone/FINAL_TEXTURE.png'),
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
      setTracked(true);
    } else {
      setTracked(false);
    }
  };

  const HelloWorldSceneAR = () => (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {tracked ? (
        <ViroText
          text="Loading"
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      ) : (
        <>
          <ViroNode position={dronePosition}>
            <ViroText
              text="DRONE"
              scale={[0.1, 0.1, 0.1]}
              position={[0, 0.05, 0]}
              materials={['drone2']}
              rotation={[1, 0, 0]}
              ref={droneRef}
            />
          </ViroNode>
        </>
      )}
    </ViroARScene>
  );

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: HelloWorldSceneAR }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          flex: 1,
          transform: [{ rotate: '45deg' }],
          marginBottom: 30,
          marginRight: 30,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleButtonPress('up')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonPress('left')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleButtonPress('down')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
              style={{ transform: [{ rotate: '270deg' }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonPress('right')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
});

export default DroneControlSceneAR;
