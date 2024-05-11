export const generateUsername = (email?: string) => {
    let username;
    if (email) {
        const [_] = email.split('@');
        username = _;
    }

    username = Math.random().toString(36).substring(2, 15);
    return username;
}