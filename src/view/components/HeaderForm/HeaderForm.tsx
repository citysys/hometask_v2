import "./HeaderForm.scss"

const HeaderForm = ({ title = "הרשמה"}) => {

    return (
                <header className='form-header'>
                    <span className='header-title'>{title}:</span>
                    <span className='header-explanation'>*שדות המסומנים בכוכבית הם שדות חובה</span>
                </header>
    )
}

export default HeaderForm
