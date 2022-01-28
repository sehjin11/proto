import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<object> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/login')
  signIn(@Body() authCredentialDto: AuthCredentialDto) {
    const date = new Date();
    console.log(date.toISOString());
    return {
      stauts: 'ok',
      response: {
        _token: 'asfd',
        userId: 'asdf',
        username: 'asdf',
        updateDate: date.toISOString(),
      },
    };
  }

  @Get('/is-login')
  isLogin() {}

  @Get('/member')
  member() {
    const data = {
      rows: [
        {
          _id: '61a449fe20c0f8d839067c1b',
          code: 'RN000031',
          name: '이승희',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA01567A',
          manager_name: '춘천우리내꿈터',
          status: {
            wifi: 'true',
            step: 'true',
            dose: 'true',
            date: '2022-01-13',
            regdate: '2022-01-13T13:00:01.428Z',
            _id: '61e02251b151466e5c9860d5',
          },
          take_medicine_count: 3,
          stepCount: 10608,
          memoCount: 0,
          update: true,
          date: '2022-01-13',
        },
        {
          _id: '61a449c220c0f8d83906787b',
          code: 'RN000027',
          name: '최정숙',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA03108A',
          manager_name: '춘천우리내꿈터',
          status: {
            wifi: 'true',
            step: 'true',
            dose: 'true',
            date: '2022-01-13',
            regdate: '2022-01-13T13:00:00.838Z',
            _id: '61e02250b151466e5c985f04',
          },
          take_medicine_count: 2,
          stepCount: 67,
          memoCount: 0,
          update: true,
          date: '2022-01-13',
        },
        {
          _id: '61a449f120c0f8d839067b4a',
          code: 'RN000030',
          name: '유미영',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA01871A',
          manager_name: '춘천우리내꿈터',
          status: {
            wifi: 'true',
            step: 'true',
            dose: 'true',
            date: '2022-01-13',
            regdate: '2022-01-13T13:00:01.290Z',
            _id: '61e02251b151466e5c98603d',
          },
          take_medicine_count: 2,
          stepCount: 123,
          memoCount: 0,
          update: true,
          date: '2022-01-13',
        },
        {
          _id: '61a449ad20c0f8d839067745',
          code: 'RN000026',
          name: '성준모',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA01045A',
          manager_name: '춘천우리내꿈터',
          status: {
            wifi: 'true',
            step: 'true',
            dose: 'true',
            date: '2022-01-13',
            regdate: '2022-01-13T13:00:00.651Z',
            _id: '61e02250b151466e5c985e16',
          },
          take_medicine_count: 1,
          stepCount: 26,
          memoCount: 0,
          update: true,
          date: '2022-01-13',
        },
        {
          _id: '61a449d020c0f8d839067975',
          code: 'RN000028',
          name: '안영숙',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA02705A',
          manager_name: '춘천우리내꿈터',
          status: {
            wifi: 'true',
            step: 'false',
            dose: 'true',
            date: '2022-01-13',
            regdate: '2022-01-13T13:00:00.960Z',
            _id: '61e02250b151466e5c985fa2',
          },
          take_medicine_count: 0,
          stepCount: 0,
          memoCount: 0,
          update: false,
          date: '2022-01-13',
        },
        {
          _id: '61a449e120c0f8d839067a66',
          code: 'RN000029',
          name: '김주상',
          attend: '2021-03-08',
          updateStatus: true,
          device: '21IHPA02351A',
          manager_name: '춘천우리내꿈터',
          status: 'activ',
          take_medicine_count: '-',
          stepCount: '-',
          memoCount: 0,
          update: false,
          date: '2022-01-13',
        },
      ],
      statusCode: 200,
    };

    return data;
  }
}
