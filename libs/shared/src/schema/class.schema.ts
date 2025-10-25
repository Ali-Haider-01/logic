import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true , versionKey: false})
export class Class extends Document {
  @Prop({ required: true })
  name?: string;
  @Prop()
  teacherName?: string;
  @Prop({ required: true })
  section?: string;
  @Prop()
  subject?: string;
  @Prop({ required: true })
  roomNumber?: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
