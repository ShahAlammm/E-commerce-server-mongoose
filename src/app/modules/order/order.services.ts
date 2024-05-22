import { OrderModel } from '../order.model';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  try {
    // const result = await OrderModel.create(orderData);
    const order = new OrderModel(orderData);
    const result = await order.save();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllAndSearchOrdersInDB = async (email: string) => {
  try {
    if (email) {
      const result = await OrderModel.find({
        email,
      });
      return result;
    } else {
      const result = await OrderModel.find();
      return result;
    }
  } catch (error) {
    throw new Error(`Unable to search Orders: ${error}`);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllAndSearchOrdersInDB,
};
