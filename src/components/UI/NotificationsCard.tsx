import { format, formatDistanceToNowStrict, isToday } from 'date-fns'
import { Notification } from '../../redux/notification/notificationSlice'

type NotificationsCardProps = {
  notification: Notification
  onClick: () => void
}

const NotificationsCard = ({
  notification,
  onClick,
}: NotificationsCardProps) => {
  const createdAt = new Date(notification.createdAt)
  let displayDate
  if (isToday(createdAt)) {
    const diffInSeconds = Math.abs(
      (new Date().getTime() - createdAt.getTime()) / 1000,
    )
    if (diffInSeconds < 60) {
      displayDate = 'Just now'
    } else {
      displayDate = `${formatDistanceToNowStrict(createdAt)} ago`
        .replace(/hours/g, 'hr')
        .replace(/minutes/g, 'min')
    }
  } else {
    displayDate = format(createdAt, 'M/d/yyyy')
  }

  return (
    <>
      <div className="flex justify-between" onClick={onClick}>
        <div>
          <h5 className="text-gray-900">
            {notification.notificationTemplate.title}
          </h5>
          <p className="text-gray-500">
            {notification.notificationTemplate.body}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">{displayDate}</p>
        </div>
      </div>
    </>
  )
}
export default NotificationsCard
