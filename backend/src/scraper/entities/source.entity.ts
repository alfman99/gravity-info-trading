export class ArticleSource {
  constructor(
    public readonly query_selector_URL: string,
    public readonly query_selector_content: string,
    public readonly url: string,
    public readonly domain: string,
    public readonly asset: string,
    public readonly id?: number,
  ) {}
}
