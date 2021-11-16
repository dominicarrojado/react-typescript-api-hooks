export enum FetchState {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
