import { harmsstr } from "~/data/harmsstr"

const harmsConsts = () => {
    return (
        <div>
            <h1>Harms and Costs</h1>
            kaltmiete: {harmsstr.costs.costPerSquareMeter * (harmsstr.squareMeters.agathe + harmsstr.squareMeters.gemeinsam / 3)}€
            <br />
            nebenkosten (strom und heizung): {harmsstr.costs.strom / 3 + harmsstr.costs.Heizung / harmsstr.squareMeters.gesamtohnemansade * (harmsstr.squareMeters.agathe + harmsstr.squareMeters.gemeinsam / 3)}€
            <br />
            sonstiges (internet, GEZ, etc.): {(harmsstr.costs.internet + harmsstr.costs.GEZ) / 3}€
        </div>
    )
}

export default harmsConsts
