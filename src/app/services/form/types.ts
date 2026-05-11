export type DefaultForm = {
    label: string;
    fieldName: string;
    placeHolder?: string;
    type: 'text' | 'select' | 'password';
    options?: { value: string | number; label: string }[];
    required: boolean;
}[]