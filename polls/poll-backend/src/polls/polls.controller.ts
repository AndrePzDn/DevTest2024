import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { AddVoteDto } from './dto/add-vote.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @Get()
  findAll() {
    return this.pollsService.findAll();
  }

  @Post(':id/votes')
  findOne(@Param('id') id: number, @Body() voteDto: AddVoteDto) {
    return this.pollsService.voteOne(id, voteDto);
  }
}
