export class NewsArticle {
  constructor(
    public readonly url: string,
    public readonly content: string,
    public readonly asset: string,
    public readonly published_at?: Date,
    public readonly sentiment?: number,
    public readonly id?: number,
  ) {}
}
