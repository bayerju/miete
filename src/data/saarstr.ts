export const saarstr = {
    squareMeters: {
        jezabel: 16,
        claudia: 16,
        lukas: 26,
        clinton: 5,
        gemeinsam: 17,
        gesamt: 75,
    } as const,
    costs: {
        costPerSquareMeter: 9.5,
        nebenkosten: {
            aktuell: 133 * 4,
            prognose: 150 * 4,
        } as const,
        strom: 155,
        GEZ: 18.36,
        internet: 34.99,
        Heizung: 328,
        versicherung: 3,
        zwanzig: 20, // hab vergessen wofür das war
    } as const
} as const;