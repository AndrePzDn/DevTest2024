import { CreatePollDto } from '../dto/create-poll.dto';
import { Poll } from '../entities/poll.entity';
import { AddVoteDto } from '../dto/add-vote.dto';
import { PollRepository } from './poll.interface.repository';
import { InMemoryRepository } from 'src/common/repositories/in-memory.repository';
import { NotFoundException } from '@nestjs/common';
import { Option } from 'src/options/entities/option.entity';

export class PollInMemoryRepository
  extends InMemoryRepository<Poll, CreatePollDto>
  implements PollRepository
{
  override async create(item: CreatePollDto): Promise<Poll> {
    const id = this.data.size + 1;
    const { options } = item;

    const formattedOption: Option[] = [];
    options.map((option, i) => {
      formattedOption.push({
        ...option,
        id: i + 1,
        votes: 0,
        name: option.name,
      });
    });

    const newItem: Poll = { ...item, options: formattedOption, id: id } as Poll;
    this.data.set(this.data.size, newItem);
    return newItem;
  }

  voteOne(id: number, voteDto: AddVoteDto): Promise<any> {
    const poll = this.data.get(id - 1);

    if (!poll) throw new NotFoundException('Poll does not exists');

    const options = poll.options;

    let validOption = false;

    options.map((option) => {
      if (option.id === voteDto.optionId) {
        option.votes++;
        validOption = true;
      }
    });

    if (!validOption) throw new NotFoundException('Is not a valid Option');

    return {
      id: id,
      pollId: poll.id,
      optionId: voteDto.optionId,
      voterEmail: voteDto.voterEmail,
    } as any;
  }
}
