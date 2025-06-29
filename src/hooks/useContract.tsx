// DEPRECATED

// import { useState, useCallback } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectCurrentUser, setUser } from '../redux/user/userSlice'

// const useContract = (setSrc: (value: string) => void) => {
//   const [errorMessage, setErrorMessage] = useState('')
//   const { accessToken, refreshToken } = useSelector(selectCurrentUser)!
//   // const [src, setSrc] = useState<string | null>(null)

//   const dispatch = useDispatch()
//   const getFile = useCallback(async (contractId: number) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BASE_URL}/contract/file/${contractId}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/pdf',
//             Authorization: `Bearer ${accessToken}`,
//             'ngrok-skip-browser-warning': '69420',
//           },
//         },
//       )

//       if (res.status === 401) {
//         try {
//           const res = await fetch(
//             `${import.meta.env.VITE_BASE_URL}/auth/refreshToken`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`,
//                 'ngrok-skip-browser-warning': '69420',
//               },
//               body: JSON.stringify({
//                 refreshToken: refreshToken,
//               }),
//             },
//           )

//           const data = await res.json()

//           if (res.ok) {
//             dispatch(setUser({ data }))
//             return await getFile(contractId)
//           } else {
//             setErrorMessage(data.message)
//             return
//           }
//         } catch (error) {
//           setErrorMessage('Network error')
//         }
//       }
//       if (res.ok) {
//         const data = await res.blob()
//         setSrc(URL.createObjectURL(data))
//       } else {
//         setErrorMessage('Failed to get the file')
//         return
//       }
//     } catch (err) {
//       alert(err)
//       setErrorMessage('Network error')
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return { getFile, errorMessage, setErrorMessage }
// }

// export default useContract
