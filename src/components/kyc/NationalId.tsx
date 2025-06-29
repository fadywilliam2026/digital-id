import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { useNavigate } from 'react-router'
import { useDetectFrontBackMutation } from '../../redux/kyc/kycApiSlice'
import { base64ToBlob } from '../../utils/helpers'
import NationalIdInstructions from '../UI/NationalIdInstructions'
import PermissionModal from '../UI/PermissionModal'
import InstructionNationalIdModel from '../UI/InstructionNationalIdModel'
import DetectionState from '../UI/DetectionState'

const NationalId: React.FC = () => {
  const [state, setIsState] = useState<string>('takeFront')
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [cameraBlock, setIsCameraBlock] = useState(false)
  const [imgs, setImgs] = useState({})
  const [showInstructionModal, setShowInstructionModal] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    'environment',
  )
  const webcamRef = useRef<Webcam>(null)

  const [detectFrontBack, { isLoading: isDetectingFrontBack }] =
    useDetectFrontBackMutation()
  const [resData, setResData] = useState({
    front: '',
    back: '',
    ocr: '',
    warning: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (webcamRef.current) {
      setFacingMode('environment')
    }
  }, [webcamRef])

  const videoConstraints: MediaTrackConstraints = {
    width: 1420,
    height: 1080,
    facingMode: facingMode,
  }

  const formData = new FormData()

  const takePicture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()

    if (!imageSrc) setIsCameraBlock(true)

    if (imageSrc && state === 'takeFront') {
      const blobImage = base64ToBlob(imageSrc as string)
      setImgs({ ...imgs, front: blobImage })
      formData.append('front', blobImage, 'front.jpg')
      localStorage.setItem('kycState', 'detectBack')
      setIsState('takeBack')
    } else if (state === 'takeBack') {
      const blobImage = base64ToBlob(imageSrc as string)
      verifyId(blobImage)
      return
    }
  }

  const verifyId = async (blobImage: Blob) => {
    await detectFrontBack({ ...imgs, back: blobImage })
      .unwrap()
      .then((res) => {
        console.log(res)
        setResData(res)
        if (res.front == 'ok' && res.back == 'ok' && res.ocr == 'ok') {
          setSuccess(true)
          localStorage.setItem('kycState', 'match')
          alert(localStorage.getItem('kycState'))
          navigate('/verify/face')
        } else {
          setIsState('takeFront')
          setErrorMessage('Please try again')
        }
      })
      .catch((error) => {
        console.log(error)
        setIsState('takeFront')
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })
  }

  return (
    <>
      <InstructionNationalIdModel
        type="id"
        state=""
        showInstructionModal={showInstructionModal}
        setShowInstructionModal={setShowInstructionModal}
      />
      <>
        <div className="absolute z-10 w-full h-[calc(100dvh-4rem)]">
          <Webcam
            className="w-full h-full object-cover"
            audio={false}
            videoConstraints={videoConstraints}
            // width={1280}
            // height={720}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
            onUserMediaError={() => setIsCameraBlock(true)}
          />
        </div>

        <PermissionModal
          isOpen={cameraBlock}
          setIsOpen={setIsCameraBlock}
          permission="camera"
        />

        {isDetectingFrontBack ? (
          <DetectionState state={'loading'} />
        ) : success ? (
          <DetectionState state={'success'} />
        ) : resData.front == 'warning' ||
          resData.back == 'warning' ||
          resData.ocr == 'warning' ? (
          <DetectionState
            state={'warning'}
            resData={resData}
            setIsState={setIsState}
          />
        ) : resData.front == 'error' ||
          resData.back == 'error' ||
          resData.ocr == 'error' ? (
          <DetectionState
            state={'error'}
            resData={resData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setIsState={setIsState}
          />
        ) : (
          <NationalIdInstructions state={state} takePicture={takePicture} />
        )}
      </>
    </>
  )
}

export default NationalId
