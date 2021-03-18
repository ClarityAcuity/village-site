import vShaderSource from "./shaders/vertex.vert"
import fShaderSource from "./shaders/fragment.frag"
import { setRectangle } from "./helpers"
import { initShaderProgram } from "./gl-helpers"

const texPositions = [
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  1.0,
  0.0,
  1.0,
  1.0,
]

function initBuffers(gl, image) {
  const { width, height } = gl.canvas
  const positions = setRectangle(0, 0, width, height)

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  const texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texPositions), gl.STATIC_DRAW)
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0, // level
    gl.RGBA, // internal format
    width, // width
    height, // height
    0, // border
    gl.RGBA, // format
    gl.UNSIGNED_BYTE, // type
    new Uint8Array(image) // data
  )

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

  return {
    position: positionBuffer,
    texCoord: texCoordBuffer,
  }
}

function drawScene(gl, programInfo, buffers) {
  const { width, height } = gl.canvas
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, width, height)

  gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(programInfo.program)

  {
    const positionLocation = programInfo.attribLocations.vertexPosition
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
      positionLocation,
      numComponents,
      type,
      normalize,
      stride,
      offset
    )
    gl.enableVertexAttribArray(positionLocation)
  }

  {
    const texCoordLocation = programInfo.attribLocations.texCoordLocation
    const size = 2 // 2 components per iteration
    const type = gl.FLOAT // the data is 32bit floats
    const normalize = false // don't normalize the data
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0 // start at the beginning of the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord)
    gl.vertexAttribPointer(
      texCoordLocation,
      size,
      type,
      normalize,
      stride,
      offset
    )
    gl.enableVertexAttribArray(texCoordLocation)
  }

  gl.uniform2f(
    programInfo.uniformLocations.resolutionUniformLocation,
    width,
    height
  )

  {
    const primitiveType = gl.TRIANGLES
    const offset = 0
    const count = 6
    gl.drawArrays(primitiveType, offset, count)
  }
}

export default function render(gl, image) {
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    )
    return
  }
  gl.createProgram()
  const shaderProgram = initShaderProgram(gl, vShaderSource, fShaderSource)
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      texCoordLocation: gl.getAttribLocation(shaderProgram, "aVertexTexCoord"),
    },
    uniformLocations: {
      resolutionUniformLocation: gl.getUniformLocation(
        shaderProgram,
        "uResolution"
      ),
    },
  }

  const buffers = initBuffers(gl, image)

  drawScene(gl, programInfo, buffers)
}
