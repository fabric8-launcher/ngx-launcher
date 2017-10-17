export declare abstract class TokenProvider {
  protected token: string;
  constructor();
  abstract getToken(): string;
}
