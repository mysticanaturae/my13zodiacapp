export async function computeTransitSnapshot({ planetText, cuspText }) {
  try {
    const planetsParsed = parsePlanetsText(planetText);
    const cusps = parseCuspsText(cuspText);
    const snapshot = mapTransitSnapshot(planetsParsed, cusps);
    return { ok: true, snapshot };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
