// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   ViroARSceneNavigator,
//   ViroARScene,
//   ViroText,
//   ViroConstants,
//   ViroARPlaneSelector,
//   ViroNode,
//   ViroTrackingStateConstants,
//   ViroMaterials,
//   ViroAnimations,
// } from '@viro-community/react-viro';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // const DroneControlSceneAR = () => {
// // const [isDroneMoving, setIsDroneMoving] = useState(false);
// // const [rotation, setRotation] = useState([0, 0, 0]);
// // const [scale, setScale] = useState([0.05, 0.05, 0.05]);

// // const handleDroneMove = () => {
// //   setIsDroneMoving(!isDroneMoving);
// // };

// // const handleRotationChange = () => {
// //   const newRotation = [...rotation];
// //   newRotation[2] += 90;
// //   setRotation(newRotation);
// // };

// // const handleScaleChange = () => {
// //   const newScale = scale.map((value) => value * 1.1);
// //   setScale(newScale);
// // };

// // const animateDrone = () => {
// //   ViroAnimations.registerAnimations({
// //     moveUp: {
// //       properties: {
// //         positionY: '+=0.5',
// //       },
// //       duration: 500,
// //       easing: 'EaseInEaseOut',
// //     },
// //     moveDown: {
// //       properties: {
// //         positionY: '-=0.5',
// //       },
// //       duration: 500,
// //       easing: 'EaseInEaseOut',
// //     },
// //     rotate: {
// //       properties: {
// //         rotateY: '+=90',
// //       },
// //       duration: 500,
// //       easing: 'EaseInEaseOut',
// //     },
// //     scaleUp: {
// //       properties: {
// //         scaleX: '+=0.1',
// //         scaleY: '+=0.1',
// //         scaleZ: '+=0.1',
// //       },
// //       duration: 500,
// //       easing: 'EaseInEaseOut',
// //     },
// //   });

// //   if (isDroneMoving) {
// //     return 'moveUp';
// //   } else if (rotation[2] !== 0) {
// //     return 'rotate';
// //   } else {
// //     return 'moveDown';
// //   }
// // };

// //   return (
// //     <ViroARScene>
// //       <ViroText text="Hello AR Drone!" scale={[0.5, 0.5, 0.5]} position={[0, 0, -1]} />
// //       <ViroNode position={[0, -1, -3]}>
// //         <ViroButton
// //           source={require('./assets/up_arrow.png')}
// //           onClick={handleDroneMove}
// //           position={[0, 0.2, 0]}
// //           scale={[1, 1, 1]}
// //           animation={{ name: 'buttonAnim', run: true }}
// //         />
// //         <ViroButton
// //           source={require('./assets/down_arrow.png')}
// //           onClick={handleDroneMove}
// //           position={[0, -0.2, 0]}
// //           scale={[1, 1, 1]}
// //           animation={{ name: 'buttonAnim', run: true }}
// //         />
// //         <ViroButton
// //           source={require('./assets/rotate_button.png')}
// //           onClick={handleRotationChange}
// //           position={[0, -0.6, 0]}
// //           scale={[1, 1, 1]}
// //           animation={{ name: 'buttonAnim', run: true }}
// //         />
// //         <ViroButton
// //           source={require('./assets/scale_button.png')}
// //           onClick={handleScaleChange}
// //           position={[0, -1, 0]}
// //           scale={[1, 1, 1]}
// //           animation={{ name: 'buttonAnim', run: true }}
// //         />
// //       </ViroNode>
// //       <ViroNode position={[0, 1, -3]} animation={{ name: animateDrone(), run: true }}>
// //         <Viro3DObject
// //           source={require('./assets/drone.obj')}
// //           position={[0, 0, 0]}
// //           scale={scale}
// //           rotation={rotation}
// //           type="OBJ"
// //           animation={{ name: 'droneAnim', run: true, loop: true }}
// //         />
// //       </ViroNode>
// //     </ViroARScene>
// //   );
// // };

// // export default DroneControlSceneAR;

// export default function DroneControlSceneAR() {
//   const [isDroneMoving, setIsDroneMoving] = useState(false);
//   const [rotation, setRotation] = useState([0, 0, 0]);

//   const handleDroneMove = () => {
//     setIsDroneMoving(!isDroneMoving);
//   };

//   const handleRotationChange = () => {
//     const newRotation = [...rotation];
//     newRotation[2] += 90;
//     setRotation(newRotation);
//   };

//   const animateDrone = () => {
//     ViroAnimations.registerAnimations({
//       moveUp: {
//         properties: {
//           positionY: '+=0.5',
//         },
//         duration: 500,
//         easing: 'EaseInEaseOut',
//       },
//       moveDown: {
//         properties: {
//           positionY: '-=0.5',
//         },
//         duration: 500,
//         easing: 'EaseInEaseOut',
//       },
//     });

//     return isDroneMoving ? 'moveUp' : 'moveDown';
//   };

//   const HelloWorldSceneAR2 = () => (
//     <ViroARScene>
//       <ViroNode position={[0, -1, -3]} animation={{ name: animateDrone(), run: true }}>
//         <ViroText
//           text="DRONE"
//           position={[0, 0, -1]}
//           rotation={rotation}
//           scale={[1, 1, 1]}
//         />
//       </ViroNode>
//     </ViroARScene>
//   );


//   return (
//     <View style={{ flex: 1 }}>
//       <ViroARSceneNavigator autofocus={true} initialScene={{ scene: HelloWorldSceneAR2 }} />
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           right: 0,
//           flex: 1,
//           transform: [{ rotate: '45deg' }],
//           marginBottom: 30,
//           marginRight: 30,
//         }}
//       >
//         <View style={{ flexDirection: 'row' }}>
//           <TouchableOpacity onPress={handleDroneMove}>
//             <MaterialCommunityIcons
//               name="arrow-top-left-bold-box"
//               size={60}
//               color="#0f0f0f99"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleRotationChange}>
//             <MaterialCommunityIcons
//               name="arrow-top-left-bold-box"
//               size={60}
//               color="#0f0f0f99"
//               style={{ transform: [{ rotate: '90deg' }] }}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <TouchableOpacity onPress={handleDroneMove}>
//             <MaterialCommunityIcons
//               name="arrow-top-left-bold-box"
//               size={60}
//               color="#0f0f0f99"
//               style={{ transform: [{ rotate: '270deg' }] }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleRotationChange}>
//             <MaterialCommunityIcons
//               name="arrow-top-left-bold-box"
//               size={60}
//               color="#0f0f0f99"
//               style={{ transform: [{ rotate: '180deg' }] }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }













import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ViroARScene, ViroText, ViroButton, ViroARSceneNavigator } from '@viro-community/react-viro';

const DroneControlSceneAR = () => {
  const [textPosition, setTextPosition] = useState([0, 0, -1]); // Initial position of the ViroText
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  const moveText = (direction) => {
    let newPosition = [...textPosition];

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

    setTextPosition(newPosition);
    setIsAnimating(true);
  };

  useEffect(() => {
    // Reset animation state after 500ms
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  const HelloWorldSceneAR2 = () => (
    <ViroARScene>
      <ViroText
        text="AR Drone"
        scale={[0.5, 0.5, 0.5]}
        position={textPosition}
        style={{ color: '#FFFFFF' }}
        animation={{
          name: isAnimating ? 'moveAnimation' : '',
          run: isAnimating,
        }}
      />
      <ViroButton
        position={[0, -1, -1]}
        scale={[0.5, 0.5, 0.5]}
        width={0.6}
        height={0.3}
        title="Up"
        onClick={() => moveText('up')}
      />
      <ViroButton
        position={[0, -1.5, -1]}
        scale={[0.5, 0.5, 0.5]}
        width={0.6}
        height={0.3}
        title="Down"
        onClick={() => moveText('down')}
      />
      <ViroButton
        position={[-0.5, -1, -1]}
        scale={[0.5, 0.5, 0.5]}
        width={0.6}
        height={0.3}
        title="Left"
        onClick={() => moveText('left')}
      />
      <ViroButton
        position={[0.5, -1, -1]}
        scale={[0.5, 0.5, 0.5]}
        width={0.6}
        height={0.3}
        title="Right"
        onClick={() => moveText('right')}
      />
    </ViroARScene>
  );

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator autofocus={true} initialScene={{ scene: HelloWorldSceneAR2 }} />
    </View>
  );
};

export default DroneControlSceneAR;
