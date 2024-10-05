

export const getUrlByUserType = (restUrl) => {
    return `/${localStorage.getItem('userType')}${restUrl}`
}