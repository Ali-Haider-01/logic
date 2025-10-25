import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
} from 'class-validator';

export class ClassDto {
  @IsString()
  @ApiProperty({
    example: 'evening',
    type: String,
  })
  name: string;

  @IsInt()
  @ApiProperty({
    example: 18,
    type: Number,
  })
  roomNumber: number;

  @IsString()
  @ApiProperty({
    example: 'amir',
    type: String,
  })
  teacherName?: string;

  @IsString()
  @ApiProperty({
    example: 'math',
    type: String,
  })
  subject: string;

  @IsString()
  @ApiProperty({
    example: 'A',
    type: String,
  })
  section: string;
}
