precision mediump float;

// our texture
uniform sampler2D tex;

// the texCoords passed in from the vertex shader.
varying vec2 vTexCoord;

void main() {
   gl_FragColor = texture2D(tex, vTexCoord);
}
