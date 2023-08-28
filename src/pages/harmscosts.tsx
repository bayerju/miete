import { harmsstr } from "~/data/harmsstr"

const harmsConsts = () => {
    const kaltmiete = harmsstr.costs.costPerSquareMeter * (harmsstr.squareMeters.agathe + harmsstr.squareMeters.gemeinsam / 3)
    const nebenkosten = harmsstr.costs.Heizung / harmsstr.squareMeters.gesamtohnemansade * (harmsstr.squareMeters.agathe + harmsstr.squareMeters.gemeinsam / 3)
    const strom = harmsstr.costs.strom / 3
    const sonstiges = (harmsstr.costs.internet + harmsstr.costs.GEZ) / 3
    return (
        <div>
            <h1>Harms and Costs</h1>
            kaltmiete: {kaltmiete}€
            <br />
            nebenkosten (heizung und nebenkosten): {nebenkosten}€
            <br />
            strom: {strom}€
            <br />
            sonstiges (internet, GEZ, etc.): {sonstiges}€
            <h1>gesamtkosten: {kaltmiete + nebenkosten + strom + sonstiges} </h1>

            <h2>custom calc: {184.71 + 93 + 36.66 + 17.78}</h2>


            Nordzimmer: {harmsstr.squareMeters.wohnzimmer}m²
        </div>
    )
}

export default harmsConsts
