import { Detection, ImageSource } from '@mediapipe/tasks-vision'
import { useEffect, useRef, useState } from 'react'
import Spinner from '../UI/Spinner'
import { useNavigate } from 'react-router'
import ErrorAlert from '../UI/ErrorAlert'
import {
  base64ToBlob,
  checkFront,
  checkLeft,
  checkRight,
  getValues,
  userPicturesState,
} from '../../utils/helpers'
import { useFaceDetection } from '../../hooks/useFaceDetection'
import { useTextToSpeech } from '../../hooks/useTextToSpeech'
import DashboardLayout from '../../layout/DashboardLayout'
import { useUserImagesMutation } from '../../redux/kyc/kycApiSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import InstructionFaceDetectionModal from '../UI/InstructionFaceDetectionModal'
import { selectCurrentUser } from '../../redux/user/userSlice'

type State =
  | 'Selfie'
  | 'Right'
  | 'Left'
  | 'done'
  | 'Verify_Selfie'
  | 'Verify_Left'
  | 'Verify_Right'
  | ''

const FaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastVideoTimeRef = useRef<number>(-1)

  const { faceDetector, isLoading, stopWebcam } = useFaceDetection(videoRef)
  const { handleStop, speak } = useTextToSpeech()

  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successText, setSuccessText] = useState(false)
  const stateRef = useRef<State>('Selfie')

  const animatedStateRef = useRef<boolean>(true)
  const animateId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [state, setState] = useState<State>('Selfie')

  const [userImagesReq, { isLoading: isUserImages }] = useUserImagesMutation()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    // THIS IS THE MAGIC PART
    stateRef.current = state
  }, [state])

  const userPictures = useRef<userPicturesState>({
    front: {
      detectionPoints: {
        nose: { x: 0, y: 0 },
        leftEye: { x: 0, y: 0 },
        rightEye: { x: 0, y: 0 },
      },
      image: '',
    },
    right: {
      detectionPoints: {
        nose: { x: 0, y: 0 },
        leftEye: { x: 0, y: 0 },
        leftEar: { x: 0, y: 0 },
        rightEar: { x: 0, y: 0 },
      },
      image: '',
    },
    left: {
      detectionPoints: {
        nose: { x: 0, y: 0 },
        rightEye: { x: 0, y: 0 },
        rightEar: { x: 0, y: 0 },
      },
      image: '',
    },
  })

  const navigate = useNavigate()

  const { t } = useTranslation()

  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia

  // If webcam not supported warn user
  if (!hasGetUserMedia()) {
    console.warn('getUserMedia() is not supported by your browser')
  }

  const predictWebcam = () => {
    const startTimeMs = performance.now()
    if (isDetectingState()) {
      lastVideoTimeRef.current = startTimeMs + lastVideoTimeRef.current
      const detections = faceDetector?.current?.detectForVideo(
        videoRef.current as ImageSource,
        startTimeMs,
      ).detections

      displayVideoDetections(detections as Detection[])
    } else if (isVerifyingState()) {
      verifyPoints()
    } else if (stateRef.current === 'done') {
      animatedStateRef.current = false
      clearTimeout(animateId.current)
      sendImages()
    }

    if (animatedStateRef.current)
      animateId.current = setTimeout(() => predictWebcam(), 500)
  }

  const displayVideoDetections = (detections: Detection[]) => {
    if (detections.length > 1) {
      animatedStateRef.current = false
      speak('More than one person on the frame.')
      setErrorMessage('More than one person on the frame.')
      errorTimeout()
    } else if (detections.length === 0) {
      animatedStateRef.current = false
      speak('No face detected.')
      setErrorMessage('No face detected.')
      errorTimeout()
    }

    if (stateRef.current === 'Selfie') {
      speak('Look Straight')
      const { nose, leftEye, rightEye } = getValues(detections)
      if (checkFront(nose, leftEye, rightEye)) {
        animatedStateRef.current = false
        clearTimeout(animateId.current)
        userPictures.current.front.detectionPoints = {
          nose,
          leftEye,
          rightEye,
        }
        screenShot()
        setSuccess(true)
        setState('Verify_Selfie')
        speak('Verifying Selfie')
      }
    } else if (stateRef.current === 'Right') {
      speak('Look Right')
      const { nose, leftEye, leftEar, rightEar } = getValues(detections)
      if (checkRight(nose, leftEye, leftEar, rightEar)) {
        animatedStateRef.current = false
        clearTimeout(animateId.current)
        userPictures.current.right.detectionPoints = { nose, leftEye, leftEar }
        screenShot()
        setSuccess(true)
        setState('Verify_Right')
        speak('Verifying Right')
      }
    } else if (stateRef.current === 'Left') {
      speak('Look Left')
      const { nose, rightEar, rightEye, leftEar } = getValues(detections)
      if (checkLeft(nose, rightEar, rightEye, leftEar)) {
        animatedStateRef.current = false
        clearTimeout(animateId.current)
        userPictures.current.left.detectionPoints = {
          nose,
          rightEar,
          rightEye,
        }
        screenShot()
        setSuccess(true)
        setState('Verify_Left')
        speak('Verifying Left')
      }
    }
  }

  const screenShot = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataUrl = canvas.toDataURL('image/png')

      if (stateRef.current === 'Selfie') {
        userPictures.current.front.image = imageDataUrl
      } else if (stateRef.current === 'Right') {
        userPictures.current.right.image = imageDataUrl
      } else if (stateRef.current === 'Left') {
        userPictures.current.left.image = imageDataUrl
      }
    }
    animateId.current = setTimeout(() => predictWebcam(), 500)
  }

  const verifyPoints = () => {
    animatedStateRef.current = false
    clearTimeout(animateId.current)
    if (stateRef.current === 'Verify_Selfie') {
      speak('Verifying Selfie')
      setSuccessText(true)
      successTimeout('Right')
    } else if (stateRef.current === 'Verify_Right') {
      speak('Verifying Right')
      setSuccessText(true)
      successTimeout('Left')
    } else if (stateRef.current === 'Verify_Left') {
      speak('Verifying Left')
      setSuccessText(true)
      successTimeout('done')
    }
  }

  const sendImages = () => {
    const formData = new FormData()
    formData.append(
      'images',
      base64ToBlob(userPictures.current.front.image),
      'selfie.jpg',
    )
    formData.append(
      'images',
      base64ToBlob(userPictures.current.right.image),
      'right.jpg',
    )
    formData.append(
      'images',
      base64ToBlob(userPictures.current.left.image),
      'left.jpg',
    )
    userImagesReq(formData)
      .unwrap()
      .then(() => {
        const updatedUser = { ...currentUser, status: 'id_verified' }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        stopWebcam(videoRef?.current?.srcObject as MediaStream | null)
        navigate('/verify')
      })
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
          setTimeout(() => {
            localStorage.setItem('kycState', 'init')
            stopWebcam(videoRef?.current?.srcObject as MediaStream | null)
            navigate('/verify')
          }, 3000)
        } else {
          setErrorMessage(error.data.message)
          setTimeout(() => {
            localStorage.setItem('kycState', 'init')
            stopWebcam(videoRef?.current?.srcObject as MediaStream | null)
            navigate('/verify')
          }, 3000)
        }
      })
  }

  const isDetectingState = () => {
    return (
      stateRef.current === 'Selfie' ||
      stateRef.current === 'Right' ||
      (stateRef.current === 'Left' &&
        videoRef?.current?.currentTime !== lastVideoTimeRef.current)
    )
  }

  const isVerifyingState = () => {
    return (
      stateRef.current === 'Verify_Selfie' ||
      stateRef.current === 'Verify_Right' ||
      stateRef.current === 'Verify_Left'
    )
  }

  const successTimeout = (nextState: State) => {
    setTimeout(() => {
      setSuccessText(false)
      setSuccess(false)
      setState(nextState)
      if (nextState === 'done') {
        handleStop()
      }
      animatedStateRef.current = true
      animateId.current = setTimeout(() => predictWebcam(), 500)
    }, 3000)
  }

  const errorTimeout = () => {
    setTimeout(() => {
      animatedStateRef.current = true
      animateId.current = setTimeout(() => predictWebcam(), 500)
    }, 3000)
  }

  return (
    <DashboardLayout page="verify">
      {isLoading ? (
        <Spinner text="Loading..." />
      ) : (
        <>
          <InstructionFaceDetectionModal />
          <div className="flex w-full bg-[#101828] h-[calc(100dvh-4rem)] py-5   sm:py-12  sm:px-5">
            {isUserImages && (
              <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center  bg-black z-10">
                <div className="relative z-30 opacity-100 text-white text-lg">
                  <Spinner text="Loading..." />
                </div>
              </div>
            )}
            <div className="text-white mt-10 w-64 h-64 hidden sm:block">
              <h4 className="font-bold text-xl ">
                {state === 'Selfie' ||
                  (state === 'Verify_Selfie' && t('lookSelfie'))}
                {state === 'Right' ||
                  (state === 'Verify_Right' && t('lookRight'))}
                {state === 'Left' || (state === 'Verify_Left' && t('lookLeft'))}
              </h4>
              <h4 className="font-bold text-xl mt-5">{t('instructions')}</h4>
              <p className="text-base ">{t('selfieInstructions')}</p>
            </div>
            <div className="w-full px-6">
              {state === 'Verify_Selfie' ||
              state === 'Verify_Right' ||
              state === 'Verify_Left' ? (
                <h4 className="text-white text-center text-lg mt-16 mb-5">
                  {state}...
                </h4>
              ) : (
                <h4 className="text-white text-center text-lg mt-16 mb-5">
                  {state === 'done' ? '' : t(`Look ${state}`)}
                </h4>
              )}

              <video
                id="webcam"
                autoPlay
                playsInline
                ref={videoRef}
                onLoadedMetadata={predictWebcam}
                className={`object-cover mx-auto rounded-full w-80 h-80 overflow-hidden border-[10px] shadow-md shadow-[#FEC84BD9] ${
                  success
                    ? 'border-[#21AB82]'
                    : errorMessage
                      ? 'border-red-700'
                      : 'border-white '
                }`}
              />

              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              {errorMessage ? (
                <div className="flex justify-center items-center mt-10">
                  <ErrorAlert
                    description={errorMessage}
                    setError={setErrorMessage}
                  />
                </div>
              ) : successText ? (
                <h4 className="text-white text-center text-lg mt-16">
                  {t('face match success')}
                </h4>
              ) : (
                <>
                  {state === 'Selfie' ||
                    state === 'Left' ||
                    (state === 'Right' && (
                      <h4 className="block sm:hidden font-bold text-xl text-white text-center mt-4">
                        {t(`look${state}`)}
                      </h4>
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}

export default FaceDetection
