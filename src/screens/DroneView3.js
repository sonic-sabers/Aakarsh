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
  ViroAnimations,
} from '@viro-community/react-viro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DroneControlSceneAR() {
  const [dronePosition, setDronePosition] = useState([0, 0, -1]);
  const [isMoving, setIsMoving] = useState(false);
  const [tracked, setTracked] = useState(false);

  const droneRef = useRef(null);

  ViroAnimations.registerAnimations({
    droneAnimation: {
      properties: {
        translateY: '+=0.1',
      },
      easing: 'Linear',
      duration: 200,
    },
  });

  const moveDrone = (direction) => {
    if (isMoving) return; // Prevent multiple simultaneous animations

    let newPosition = [...dronePosition];

    switch (direction) {
      case 'up':
        newPosition[1] += 0.1;
        break;
      case 'down':
        newPosition[1] -= 0.1;
        break;
      case 'left':
        newPosition[0] -= 0.1;
        break;
      case 'right':
        newPosition[0] += 0.1;
        break;
      default:
        break;
    }

    setIsMoving(true);
    setDronePosition(newPosition);
  };

  const onAnimationFinish = () => {
    setIsMoving(false);
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

  useEffect(() => {
    if (isMoving) {
      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  }, [isMoving]);

  const HelloWorldSceneAR2 = () => (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroNode>
        <ViroNode
          animation={{
            name: 'droneAnimation',
            run: isMoving,
            loop: false,
            onFinish: onAnimationFinish,
          }}
        >
          <ViroText
            text="DRONE"
            scale={[0.1, 0.1, 0.1]}
            position={[0, 0.05, -0.5]}
            rotation={[1, 0, 0]}
          />
        </ViroNode>
      </ViroNode>
    </ViroARScene>
  );

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator autofocus={true} initialScene={{ scene: HelloWorldSceneAR2 }} />
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
          <TouchableOpacity onPress={() => moveDrone('up')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => moveDrone('left')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => moveDrone('down')}>
            <MaterialCommunityIcons
              name="arrow-top-left-bold-box"
              size={60}
              color="#0f0f0f99"
              style={{ transform: [{ rotate: '270deg' }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => moveDrone('right')}>
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
}

const styles = StyleSheet.create({});
