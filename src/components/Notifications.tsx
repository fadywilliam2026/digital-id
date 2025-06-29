import { useState } from 'react'
import {
  useGetReadNotificationsQuery,
  useGetUnReadNotificationsQuery,
  useMarkAsSeenMutation,
} from '../redux/notification/notificationApiSlice'
import { useSelector } from 'react-redux'
import {
  selectReadNotifications,
  selectUnReadNotifications,
} from '../redux/notification/notificationSlice'
import { Badge, Divider, Drawer, Modal } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import NotificationsCard from './UI/NotificationsCard'
import { useTranslation } from 'react-i18next'
import { Notification } from '../redux/notification/notificationSlice'
const Notifications = () => {
  useGetUnReadNotificationsQuery()
  useGetReadNotificationsQuery()

  const unReadNotifications = useSelector(selectUnReadNotifications)
  const readNotifications = useSelector(selectReadNotifications)
  const notificationsLength =
    unReadNotifications.length + readNotifications.length

  const [open, setOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [markAsSeen, { isLoading }] = useMarkAsSeenMutation()

  const handleClickNotification = (
    notification: Notification,
    type: 'unRead' | 'read',
  ) => {
    if (type === 'unRead') {
      markAsSeen({ notificationIds: [notification.id] })
    }
    setSelectedNotification(notification)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedNotification(null)
  }

  const { t } = useTranslation()
  return (
    <>
      <Badge count={notificationsLength} offset={[5, 5]} color="red">
        <BellOutlined className=" text-2xl" onClick={() => setOpen(true)} />
        <Drawer
          title="Notifications"
          onClose={() => setOpen(false)}
          open={open}
          styles={{ body: { padding: 0, paddingBottom: 20 } }}
          width={500}
        >
          <div className="">
            <div className=" px-6 mb-3">
              <p className="font-medium text-xs text-gray-700">{t('unread')}</p>
            </div>

            {isLoading ? (
              <div className="px-6">
                <p>Loading...</p>
              </div>
            ) : (
              unReadNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className="px-11">
                    <NotificationsCard
                      notification={notification}
                      onClick={() =>
                        handleClickNotification(notification, 'unRead')
                      }
                    />
                  </div>
                  {index !== unReadNotifications.length - 1 && (
                    <div className="px-4">
                      <Divider className="border border-gray-300 " />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <Divider
            className="border border-gray-300"
            style={{ marginBottom: 0 }}
          />

          <div className="">
            <div className=" px-6 mb-3">
              <p className="font-medium text-xs text-gray-700">{t('read')}</p>
            </div>

            {readNotifications.map((notification, index) => (
              <div key={notification.id}>
                <div className="px-11">
                  <NotificationsCard
                    notification={notification}
                    onClick={() =>
                      handleClickNotification(notification, 'read')
                    }
                  />
                </div>
                {index !== readNotifications.length - 1 && (
                  <div className="px-4">
                    <Divider className="border border-gray-300 " />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Drawer>
        <Modal
          title={selectedNotification?.notificationTemplate.title}
          open={modalVisible}
          footer={null}
          onCancel={handleModalClose}
          styles={{
            body: { padding: '5px 5px 5px 5px' },
            header: { padding: '16px 16px ' },
          }}
        >
          <div className="h-[70vh] p-4">
            <p>{selectedNotification?.notificationTemplate.body}</p>
          </div>
        </Modal>
      </Badge>
    </>
  )
}

export default Notifications
