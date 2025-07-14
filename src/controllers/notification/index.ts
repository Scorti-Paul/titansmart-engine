import expressAsyncHandler from "express-async-handler";
import { NotificationModel } from "../../database/schema/notification";
import { handleErrors } from "../../utils/index";

const createNotification = async (req: any, res: any) => {
  const { notificationName } = req?.body;

  const notification = await NotificationModel.findOne({ notificationName });

  if (notification) {
    res?.status(400)?.json({
      message: "Notification already exists",
    });
  }

  const newNotification = new NotificationModel({
    ...req?.body,
  });

  await newNotification
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Notification created successfully",
      });
    })
    ?.catch((err) => {
      res?.status(400)?.json({
        message: `There was an error creating this notification ${err.message}`,
        error: handleErrors(err),
      });
    });
};

const updateNotification = (req: any, res: any) => {
  if (!req.body) {
    return res.status(400)?.json({
      message: "Data to update cannot be empty",
    });
  }
  const { id, ...rest } = req?.body;

  if (!id) {
    return res?.status(400)?.json({
      message: "id is required to update this data",
    });
  }

  NotificationModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Notification updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating notification",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Notification
 * @route api/notifications/:id
 * @access Private
 */
const getNotificationById = async (model: any, req: any, res: any) => {
  const { id } = req?.query;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await model?.findById(id)?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

/**
 * @description Get All Notifications
 * @route api/notifications
 * @access Private
 */
const getNotifications = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteNotification = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await NotificationModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Notification deleted" });
});

export {
  createNotification,
  updateNotification,
  getNotificationById,
  getNotifications,
  deleteNotification,
};
