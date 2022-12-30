export interface IChartAccount {
    id?: string;
    code: string;
    description: string;
    parentCode?: string;
    parent: boolean;
    level: number;
}
  