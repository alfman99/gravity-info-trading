import { Controller, Get } from '@nestjs/common';
import { SentimentService } from '../../shared/services/sentiment.service';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Get('get-general')
  async getStreamsWhereCurrentlyTrackingUser() {
    const sentiment =
      await this.sentimentService.getGeneralSentimentOfLastNNews(
        parseInt(process.env.NEWS_TO_CONSIDER ?? '20', 10),
      );
    return sentiment;
  }
}
