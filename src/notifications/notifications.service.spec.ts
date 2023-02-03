import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notifications.service';

const data: Notification[]= [
  {
    emitter: 'a',
    date: 'a',
    title: 'a'
    text_field: 'a',
  	type: 'a'
  },
  {
    emitter: 'b',
    date: 'b',
    title: 'b'
    text_field: 'b',
  	type: 'b'
  },
];


const mockNotificationRepository = {
  find: jest.fn().mockResolvedValue({data})
}

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
