import { Class, ClassDto } from '@logic-test/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async getClass() {
    return this.classModel.aggregate([
      {
        $project: {
          name: 1,
          section: 1,
          subject: 1,
          roomNumber: 1,
          _id: 1,
        },
      },
    ]);
  }

  async getClassById(id: string) {
    const singleClass = await this.classModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $project: {
            name: 1,
            section: 1,
            subject: 1,
            roomNumber: 1,
            _id: 1,
          },
        },
      ])
      .exec();
    if (!singleClass) throw new NotFoundException('Class not found');
    return singleClass[0];
  }

  async postClass(classDto: Partial<ClassDto>) {
    const createdClass = await new this.classModel({ ...classDto }).save();
    return createdClass.save();
  }

    async deleteClass(id: string) {
    const deletedClass = await this.classModel.findByIdAndDelete(id).exec();

    if (!deletedClass) {
      throw new NotFoundException('Class not found');
    }
    return { message: 'Class Deleted', class: deletedClass };
  }

}
