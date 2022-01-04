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
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEventDto } from 'src/update-event.dto';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../create-event.dto';
import { Event } from '../event.entity';
@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const event = await this.repository.findOne(id);
    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.delete(event);
  }
}
