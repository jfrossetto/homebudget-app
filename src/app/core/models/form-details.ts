export interface FormDetails<T> {
    mode: FormMode;
    entity?: T;    
}

export enum FormMode {
    add,
    update,
    view
}