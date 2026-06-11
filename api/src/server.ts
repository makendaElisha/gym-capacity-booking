import app from "./app";

const PORT = 5000;

app.listen({
    port: PORT,
    host: "0.0.0.0"
}, (err, address) => {
    if (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});