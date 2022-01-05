import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255, { message: 'jejejeejej' })
  name: string;
  @Length(5, 255, { message: 'jejejeejej' })
  description: string;
  @IsDateString()
  when: string;
  @Length(5, 255, { groups: ['create'], message: 'jejejeejej' })
  @Length(15, 255, { groups: ['update'], message: 'jejejeejej' })
  address: string;
}
