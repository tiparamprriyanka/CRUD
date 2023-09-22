import mongoose from "mongoose"

export default async function conn() {
    await mongoose.connect("mongodb+srv://priyanka:333%678@cluster0.mklmt1u.mongodb.net/?retryWrites=true&w=majority")
}