// Maps each of the model's 11 disease classes to the specialization
// that should review a case predicting that disease.
export const DISEASE_SPECIALIZATION: Record<string, string> = {
  "Brain Stroke": "Neurologist",
  "Heart Disease": "Cardiologist",
  "COVID-19": "Pulmonologist",
  "Pneumonia": "Pulmonologist",
  "Tuberculosis": "Pulmonologist",
  "Dengue": "General Physician",
  "Alzheimer's Disease": "Neurologist",
  "Typhoid": "General Physician",
  "Malaria": "General Physician",
  "Diabetes": "Endocrinologist",
  "No Disease": "General Physician",
};

export function specializationFor(disease: string): string {
  return DISEASE_SPECIALIZATION[disease] ?? "General Physician";
}

export function doctorSpecializations(specialization: string): string[] {
  return specialization
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(normalizeSpecialization);
}

export function doctorMatchesSpecialization(
  specialization: string,
  requestedSpecialization: string
): boolean {
  return doctorSpecializations(specialization).includes(
    normalizeSpecialization(requestedSpecialization)
  );
}

function normalizeSpecialization(specialization: string): string {
  const normalized = specialization.trim().toLowerCase();
  if (normalized === "cardiologist") return "Cardiologist";
  if (normalized === "neurologist") return "Neurologist";
  if (normalized === "pulmonologist") return "Pulmonologist";
  if (normalized === "endocrinologist") return "Endocrinologist";
  if (normalized === "general physician") return "General Physician";
  return specialization.trim();
}
