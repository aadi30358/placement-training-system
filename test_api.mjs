async function run() {
    try {
        const payload = {
            name: "John Doe",
            email: "johndoe1234@example.com",
            password: "password",
            role: "student",
            roll: "20CS002",
            isProfileComplete: false,
            isNewUser: true
        };
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("BODY:", text);
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}
run();
