export type TableAction<T> = {
    label: string;
    action: (row: T) => void;
}

export type TableColumn = {
    key: string;
    label: string;
}