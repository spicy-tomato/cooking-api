import { Md5 } from 'ts-md5';

export class StringHelper {
  public static getMd5(str: string): string | Int32Array {
    return new Md5().appendStr(str).end();
  }
}
