import { useEffect, useRef, useState } from 'react'
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision'

export function useFaceDetection(videoRef: React.RefObject<HTMLVideoElement>) {
  // const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const faceDetector = useRef<FaceDetector | null>(null)
  const initializefaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    )
    faceDetector.current = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
    })
  }

  useEffect(() => {
    const init = async () => {
      await initializefaceDetector()
      setIsLoading(false)
    }

    init()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      enableCam()
    }
  }, [isLoading])

  // Enable the live webcam view and start detection.
  async function enableCam() {
    if (!faceDetector) {
      alert('Face Detector is still loading. Please try again..')
      return
    }

    // getUsermedia parameters
    const constraints = {
      video: true,
      innerWidth: 1280,
      innerHeight: 720,
    }

    // Activate the webcam stream.
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        if (videoRef && videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const stopWebcam = (stream: MediaStream | null) => {
    console.log('stream before stop', stream)
    if (stream) {
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      console.log('stream after stop', stream)
    }
    if (videoRef && videoRef.current) videoRef.current.srcObject = null
  }

  return { faceDetector, isLoading, stopWebcam }
}
