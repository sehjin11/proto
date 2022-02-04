import { MemberService } from './member.service';
import { Controller } from '@nestjs/common';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}
}
