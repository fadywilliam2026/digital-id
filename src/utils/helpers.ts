import { Detection } from '@mediapipe/tasks-vision'

// Convert the base64 image to a Blob object
export const base64ToBlob = (base64String: string) => {
  const byteCharacters = atob(base64String.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteCharacters.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i)
  }

  return new Blob([arrayBuffer], { type: 'image/jpeg' }) // Adjust the type if needed
}

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export interface KeyPoints {
  x: number
  y: number
}
export interface DetectionPoints {
  nose: KeyPoints
  leftEye?: KeyPoints
  rightEye?: KeyPoints
  leftEar?: KeyPoints
  rightEar?: KeyPoints
}
export interface userPicturesState {
  front: {
    detectionPoints: DetectionPoints //nose,left & right eye
    image: string
  }
  right: {
    detectionPoints: DetectionPoints //nose,left eye & ear
    image: string
  }
  left: {
    detectionPoints: DetectionPoints //nose,right eye & ear
    image: string
  }
}

//right eye, left eye, nose tip, mouth center, right ear tragion, and left ear tragion

export const checkFront = (
  nose: KeyPoints,
  leftEye: KeyPoints,
  rightEye: KeyPoints,
) => {
  if (
    nose.x >= 40 &&
    nose.x <= 60 &&
    nose.y >= 40 &&
    nose.y <= 60 &&
    leftEye.x >= 40 &&
    leftEye.x <= 60 &&
    leftEye.y >= 40 &&
    leftEye.y <= 60 &&
    rightEye.x >= 40 &&
    rightEye.x <= 60 &&
    rightEye.y >= 40 &&
    rightEye.y <= 60
  )
    return true
  return false
}

export const checkRight = (
  nose: KeyPoints,
  _leftEye: KeyPoints,
  leftEar: KeyPoints,
  rightEar: KeyPoints,
) => {
  if (
    rightEar.x < leftEar.x &&
    rightEar.x > nose.x
    // nose.x >= 15 &&
    // nose.x <= 40 &&
    // nose.y >= 40 &&
    // nose.y <= 60 &&
    // leftEar.x >= 50 &&
    // leftEar.x <= 60 &&
    // leftEar.y >= 40 &&
    // leftEar.y <= 60 &&
    // leftEye.x >= 20 &&
    // leftEye.x <= 40 &&
    // leftEye.y >= 40 &&
    // leftEye.y <= 60
  )
    return true
  return false
}

export const checkLeft = (
  nose: KeyPoints,
  rightEar: KeyPoints,
  _rightEye: KeyPoints,
  leftEar: KeyPoints,
) => {
  if (
    leftEar.x > rightEar.x &&
    leftEar.x < nose.x
    // nose.x >= 55 &&
    // nose.x <= 80 &&
    // nose.y >= 40 &&
    // nose.y <= 60 &&
    // rightEar.x >= 30 &&
    // rightEar.x <= 80 &&
    // rightEar.y >= 40 &&
    // rightEar.y <= 60 &&
    // rightEye.x >= 30 &&
    // rightEye.x <= 80 &&
    // rightEye.y >= 40 &&
    // rightEye.y <= 60
  )
    return true
  return false
}

export const getValues = (detections: Detection[]) => {
  const rightEye = {
    x: Math.round(detections[0].keypoints[0].x * 100),
    y: Math.round(detections[0].keypoints[0].y * 100),
  }
  const leftEye = {
    x: Math.round(detections[0].keypoints[1].x * 100),
    y: Math.round(detections[0].keypoints[1].y * 100),
  }
  const nose = {
    x: Math.round(detections[0].keypoints[2].x * 100),
    y: Math.round(detections[0].keypoints[2].y * 100),
  }
  const rightEar = {
    x: Math.round(detections[0].keypoints[4].x * 100),
    y: Math.round(detections[0].keypoints[4].y * 100),
  }
  const leftEar = {
    x: Math.round(detections[0].keypoints[5].x * 100),
    y: Math.round(detections[0].keypoints[5].y * 100),
  }
  return { nose, rightEye, rightEar, leftEye, leftEar }
}
