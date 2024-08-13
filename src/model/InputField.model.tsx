interface InputField<T> {
    groupTitle: string;
    type: string;
    groupInputs: {
        inputId: keyof T; 
        label: string;
        inputType: string;
        required: boolean;
    }[];
}
