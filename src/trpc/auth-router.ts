
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
    createPayloadUser: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({input}) => {  // mutation handles the logic to process the data recieved
            const {email, password} = input
            const payload = await getPayloadClient()  //from payload cms

            // check if the user exists
            const {docs: users} = await payload.find({
                collection: "users",
                where: {
                    email : {
                        equals: email
                    }
                }
            })

            if (users.length !== 0 ) throw new TRPCError({code: "CONFLICT"})

            // create a new user
            await payload.create({
                collection: "users",
                data: {

                }
            })
        })
})