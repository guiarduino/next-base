export type DefaultFilter = {
    label: string;
    fieldName: string;  
    placeHolder?: string;
    type: 'text' | 'select';
    options?: { value: string | number; label: string }[];
}[]