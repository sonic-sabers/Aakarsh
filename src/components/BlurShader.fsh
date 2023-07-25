// BlurShader.fsh - (Fragment Shader)
precision highp float;
varying vec2 v_texCoord;
uniform sampler2D u_texture;
uniform vec2 u_resolution;

const float blurSize = 1.0; // Adjust the blur strength here

void main() {
  vec2 texelSize = vec2(1.0) / u_resolution;
  vec4 color = vec4(0.0);

  for (float x = -blurSize; x <= blurSize; x += 1.0) {
    for (float y = -blurSize; y <= blurSize; y += 1.0) {
      color += texture2D(u_texture, v_texCoord + vec2(x, y) * texelSize);
    }
  }

  gl_FragColor = color / ((2.0 * blurSize + 1.0) * (2.0 * blurSize + 1.0));
}
