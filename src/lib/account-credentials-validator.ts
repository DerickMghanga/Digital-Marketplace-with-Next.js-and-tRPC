import { z } from "zod"

//schema validator from Zod
export const AuthCredentialsValidator = z.object({  // similar to JS objects
    email: z.string().email(),  // checks if its a string and also an email
    password: z.string().min(8, { message: "Password MUST be atleast 8 characters long!" })
})


//type(typescript) of validator to make Form type safe
export type TypeAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>