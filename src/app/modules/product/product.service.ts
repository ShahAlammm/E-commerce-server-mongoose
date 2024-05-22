
import { ProductModel } from '../product.model';
import { Student } from './product.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await ProductModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
