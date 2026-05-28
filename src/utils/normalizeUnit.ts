export function normalizeUnit(raw: string): string {
  const value = raw.trim().toLowerCase();

  const map: Record<string, string> = {
    м3: "м³",
    m3: "м³",
    "м^3": "м³",
    "m^3": "м³",
    м2: "м²",
    m2: "м²",
    "м^2": "м²",
    "m^2": "м²",
    "м.п": "м.п.",
    мп: "м.п.",
    mp: "м.п.",
    kg: "кг",
    кг: "кг",
    шт: "шт",
    pc: "шт",
    pcs: "шт",
    т: "т",
    t: "т",
  };

  return map[value] ?? raw.trim();
}
