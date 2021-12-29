import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UpdateEventDto } from 'src/update-event.dto';
import { CreateEventDto } from '../create-event.dto';

@Controller('/events')
export class EventsController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        name: 'juan',
      },
      {
        id: 2,
        name: 'pedro',
      },
    ];
  }
  @Get(':id')
  findOne(@Param('id') id) {
    return {
      id,
      name: 'juan',
    };
  }
  @Post()
  create(@Body() input: CreateEventDto) {
    return input;
  }
  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    return input;
  }
  @Delete(':id')
  @HttpCode(204)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(@Param('id') id) {
    console.log(id);
  }
}
