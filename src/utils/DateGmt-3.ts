export const DateGmt = (date) => {
    const hours = date.getHours();
    date.setHours(hours - 3);
    return date;
}