export function secondsBetweenDates(
    dateStart: Date | string,
    dateEnd: Date | string
): number {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    return differenceInSeconds;
}
