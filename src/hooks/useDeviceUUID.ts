import { useEffect, useState } from 'react'
import { DeviceUUID } from 'device-uuid'

const useDeviceUUID = () => {
  const [uuid, setUuid] = useState('')
  useEffect(() => {
    const du = new DeviceUUID().parse()
    const dua = [
      du.language,
      du.platform,
      du.os,
      du.cpuCores,
      du.isAuthoritative,
      du.silkAccelerated,
      du.isKindleFire,
      du.isDesktop,
      du.isMobile,
      du.isTablet,
      du.isWindows,
      du.isLinux,
      du.isLinux64,
      du.isMac,
      du.isiPad,
      du.isiPhone,
      du.isiPod,
      du.isSmartTV,
      du.pixelDepth,
      du.isTouchScreen,
    ]
    setUuid(du.hashMD5(dua.join(':')))
  }, [])
  return [uuid]
}
export default useDeviceUUID
