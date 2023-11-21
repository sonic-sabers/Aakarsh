import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ViroARScene, ViroText, ViroButton, ViroARSceneNavigator, ViroBox, ViroMaterials, ViroNode, ViroImage, ViroQuad, ViroFlexView, ViroARPlaneSelector, ViroSphere, ViroSpotLight, ViroAnimations } from '@viro-community/react-viro';

export default function ARDashboard() {
  const [isAnimating, setIsAnimating] = useState(false); // Animation state
  const [gazedButton, setGazedButton] = useState('');
  const [isLaserVisible, setIsLaserVisible] = useState(false);
  const [ActiveButton, setActiveButton] = useState('Projects');
  const [isARSceneMounted, setARSceneMounted] = useState(true);

  const handleTextGaze = () => {
    setText('Buttons gazed!');
  };

  useEffect(() => {
    // Reset animation state after 500ms
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleButtonGaze = (buttonName) => {
    setGazedButton(buttonName);
  };

  const handleButtonClick = (buttonName) => {
    // Handle button click based on the button name
    if (buttonName === 'Laser Button') {
      setIsLaserVisible(true);
      setTimeout(() => {
        setIsLaserVisible(false);
      }, 1000);
    }
  };

  const handleResetARSession = () => {
    setARSceneMounted(false);
    setTimeout(() => {
      setARSceneMounted(true);
    }, 1);
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
    BLWorkInactive: {
      diffuseTexture: require('../assets/NewImages/BLWorkInactive.png'),
    },
    ActiveHome: {
      diffuseTexture: require('../assets/NewImages/Home.png'),
    },
    ChatsInactive: {
      diffuseTexture: require('../assets/NewImages/ChatsInactive.png'),
    },
    DiscussionsInactive: {
      diffuseTexture: require('../assets/NewImages/DiscussionsInactive.png'),
    },
    EventsInactive: {
      diffuseTexture: require('../assets/NewImages/EventsInactive.png'),
    },
    sphereB: {
      roughness: 0.2,
      metalness: 1.0,
      lightingModel: "PBR",
      diffuseColor: "#FFFFFF"
    },
    MainBG: {
      // roughnessTexture: require('../assets/NewImages/MainBG.png'),
      diffuseTexture: require('../assets/NewImages/MainBG.png'),
      // metalness: 100,
      // blendMode: 'Alpha',
      // diffuseIntensity: 10,
      // bloomThreshold: 300,
      // roughness: 0.5,
      // metalness: 1.0,
      // lightingModel: "PBR",
      // diffuseColor: "#FFFFFF"
    },
    MainBG2: {
      diffuseTexture: require('../assets/NewImages/BGmain2.png'),
    },
    ProjectsInactive: {
      diffuseTexture: require('../assets/NewImages/ProjectsInactive.png'),
    },
    ActiveProjects: {
      diffuseTexture: require('../assets/NewImages/ActiveProjects.png'),
    },
    SavedInactive: {
      diffuseTexture: require('../assets/NewImages/SavedInactive.png'),
    },
    Sidebar: {
      diffuseTexture: require('../assets/NewImages/Sidebar.png'),
    },
    BlueLearnLogo: {
      diffuseTexture: require('../assets/NewImages/BlueLearnLogo.png'),
    },
    InactiveHome: {
      diffuseTexture: require('../assets/NewImages/InactiveHome.png'),
    },
    background: {
      // lightingModel: 'Phong',
      blendMode: 'Alpha',
      // diffuseTexture: require('../assets/Image/BlurView2.png'),
      // shader: 'BLUR_SHADER',
      metalness: 10,
      roughness: 10,
      shininess: 2.0,
      diffuseColor: 'rgba(0, 0, 0, 0.9)',
      diffuseTexture: require('../assets/Image/BlurView2.png'),
      roughnessTexture: require('../assets/Image/BLurView.jpeg'),
      shader: 'Blur',
    },
  });

  const laserPointerRef = useRef(null);
  const [pointerPosition, setPointerPosition] = useState([0, 0, -2]);
  const [isPointerVisible, setIsPointerVisible] = useState(false);

  const handleHandMove = (position) => {
    if (laserPointerRef.current) {
      // setPointerPosition(position);
    }
  };

  const handlePointerVisibility = (isVisible) => {
    // setIsPointerVisible(isVisible);
  };



  ViroAnimations.registerAnimations({
    moveRight: {
      properties: {
        positionX: "+=0.3"
      },
      duration: 3000
    },
    moveLeft: {
      properties: {
        positionX: "-=0.3",
        rotateZ: "+=45"
      },
      duration: 3000
    },
    rotate: {
      properties: {
        rotateZ: "+=45"
      },
      duration: 1000
    },
    moveLeftRight: [
      ["moveRight", "moveLeft"],
    ]
  });
  const handleObjectCollision = (nodeName) => {
    console.log('Collided with', nodeName);
    // Perform actions when the laser pointer collides with an object
  };
  const [currentAnim, setCurrentAnim] = useState("moveLeftRight");

  const handleSwitchAnimation = () => {
    console.log(24)
    setCurrentAnim((prevAnim) => {
      if (prevAnim === "moveLeftRight") return "rotate"
      return "moveLeftRight";
    });
  }

  const HelloWorldSceneAR2 = () => (
    <ViroARScene>
      {/* Logo */}
      <ViroNode position={[0.9, 0, -3]} >
        {/* <ViroBox
          scale={[0.8, 0.8, 0]}
          materials={['background']} /> */}
        {/* <ViroQuad
          position={[0, 0, -1]}
          // scale={[10, 10, 0.1]}
          scale={[0.8, 0.8, 0]}

          rotation={[0, 0, 0]}
          materials={['background']}
          borderRadius={10} // Adjust the borderRadius value as needed
        /> */}

        {/* <ViroNode position={[0, 0, 0]}> */}
        {/* <ViroImage
            position={[0, 0, -1]}
            scale={[1, 1, 0.1]}
            rotation={[0, 0, 0]}
            source={require('../assets/Image/BlurView2.png')}
          /> */}
        {/* <ViroNode position={[0, 0, 0]}>
            <ViroFlexView
              style={{
                width: 1,
                height: 0.6,
                borderRadius: 100, // Adjust the borderRadius value as needed
                backgroundColor: '#89898990',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <ViroNode position={[0, 0, -1]} onClick={() => console.log('Dashboard clicked!')}>
                <ViroBox
                  scale={[0.3, 0.3, 0.1]}
                  materials={['background']}
                />
                <ViroText
                  text="Dashboard"
                  scale={[0.2, 0.2, 0.2]}
                  //            position={[0, 0, -0.09]}

                  style={{ color: '#FFFFFF' }}
                />
              </ViroNode>
              <ViroText
                text="Logo"
                scale={[0.2, 0.2, 0.2]}
                style={{ color: '#ffffff' }}
              />
            </ViroFlexView>
          </ViroNode> */}
        {/* </ViroNode> */}

        {/* <ViroText
          text="Logo"
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0, -1]}
          style={{ color: '#FFFFFF' }}
        /> */}

        {/* Left Side Buttons */}
        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, -.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={.7} />
        <ViroSphere
          position={[0, 0, 0]}
          radius={0.3}
          materials={"sphereB"} />
        <ViroBox
          position={[-1, 0, -0.7]}
          scale={[0.1, 0.4, 0.1]}
          onClick={handleSwitchAnimation}
          animation={{
            name: currentAnim,
            run: true,
            interruptible: true
          }} />
        <ViroFlexView rotation={[0, 0, 0]}
          dragType="FixedToWorld" onDrag={() => { }}
          height={1.6}
          style={{
            overflow: 'hidden'
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: '#00000050',
            // borderTopRightRadius: 100

          }}
          width={2.5}
          materials={['MainBG']}
          position={[-1, 0.1, -0.7]}
        >

          <ViroFlexView
            width={0.9}
            height={1.6}
            style={{
              padding: 0.06,
              paddingTop: 0.1
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
            materials={['Sidebar']}>
            <ViroFlexView style={{ padding: 0.02 }} ></ViroFlexView>

            <ViroFlexView
              height={0.08}
              width={0.34}
              style={{
                // paddingTop: 0.5
              }}
              materials={['BlueLearnLogo']}
              position={[0, 0, -0.4]}
              onClick={() => console.log('Discussions clicked!')}>
            </ViroFlexView>
            <ViroFlexView style={{ padding: 0.09 }} ></ViroFlexView>
            {ActiveButton === 'Home' ? <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['ActiveHome']}
              position={[0, 0, -0.4]}
              onTouch={() => setActiveButton('Home')}
              onClick={() => setActiveButton('Home')}
            >
            </ViroFlexView>
              :
              <ViroFlexView
                height={0.15}
                width={0.7}
                materials={['InactiveHome']}
                position={[0, 0, -0.4]}
                onTouch={() => setActiveButton('Home')}
                onClick={() => setActiveButton('Home')}
              >
              </ViroFlexView>}
            <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['DiscussionsInactive']}
              position={[0, 0, -0.4]}

              onClick={() => console.log('Discussions clicked!')}>
            </ViroFlexView>
            <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['EventsInactive']}
              position={[0, 0, -0.4]}

              onClick={() => console.log('EventsInactive clicked!')}>
            </ViroFlexView>
            <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['BLWorkInactive']}
              position={[0, 0, -0.4]}

              onClick={() => console.log('BLWorkInactive clicked!')}>
            </ViroFlexView>
            {ActiveButton === 'Projects' ? <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['ActiveProjects']}
              position={[0, 0, -0.4]}
              onTouch={() => setActiveButton('Projects')}
              onClick={() => setActiveButton('Projects')}>
            </ViroFlexView>
              : <ViroFlexView
                height={0.15}
                width={0.7}
                materials={['ProjectsInactive']}
                position={[0, 0, -0.4]}
                onTouch={() => setActiveButton('Projects')}
                onClick={() => setActiveButton('Projects')}>
              </ViroFlexView>}
            <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['ChatsInactive']}
              position={[0, 0, -0.4]}

              onClick={() => console.log('Discussions clicked!')}>
            </ViroFlexView>
            <ViroFlexView style={{ padding: 0.05, }} ></ViroFlexView>

            <ViroFlexView
              height={0.15}
              width={0.7}
              materials={['SavedInactive']}
              position={[0, 0, -0.4]}

              onClick={() => console.log('Discussions clicked!')}>
            </ViroFlexView>

          </ViroFlexView>

          <ViroNode

            position={[-1, -0.2, 0]} onClick={() => console.log('Events clicked!')}>
            <ViroBox
              scale={[0.6, 0.3, 0.1]}
              materials={['background']}
            />
            <ViroText
              text="Events"
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, -0.05]}
              style={{ color: '#FFFFFF' }}
            />
          </ViroNode>

          <ViroNode position={[-1, -0.5, 0]} onClick={() => console.log('Work clicked!')}>
            <ViroBox
              scale={[0.3, 0.3, 0.1]}
              materials={['background']}
            />
            <ViroText
              text="Work"
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, -0.05]}
              style={{ color: '#FFFFFF' }}
            />
          </ViroNode>
        </ViroFlexView>

        <ViroQuad
          position={[0, 0, 0]}
          rotation={[-90, 0, 0]}
          width={4} height={4}
          arShadowReceiver={true} />



        {/* Profile Image, Notifications, and Username */}
        <ViroImage
          source={require('../assets/Image/Glass.png')}
          scale={[0.1, 0.1, 0.1]}
          position={[0.8, 0.6, -1]}
        />

        <ViroText
          text="Notifications"
          scale={[0.2, 0.2, 0.2]}
          position={[0.8, 0.4, -1]}
          style={{ color: '#FFFFFF' }}
        />

        <ViroText
          text="Ashish"
          scale={[0.2, 0.2, 0.2]}
          position={[0.8, 0.2, -1]}
          style={{ color: '#FFFFFF' }}
        />

        {/* User Profile Item */}
        <ViroText
          text="User Profile Item"
          scale={[0.4, 0.4, 0.4]}
          position={[0, -0.5, -1]}
        />
      </ViroNode>

    </ViroARScene>
  );

  return (
    <View style={{ flex: 1 }}>

      {isARSceneMounted ?
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: HelloWorldSceneAR2 }}
          onTrackingUpdated={({ tracking }) => handlePointerVisibility(tracking.isInitialized && tracking.isEnabled)}
          onCameraARHitTest={({ results }) => {
            if (results.length > 0) {
              const [result] = results;
              handleHandMove(result.position);
            }
          }}
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
          onPress={() => console.log(124)}
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