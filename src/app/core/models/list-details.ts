export interface ListDetails<T> {
    dataList: T[];    
    totalItens: number;    
    lastPageIndex: number;
    lastPageSize: number;
}