import { AddVoteDto } from '../dto/add-vote.dto';
import { CreatePollDto } from '../dto/create-poll.dto';
import { Poll } from '../entities/poll.entity';
import { InMemoryRepository } from 'src/common/repositories/in-memory.repository';

export interface PollRepository
  extends InMemoryRepository<Poll, CreatePollDto> {
  voteOne(id: number, voteDto: AddVoteDto): Promise<any>;
}
