import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View, PanResponder, Animated } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro360Image,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroNode,
  ViroButton,
  resetARSession,
} from '@viro-community/react-viro';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ViroTrackingStateConstants } from '@viro-community/react-viro/components/ViroConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ARscreen() {
  const navigation = useNavigation();
  const [object, setObject] = useState('Car');
  const [isARSceneMounted, setARSceneMounted] = useState(true);



  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const isPressed = useRef(false);

  const handlePressIn = () => {
    isPressed.current = true;
    intervalRef.current = setInterval(() => {
      if (isPressed.current) {
        setCount((prevCount) => prevCount + 4); // Increase count by 4 each time
      }
    }, 1000); // Interval duration of 250 milliseconds for increased speed
  };

  const handlePressOut = () => {
    isPressed.current = false;
    clearInterval(intervalRef.current);
  };




  const AnimateDrone = () => {
    ViroAnimations.registerAnimations({
      moveUp: {
        properties: {
          positionY: '+=0.5',
        },
        duration: 400,
        easing: 'EaseInEaseOut',
      },
      moveDown: {
        properties: {
          positionY: '-=0.5',
        },
        duration: 400,
        easing: 'EaseInEaseOut',
      },
    });

    return isDroneMoving ? 'moveUp' : 'moveDown';
  };
  const [dronePosition, setDronePosition] = useState([0, 0, -1]);

  const moveDrone = (x, y, z) => {
  console.log(dronePosition)
    setDronePosition([dronePosition[0] + x, dronePosition[1] + y, dronePosition[2] + z]);
    // AnimateDrone(x, y, z)
  };





  ViroAnimations.registerAnimations({
    rotate: {
      duration: 500,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  const [isDroneMoving, setIsDroneMoving] = useState(false);
  const [isDroneMovingPosition, setIsDroneMovingPotision] = useState(0);

  const handleDroneMove = () => {
    setIsDroneMoving(!isDroneMoving);
  };
  const handleDroneMoveUp = (isDroneMovingPosition) => {
    setIsDroneMoving(true);
    setIsDroneMovingPotision(isDroneMovingPosition + 0.4)
  };
  const handleDroneMoveDown = (isDroneMovingPosition) => {
    setIsDroneMoving(false);
    setIsDroneMovingPotision(isDroneMovingPosition - 0.4)
  };



  const handleResetARSession = () => {
    setARSceneMounted(false);
    setTimeout(() => {
      setARSceneMounted(true);
    }, 1);
  };

  const HelloWorldSceneAR = props => {

    const [text, setText] = useState('Initializing AR...');
    const [Tracked, setTracked] = useState(false);
    const onTrackingUpdated = (state, _reason) => {
      if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
        setTracked(false);
        setText('Tracking unavailable');
      }
      if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
        setText('Headout Explore');
        setTracked(true);
      }
    };
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
      }
    });

    return (
      <ViroARScene onTrackingUpdated={onTrackingUpdated}>
        <ViroAmbientLight color="#fff" />
        {!Tracked ?
          <ViroText
            text='Loading'
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -3]}
            style={styles.helloWorldTextStyle}
          /> :
          <>
            {/* <ViroNode position={[0, -1, -1.5]}>
              <Viro3DObject
                source={require('../assets/arrow_3/uploads_files_4083314_arrow_2.OBJ')}
                onClick={handleDroneMoveUp} 
                position={[-0.2, 0, 0]}
                // scale={[1, 1, 1]}
                scale={[0.1, 0.1, 0.1]}
                type="OBJ"
                materials={['arrow2']}
                animation={{ name: 'buttonAnim', run: true }}
                rotation={[1, 90, -2]}
              />
              <Viro3DObject
                source={require('../assets/arrow_3/uploads_files_4083314_arrow_2.OBJ')}
                onClick={handleDroneMoveDown}
                position={[0.2, 0, 0]}
                // scale={[1, 1, 1]}
                scale={[0.1, 0.1, 0.1]}
                type="OBJ"
                materials={['arrow2']}
                animation={{ name: 'buttonAnim', run: true }}
                rotation={[1, 90, 180]}
              />
            </ViroNode> */}
            <ViroNode position={[0, -0.5, -0.5]}>
              {/* <ViroButton
                position={[0, 0, 9.5]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                onClick={() => moveDrone(0.1, 0, 0)}
                text="Right"
              />
              <ViroButton
                position={[0, 0, 0.15]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                onClick={() => moveDrone(-0.1, 0, 0)}
                text="Left"
              />
              <ViroButton
                // rotation={[1, 90, 180]}
                animation={{ name: 'buttonAnim', run: true }}

                position={[0, 0, 0]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(0.1, 0, 0)}
                onTouch={() => moveDrone(0.1, 0, 0)}
                // onClick={handleDroneMoveDown}
                text="Right"
              />
              <ViroButton
                position={[0, 0, 0.15]}
                height={0.1}
                // onClick={handleDroneMoveUp}
                animation={{ name: 'buttonAnim', run: true }}

                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(-0.1, 0, 0)}
                onTouch={() => moveDrone(-0.1, 0, 0)}
                text="Left"
              /> */}
              {/* <ViroButton
                position={[0.15, 0, 0]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(0, 0.1, 0)}
                text="Up"
              />
              <ViroButton
                position={[-0.15, 0, 0]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(0, -0.1, 0)}
                text="Down"
              />
              <ViroButton
                position={[0, 0, -0.15]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(0, 0, -0.1)}
                text="Forward"
              />
              <ViroButton
                position={[0, 0, 0.15]}
                height={0.1}
                width={0.2}
                style={{ backgroundColor: 'white' }}
                onClick={() => moveDrone(0, 0, 0.1)}
                text="Backward"
              /> */}
            </ViroNode>

            {/* <ViroNode position={[0, 0, -1]} animation={{ name: AnimateDrone(), run: true }}>
              <ViroText text="AR Drone" scale={[0.2, 0.2, 0.2]} position={[0, 0.1, 0]} />
            </ViroNode> */}
            <ViroNode position={[0, 0, -1]} animation={{ name: AnimateDrone(), run: true }}>
  
              <Viro3DObject
                source={require('../assets/Drone/Drone2.obj')}
  
                position={[0.0, 0, 0]}
                // scale={[1, 1, 1]}
                materials={['drone2']}
                scale={[0.001, 0.001, 0.001]}
                rotation={[1, 0, 0]}
                type="OBJ"
                animation={{ name: 'droneAnim', run: true, loop: true }}
              />
            </ViroNode>
            {/* <ViroNode position={dronePosition} animation={{ name: AnimateDrone(), run: true }}>
              <Viro3DObject
                source={require('../assets/Drone/Drone2.obj')}
                materials={['drone2']}

                scale={[0.001, 0.001, 0.001]}
                type="OBJ"
              />
            </ViroNode> */}

          </>
        }
      </ViroARScene>
    );
  };





  const joystickRef = useRef(null);
  const directionRef = useRef(null);
  const magnitudeRef = useRef(0);

  useEffect(() => {
    joystickRef.current.setNativeProps({
      style: {
        left: 60,
        top: 60,
      },
    });
  }, []);

  const handlePanResponderGrant = () => {
    joystickRef.current.setNativeProps({
      style: {
        backgroundColor: 'blue',
      },
    });
  };

  const handlePanResponderRelease = () => {
    joystickRef.current.setNativeProps({
      style: {
        left: 60,
        top: 60,
        backgroundColor: 'lightgray',
      },
    });
    directionRef.current = null;
    magnitudeRef.current = 0;
  };

  const handlePanResponderMove = (event, gestureState) => {
    const { dx, dy } = gestureState;

    const radius = 50; // Adjust this value as needed

    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const newMagnitude = distance < radius ? distance / radius : 1;

    const newX = distance < radius ? dx : Math.cos(angle) * radius;
    const newY = distance < radius ? dy : Math.sin(angle) * radius;

    joystickRef.current.setNativeProps({
      style: {
        left: newX + 60,
        top: newY + 60,
      },
    });

    directionRef.current = angle;
    magnitudeRef.current = newMagnitude;

    // Example functionality based on joystick movement
    // Replace this with your own logic
    // onClick={handleDroneMoveUp} 
    // onClick={handleDroneMoveDown}
    if (newMagnitude > 0.5) {
      if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
        console.log('Move Down');
      } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
        console.log('Move Left');
      } else if (angle >= (3 * Math.PI) / 4 || angle < (-3 * Math.PI) / 4) {
        console.log('Move Up');
      } else {
        console.log('Move Right');
      }
    } else {
      console.log('Stop');
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderGrant,
    onPanResponderRelease: handlePanResponderRelease,
    onPanResponderMove: handlePanResponderMove,
  });




  return (
    <View style={{ flex: 1 }}>
      {isARSceneMounted ?
        <ViroARSceneNavigator
          autofocus={true}
          // resetARSession={object}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}

          viroAppProps={{ object: object }}
          style={styles.f1}
        />
        : <View style={styles.f1} />}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'column'
      }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.switch}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '400',
              fontFamily: 'Roboto',
              color: '#000',
            }}>
            Go Back
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={handleResetARSession}
          style={styles.switch}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '400',
              fontFamily: 'Roboto',
              color: '#000',
            }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        flex: 1,
        // backgroundColor: 'red',
        height: '100%',
        width: 200,
        zIndex: 200,
        paddingTop: 120,
      }}>
        <View style={{
          flex: 1,
          // backgroundColor: 'green' 
        }}>
          <View style={{
            // backgroundColor: 'brown'
          }}>


            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              {...panResponder.panHandlers}
            >
              <View
                // ref={joystickRef}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 100,
                  backgroundColor: '#33333350',
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  ref={joystickRef}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 40,
                    backgroundColor: 'blue',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                />
              </View>
            </View>



            {/* <Text style={styles.count}>{count}</Text> */}
          </View>
          <View style={{ flex: 1, }} />
          <View style={{
            // backgroundColor: 'purple',
            transform: [{ rotate: '45deg' }], marginBottom: 30,
            marginLeft: 30
          }}>
            <View style={{
              flexDirection: 'row',
              // backgroundColor: 'blue'
            }}>
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                // onPress={null}
                // onPress={handleDroneMoveUp} 
                onPress={() => moveDrone(0.1, 0, 0)}
              >
                <MaterialCommunityIcons name='arrow-top-left-bold-box' size={60} color='#0f0f0f99' />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name='arrow-top-left-bold-box' size={60} color='#0f0f0f99' style={{ transform: [{ rotate: '90deg' }] }} />
              </TouchableOpacity>
            </View>
            <View style={{
              flexDirection: 'row',
              // backgroundColor: 'pink'
            }}>
              <TouchableOpacity>
                <MaterialCommunityIcons name='arrow-top-left-bold-box' size={60} color='#0f0f0f99' style={{ transform: [{ rotate: '270deg' }] }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name='arrow-top-left-bold-box' size={60} color='#0f0f0f99' style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

  var styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    controlView: {
      width: '100%',
      backgroundColor: 'white',
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    switch: {
      padding: 6,
      marginBottom: 20,
      backgroundColor: '#9a9a9a',
      borderRadius: 5,
    },
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    joystickContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    joystickStick: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'gray',
    }, ckgroundColor: 'gray',
  });
