export class NewsArticle {
  constructor(
    public readonly url: string,
    public readonly content: string,
    public readonly asset: string,
    public readonly published_at?: Date,
    public readonly sentiment_positive?: number,
    public readonly sentiment_negative?: number,
    public readonly id?: number,
  ) {}
}
