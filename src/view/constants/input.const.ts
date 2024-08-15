export const inputFields = [
    { inputId: 'fullName', label: 'שם מלא', inputType: 'text', initialValue: '', isRequired: true },
    { inputId: 'id', label: 'ת.ז', inputType: 'text', initialValue:'',isRequired: true  },
    { inputId: 'birthDate', label: 'תאריך לידה', inputType: 'date', initialValue:'',isRequired: true},
    { inputId: 'phoneNumber', label: 'נייד', inputType: 'text', initialValue:'' ,isRequired: true},
    { inputId: 'email', label: 'מייל', inputType: 'email', initialValue:'',isRequired: true },
    { inputId: 'city', label: 'עיר', inputType: 'select', initialValue:'' ,isRequired: true},
    { inputId: 'street', label: 'רחוב', inputType: 'select', initialValue:'',isRequired: true },
    { inputId: 'houseNumber', label: 'מספר בית', inputType: 'number', initialValue:'' ,isRequired: true},
    { inputId: 'agreeEmail', label: 'אני מסכים לקבל דיוור במייל ובמסרון', inputType: 'checkbox', initialValue: false ,isRequired: false},
    { inputId: 'agreeTerms', label: 'אני מסכים לתנאי השירות', inputType: 'checkbox', initialValue: false ,isRequired: true},
]

export const sectionTitles: (string | null)[] = ['פרטים אישיים:', 'פרטי התקשרות:', 'כתובת:', null]