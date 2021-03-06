import 'source-map-support/register';
import { AbstractDto } from './common/dto/abstract.dto';
import { PageMetaDto } from './common/dto/page-meta.dto';
import { PageDto } from './common/dto/page.dto';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };

  interface Array<T> {
    toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];

    toPageDto<Dto extends AbstractDto>(
      this: T[],
      pageMetaDto: PageMetaDto,
      // FIXME make option type visible from entity
      options?: unknown,
    ): PageDto<Dto>;
  }
}
