import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ViroARScene, ViroText, ViroButton, ViroARSceneNavigator, ViroBox, ViroMaterials, ViroNode, ViroImage, ViroQuad, ViroFlexView } from '@viro-community/react-viro';

export default function ARDashboard() {
  const [isAnimating, setIsAnimating] = useState(false); // Animation state
  const [gazedButton, setGazedButton] = useState('');
  const [isLaserVisible, setIsLaserVisible] = useState(false);
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

  const handleObjectCollision = (nodeName) => {
    console.log('Collided with', nodeName);
    // Perform actions when the laser pointer collides with an object
  };

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
        <ViroNode position={[-1, 0.4, 10]} onClick={() => console.log('Dashboard clicked!')}>
          {/* <ViroBox
            scale={[0.3, 0.2, 0.1]}
            materials={['background']}
          /> */}
          <ViroFlexView
            style={{
              width: 1,
              height: 0.6,
              borderRadius: 10, // Adjust the borderRadius value as needed
              backgroundColor: '#89898990',
              // justifyContent: 'flex-start',
              // alignItems: 'center',
            }}
          >
            {/* <ViroNode position={[-1, 0.8, 0]} onClick={() => console.log('Chats clicked!')}> */}
            {/* <ViroBox
              scale={[0.3, 0.3, 0.1]}
              materials={['background']}
            />
            <ViroText
              text="Chats"
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, -0.09]}
              style={{ color: '#FFFFFF' }}
            /> */}
            {/* </ViroNode> */}
            {/* <ViroText
              text="Dashboard"
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, -0.09]}

              style={{ color: '#FFFFFF' }}
            /> */}
            {/* 
            <ViroNode onClick={() => console.log('Work clicked!')}>
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
            </ViroNode> */}

          </ViroFlexView>

        </ViroNode>

        <ViroFlexView rotation={[0, 0, 0]}
          height={1.3}
          style={{

            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#00000050',
            // borderTopRightRadius: 100
          }}
          width={2.5}
          materials={['background']}
          position={[-1, 0.1, -0.4]}
        >
          {/* <ViroBox
            scale={[1.8, 1, 0.1]}
            materials={['background']}
          /> */}

          <ViroFlexView rotation={[0, 0, 0]}
            height={0.3}
            style={{

              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'red',
              borderTopRightRadius: 100
            }}
            width={0.5}
            materials={['background']}
            position={[-0.7, 0.1, -0.4]} onClick={() => console.log('Discussions clicked!')}>
            <ViroText
              text="Discussions"
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0, -0.09]}

              style={{ color: '#FFFFFF' }}
            />
          </ViroFlexView>

          <ViroNode position={[-1, -0.2, 0]} onClick={() => console.log('Events clicked!')}>
            <ViroBox
              scale={[0.3, 0.3, 0.1]}
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

        {/* <ViroNode position={[-1, 0.8, 0]} onClick={() => console.log('Chats clicked!')}>
          <ViroBox
            scale={[0.3, 0.3, 0.1]}
            materials={['background']}
          />
          <ViroText
            text="Chats"
            scale={[0.2, 0.2, 0.2]}
            position={[0, 0, -0.09]}
            style={{ color: '#FFFFFF' }}
          />
        </ViroNode> */}

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