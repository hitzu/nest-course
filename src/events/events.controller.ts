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
import { Event } from '../event.entity';
@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === parseInt(id));
    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const eventToCreate = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(eventToCreate);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const eventIndex = this.events.findIndex(
      (event) => event.id === parseInt(id),
    );

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...input,
      when: input.when ? new Date(input.when) : this.events[eventIndex].when,
    };

    return this.events[eventIndex];
  }

  @Delete(':id')
  @HttpCode(204)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(@Param('id') id) {
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
