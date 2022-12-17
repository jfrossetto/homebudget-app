export declare class Page<T> {
    first: boolean;
    last: boolean;
    totalPages: number;
    totalItems: number;
    currentItemCount: number;
    itemsPerPage: number;
    pageIndex: number;
    items: T[];    
}
