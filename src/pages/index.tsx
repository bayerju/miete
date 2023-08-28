import { round } from "lodash";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Data, Table } from "~/components/table";
import { harmsstr } from "~/data/harmsstr";
import { saarstr } from "~/data/saarstr";

function roundToFullNumber(number: number) {
  return Math.round(number * 100) / 100;
}


function calcSaarPerson(roomSize: number, devider = 4, multiplier = 1) {
  const result = round(roomSize * saarstr.costs.costPerSquareMeter + saarstr.costs.nebenkosten.aktuell / devider * multiplier + saarstr.squareMeters.gemeinsam / devider * multiplier * saarstr.costs.costPerSquareMeter);
  return result
}

function calcHarmsPerson({ roomSize, devider = 3, multiplier = 1, isJulian = false }: { roomSize: number, devider?: number, multiplier?: number, isJulian?: boolean }) {
  const heizkostenAnteilig = harmsstr.costs.Heizung * (roomSize + harmsstr.squareMeters.gemeinsam / devider * multiplier) / harmsstr.squareMeters.gesamtohnemansade;
  const kaltMiete = harmsstr.costs.costPerSquareMeter * roomSize + harmsstr.squareMeters.gemeinsam / devider * multiplier * harmsstr.costs.costPerSquareMeter;
  const nebenkostenAnteilig = (harmsstr.costs.GEZ + harmsstr.costs.internet + harmsstr.costs.strom) / devider * multiplier;
  if (isJulian) {
    const kaltMiete = 383 - harmsstr.costs.costPerSquareMeter * ((harmsstr.squareMeters.agathe + harmsstr.squareMeters.wohnzimmer + harmsstr.squareMeters.julian - roomSize) + harmsstr.squareMeters.gemeinsam / devider * (3 - multiplier));
    return round(kaltMiete + heizkostenAnteilig + nebenkostenAnteilig);
  }
  return round(kaltMiete + heizkostenAnteilig + nebenkostenAnteilig);
}

function createScenario({
  deviderSaar = 4, multiplierSaar = 1, deviderHarms = 3, multiplierHarms = 1, name, beschreibung
}: { deviderSaar?: number, multiplierSaar?: number, deviderHarms?: number, multiplierHarms?: number, name: string, beschreibung: string }) {
  const scenario = {
    scenario: name,
    claudia: calcSaarPerson(saarstr.squareMeters.claudia, deviderSaar),
    melanie: calcSaarPerson(saarstr.squareMeters.melanie, deviderSaar),
    lukas: calcSaarPerson(saarstr.squareMeters.lukas, deviderSaar),
    jezabel: calcSaarPerson(saarstr.squareMeters.jezabel, deviderSaar, multiplierSaar),
    julian: calcHarmsPerson({ roomSize: harmsstr.squareMeters.julian, devider: deviderHarms, multiplier: multiplierHarms, isJulian: true }),
    wohnNeu: calcHarmsPerson({ roomSize: harmsstr.squareMeters.wohnzimmer, devider: deviderHarms }),
    agatheNeu: calcHarmsPerson({ roomSize: harmsstr.squareMeters.agathe, devider: deviderHarms }),
    beschreibung,
  }
  return { ...scenario, jeju: (scenario.julian + scenario.jezabel) / 2 };
}

/**
 * Berechnet die kosten für die Einzelnen Personen in Szenario 1:
 * In diesem Szenario nehmen wir das große Zimmer in der Harmsstraße als Arbeitszimmer und Jezabels Zimmer als Schlafzimmer.
 * Dabei gelten wir bei den Nebenkosten als eine Person in jeder Wohnung. In der Saarbrückenstraße werden die Nebenkosten durch die Personen geteilt und in der Harmsstraße kompliziert berechnet.
 */
function calcScenario1() {
  const scenario1 = createScenario({ name: "Szenario 1", beschreibung: "Nebenkosten auf 1 pro person" });
  return scenario1;
}

/**
 * wir als 2 personen in der Saarbrückenstraße und als eine in der Harmsstraße.
 * @returns 
 */
function calcScenario2() {
  const deviderSaar = 5;
  const scenario2 = createScenario({
    name: "Szenario 2",
    beschreibung: "Wir zahlen doppelt nebenkosten in der Saarbrückenstraße und in der Harmsstraße zahlen wir als eine Person.",
    deviderSaar: 5,
    multiplierSaar: 2
  });
  return scenario2;
}

function scenario3() {
  const deviderSaar = 4.5;
  const multiplierSaar = 1.5;
  const scenario3 = createScenario({
    name: "Szenario 3",
    beschreibung: "Wir zahlen 1.5 fach Nebenkosten in der Saarbrückenstraße und in der Harmsstraße zahlen wir als eine Person.",
    deviderSaar,
    multiplierSaar
  });
  return scenario3;
}

function calcScenario4() {
  const scenario4 = {
    ...createScenario({
      deviderSaar: 4.5,
      multiplierSaar: 1.5,
      name: "Szenario 4",
      beschreibung: "wie scenario3, aber wir mieten ein kleines Zimmer in der Harmsstraße."
    }),
    agatheNeu: calcHarmsPerson({ roomSize: harmsstr.squareMeters.agathe }),
    wohnNeu: calcHarmsPerson({ roomSize: harmsstr.squareMeters.julian }),
    julian: calcHarmsPerson({ roomSize: harmsstr.squareMeters.wohnzimmer, isJulian: true })
  }
  return { ...scenario4, jeju: (scenario4.julian + scenario4.jezabel) / 2 };
}

const Home: NextPage = () => {
  const [data, setData] = React.useState<Data[]>([calcScenario1(), calcScenario2(), scenario3(), calcScenario4()]);


  return (
    <>
      <Head>
        <title>Rent Table</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Table
          data={data}
        // columns={data.map((iData) => { })}
        />
      </main>
    </>
  );
};

export default Home;
