import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddServiceDto {
  @IsString({
    message: 'Service name should contain textual characters only',
  })
  @IsNotEmpty({
    message: 'Service name cannot be empty',
  })
  name: string;

  @IsMongoId({
    message: 'expert should be a valid objectId',
  })
  expert: string;

  @IsArray({
    message: 'available days needs to be array of numbers',
  })
  @ArrayNotEmpty({
    message: 'available days should have atleast one day added',
  })
  availableDays: number[];
  @IsOptional()
  @IsArray({
    message: 'holidays needs to be an array of holidays',
  })
  holidays: string[];
  @IsObject()
  @IsNotEmptyObject({
    nullable: false,
  })
  schedule: { [key: string]: Array<{ startTime: string; endTime: string }> };
}
