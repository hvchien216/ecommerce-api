export class TokenPayloadDto {
  accessTokenExpiresIn: string;

  accessToken: string;

  refreshToken: string;

  constructor(data: TokenPayloadDto) {
    this.accessTokenExpiresIn = data.accessTokenExpiresIn;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
