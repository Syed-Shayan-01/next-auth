import { getByEmail, save } from "@/services/users";

export default async function handler (req, res) {
    if (req.method !== "POST") {
        return res.status(200).send();
    }
    const {email, password} = req.body;
    const alreadyExist = getByEmail(email);
    if (!alreadyExist) {
        try {
            await save(email, password);
            res.status(201).send();
        } catch (err) {
            res.status(500).json({message: err});
        }     
    } else {
        return res.status(401).json({
            message: "User already exist."
        });
    }
};