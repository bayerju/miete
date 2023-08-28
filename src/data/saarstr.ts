export const saarstr = {
    squareMeters: {
        jezabel: 16,
        claudia: 16,
        lukas: 21,
        melanie: 5,
        gemeinsam: 4.25 * 4,
        gesamt: 75,
    } as const,
    costs: {
        costPerSquareMeter: 9.5,
        nebenkosten: {
            aktuell: 133 * 4,
            prognose: 150 * 4.5,
        } as const,
        // strom: 155,
        // GEZ: 18.36,
        // internet: 34.99,
        // Heizung: 328,
        // versicherung: 20,
        // kontoFuehrungsgebuer: 3,
    } as const
} as const;