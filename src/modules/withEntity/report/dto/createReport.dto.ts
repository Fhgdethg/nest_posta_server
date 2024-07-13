import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches, IsOptional } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'The identifier of the report',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  reportID: number;

  @ApiProperty({
    description: 'The description of event in system',
    type: String,
  })
  @IsString()
  eventDescription: string;

  @ApiProperty({
    description: 'Time, when the event happened',
    type: String,
    example: '01.01.2000 00:00:00',
  })
  @IsString()
  @Matches(/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/, {
    message: 'Date must be in the format DD.MM.YYYY HH:MM:SS',
  })
  date: string;
}

export class CreateReportDtoRes extends CreateReportDto {
  @ApiProperty({
    description: 'The uuid identifier of the report',
    type: String,
  })
  @IsString()
  _id: string;

  @ApiProperty({
    description: 'The identifier of user, who initiated current event',
    type: String,
  })
  @IsString()
  userInitiatorID: string;
}
