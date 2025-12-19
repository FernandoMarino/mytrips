// app/api/trips/slug.ts
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w\-]/g, "") // Remove caracteres especiais
    .replace("ã", "a")
    .replace("õ", "o")
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u")
    .replace("ç", "c");
}
