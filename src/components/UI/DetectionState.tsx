import { useTranslation } from 'react-i18next'
import { Steps, Flex, Button, Card } from 'antd'
import ErrorAlert from './ErrorAlert'
import Header from '../../assets/Header.png'
import idBack from '../../assets/icons/idBack.png'
import smile from '../../assets/icons/smile.png'
import { useNavigate } from 'react-router'
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  RightOutlined,
  IdcardOutlined,
  FrownOutlined,
} from '@ant-design/icons'

interface DetectionStateProps {
  resData?: {
    front: string
    back: string
    ocr: string
    warning: string
  }
  state?: string
  errorMessage?: string
  setErrorMessage?: (errorMessage: string) => void
  setIsState?: (state: string) => void
}

const DetectionState = ({
  state,
  errorMessage,
  setErrorMessage,
  setIsState,
}: DetectionStateProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const cardContent = (
    state: string,
  ): {
    header: string
    items: object[]
    steps: {
      current: number | undefined
      status: 'error' | 'wait' | 'process' | 'finish' | undefined
    }
  } => {
    switch (state) {
      case 'loading':
        return {
          header: t('Verifying your ID.Please wait'),
          items: [],
          steps: {
            current: undefined,
            status: undefined,
          },
        }
      case 'success':
        return {
          header: t('Your ID is verified!'),
          items: [
            {
              title: (
                <span>
                  <IdcardOutlined className="pr-2" />
                  {t('ID front data verified')}
                </span>
              ),
            },
            {
              title: (
                <span className="flex">
                  <img src={idBack} className="pr-2 w-5 h-4 mt-1"></img>
                  {t('ID back data verified')}
                </span>
              ),
            },
            {
              title: (
                <span className="flex">
                  <img src={smile} className="pr-2 w-6 h-4 mt-1"></img>
                  {t('Front and back side match')}
                </span>
              ),
            },
          ],
          steps: {
            current: 3,
            status: 'finish',
          },
        }
      case 'warning':
        return {
          header: t('Your ID is not verified!'),
          items: [
            {
              title: (
                <span className="text-[#B54708]">
                  <IdcardOutlined className="pr-2" />
                  {t('ID front data needs manual review.')}
                </span>
              ),
              icon: (
                <ExclamationCircleOutlined className="bg-[#FDB022] rounded-full text-black border-none " />
              ),
            },
            {
              title: (
                <span className="text-[#0A6046] flex">
                  <img src={idBack} className="pr-2 w-5 h-4 mt-1"></img>
                  {t('ID back data verified')}
                </span>
              ),
              icon: (
                <CheckCircleOutlined className="bg-[#9ee6d0] rounded-full text-black border-none" />
              ),
            },
          ],
          steps: {
            current: undefined,
            status: undefined,
          },
        }
      case 'error':
        return {
          header: t('Your ID is not verified!'),
          items: [
            {
              title: (
                <span className="text-[#0a6046]">
                  <IdcardOutlined className="pr-2" />
                  {t('ID front data verified')}
                </span>
              ),
              icon: (
                <CheckCircleOutlined className="bg-[#9ee6d0] rounded-full text-black border-none" />
              ),
            },
            {
              title: (
                <span className="flex text-[#0a6046]">
                  <img src={idBack} className="pr-2 w-5 h-4 mt-1"></img>
                  {t('ID back data verified')}
                </span>
              ),
              icon: (
                <CheckCircleOutlined className="bg-[#9ee6d0] rounded-full text-black border-none" />
              ),
            },
            {
              title: (
                <span>
                  <FrownOutlined className="pr-2" />
                  {t('Front data and back data doesnt match')}
                </span>
              ),
            },
          ],
          steps: {
            current: 2,
            status: 'error',
          },
        }
      default:
        return {
          header: '',
          items: [],
          steps: {
            current: 0,
            status: undefined,
          },
        }
    }
  }

  const { header, items, steps } = cardContent(state!)

  return (
    <>
      <div
        className="absolute z-20 w-full flex justify-center h-[calc(100dvh-4rem)]"
        style={{
          background: 'linear-gradient(to bottom, #1D2939, #475467)',
        }}
      >
        <div className="pt-10 !w-96 !rounded-none text-center">
          <Card cover={<img src={Header} alt="ID" className="rounded-none" />}>
            <h1 className="font-bold text-xl pb-7">{header}</h1>
            {state !== 'loading' && (
              <Steps
                size="small"
                current={steps?.current}
                status={steps.status}
                direction="vertical"
                items={items}
                className={
                  state == 'success'
                    ? 'custom-steps-success custom-steps'
                    : 'custom-steps'
                }
              />
            )}
            {['success', 'loading'].includes(state!) && (
              <Button
                block
                disabled={state == 'loading'}
                loading={state == 'loading'}
                onClick={() => navigate('/verify/face')}
                className="flex justify-center items-center bg-[#0A6046] text-white h-12 rounded-none mt-5 "
              >
                {t('Next')}
                <RightOutlined />
              </Button>
            )}

            {state === 'warning' && (
              <>
                <Flex justify="space-between" gap={10}>
                  <Button
                    block
                    className="flex justify-center items-center border-2 border-green-700 text-green-700 h-12 rounded-none mt-5 bg-white font-semibold text-base"
                    onClick={() => setIsState?.('takeFront')}
                  >
                    <SyncOutlined />
                    {t('Rescan')}
                  </Button>
                  <Button
                    block
                    className="flex justify-center items-center bg-[#0A6046] text-white h-12 rounded-none mt-5 font-semibold"
                    onClick={() => {
                      navigate('/verify/face')
                    }}
                  >
                    {t('Continue')}
                    <RightOutlined />
                  </Button>
                </Flex>
              </>
            )}

            {state === 'error' && (
              <>
                <ErrorAlert
                  description={errorMessage!}
                  setError={setErrorMessage!}
                />
                <Button
                  block
                  className="flex justify-center items-center bg-[#0A6046] text-white h-12 rounded-none mt-5 font-semibold"
                  onClick={() => setIsState?.('takeFront')}
                >
                  <SyncOutlined />
                  {t('Retry')}
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}

export default DetectionState
