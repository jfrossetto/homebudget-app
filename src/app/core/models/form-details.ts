export interface FormDetails<T> {
    mode: FormMode;
    entity: T;
}

export interface FormRequest<T> {
    mode: FormMode;
    id?: T;    
}

export enum FormMode {
    add,
    update,
    view
}