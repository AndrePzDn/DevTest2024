import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollInMemoryRepository } from './repositories/poll.repository';
import { AddVoteDto } from './dto/add-vote.dto';
import { PollRepository } from './repositories/poll.interface.repository';

@Injectable()
export class PollsService {
  private pollsRepository: PollRepository;

  constructor() {
    this.pollsRepository = new PollInMemoryRepository();
  }

  create(createPollDto: CreatePollDto) {
    return this.pollsRepository.create(createPollDto);
  }

  findAll() {
    return this.pollsRepository.find();
  }

  voteOne(id: number, voteDto: AddVoteDto) {
    return this.pollsRepository.voteOne(id, voteDto);
  }
}
