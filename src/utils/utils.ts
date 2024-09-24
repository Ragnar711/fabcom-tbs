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

export function getMostRecentQt(
    ...objects: (
        | { Date: Date; Quantite: number; Type: string }
        | null
        | undefined
    )[]
): { Date: Date; Quantite: number; Type: string } | undefined {
    const mostRecentObject = objects

        .filter(
            (obj) => obj !== undefined && obj !== null && obj.Date !== undefined
        )

        .reduce((mostRecent, current) => {
            if (
                mostRecent === undefined ||
                (current !== undefined &&
                    current !== null &&
                    current.Date !== undefined &&
                    current.Date >
                        (mostRecent !== undefined &&
                            mostRecent?.Date !== undefined &&
                            mostRecent.Date))
            ) {
                return current;
            }

            return mostRecent;
        }, undefined as { Date: Date; Quantite: number; Type: string } | undefined);

    return mostRecentObject as
        | { Date: Date; Quantite: number; Type: string }
        | undefined;
}

export function getMostRecentArret(
    ...objects: (
        | { Date_Debut: Date; Date_Fin: Date | null; Cause: string | null }
        | null
        | undefined
    )[]
):
    | { Date_Debut: Date; Date_Fin: Date | null; Cause: string | null }
    | null
    | undefined {
    const mostRecentObject = objects

        .filter(
            (obj) =>
                obj !== undefined &&
                obj !== null &&
                obj.Date_Debut !== undefined
        )

        .reduce((mostRecent, current) => {
            if (
                mostRecent === undefined ||
                (current !== undefined &&
                    current !== null &&
                    current.Date_Debut !== undefined &&
                    current.Date_Debut >
                        (mostRecent !== undefined &&
                            mostRecent !== null &&
                            mostRecent.Date_Debut !== undefined &&
                            mostRecent.Date_Debut))
            ) {
                return current;
            }

            return mostRecent;
        }, undefined as { Date_Debut: Date; Date_Fin: Date | null; Cause: string | null } | null | undefined);

    return mostRecentObject;
}
