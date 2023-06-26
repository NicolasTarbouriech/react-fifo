import { z } from "zod";

export const schema = z.object({
  email:  z.string().email("Veuillez saisir une adresse e-mail valide")
});
