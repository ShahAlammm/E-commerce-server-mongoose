import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { orderValidationSchema } from './order.validate';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const { error, value } = orderValidationSchema.validate(order);

    const result = await OrderServices.createOrderIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Get
const getAllAndSearchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await OrderServices.getAllAndSearchOrdersInDB(
      email as string,
    );

    const message = email
      ? `Orders fetched successfully for user ${email}!`
      : 'Orders fetched successfully!';

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving Orders',
      error: error,
      data: null,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllAndSearchOrder,
};
