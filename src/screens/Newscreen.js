

import React, { useState } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  Viro3DObject,
  // ViroMaterials,
  ViroButton,
} from 'react-viro';
import { View, StyleSheet } from 'react-native';



const HelloWorldSceneAR = () => {
  const [dronePosition, setDronePosition] = useState([0, 0, -1]);

  const moveDrone = (x, y, z) => {
    setDronePosition([dronePosition[0] + x, dronePosition[1] + y, dronePosition[2] + z]);
  };

  // ViroMaterials.createMaterials({
  //   arrow: {
  //     diffuseTexture: require('../assets/arrow/textures/Arrow5_baseColor.png'),
  //     roughnessTexture: require('../assets/arrow/textures/Arrow5_metallicRoughness.png'),
  //     normalTexture: require('../assets/arrow/textures/Arrow5_normal.png'),
  //   },
  //   drone2: {
  //     diffuseTexture: require('../assets/Drone/FINAL_TEXTURE.png'),
  //   },
  //   arrow2: {
  //     diffuseTexture: require('../assets/arrow-5/textures/Arrow5Albedo.png'),
  //     roughnessTexture: require('../assets/arrow-5/textures/Arrow5Rough.png'),
  //     normalTexture: require('../assets/arrow-5/textures/Arrow5Normal.png'),
  //   }
  // });


  return (
    <ViroARScene>
      <ViroText text="Hello World!" position={dronePosition} />

      {/* <Viro3DObject
        source={require('./drone.obj')}
        position={dronePosition}
        scale={[0.1, 0.1, 0.1]}
        type="OBJ"
      /> */}

      <Viro3DObject
        source={require('../assets/Drone/Drone2.obj')}

        position={dronePosition}
        scale={[0.1, 0.1, 0.1]}
        type="OBJ"
      // animation={{ name: 'droneAnim', run: true, loop: true }}
      />
      <View style={styles.buttonContainer}>
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(0.1, 0, 0)}
          text="Right"
        />
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(-0.1, 0, 0)}
          text="Left"
        />
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(0, 0.1, 0)}
          text="Up"
        />
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(0, -0.1, 0)}
          text="Down"
        />
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(0, 0, -0.1)}
          text="Forward"
        />
        <ViroButton
          style={styles.button}
          onPress={() => moveDrone(0, 0, 0.1)}
          text="Backward"
        />
      </View>
    </ViroARScene>
  );
};

const ARscreen = () => (
  <ViroARSceneNavigator initialScene={{ scene: HelloWorldSceneAR }} />
);

export default ARscreen;


const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});