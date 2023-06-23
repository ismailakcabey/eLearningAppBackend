

export const verifyMail = (id:string) => {
    const verifyLink = `http://[::1]:3000/users/verify/${id}`
    const VERIFY_HTML = `
    <h1>
    HESABINI BU LİNKTEN DOĞRULAYABİLİRSİNİZ: <a href="${verifyLink}" target="_blank">http://[::1]:3000/users</a>
    </h1>
    `
    return VERIFY_HTML
}