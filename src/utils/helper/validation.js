function validateEmail(email) {
    // const re = /\S+@\S+\.\S+/;
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
module.exports = { validateEmail }