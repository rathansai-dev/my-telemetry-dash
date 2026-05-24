const express = require('express');
const os = require('os'); 
const app = express();
const port = 3000;

// Direct Express to deliver your static frontend files from your public folder
app.use(express.static("public"));

// INTERNAL REST API: Exposes live hardware KPIs for your dashboard to fetch
app.get('/api/telemetry', (req, res) => {
    const systemMemoryTotal = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
    const systemMemoryFree = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
    const hostCpuArchitecture = os.arch();
    const systemUptimeHours = (os.uptime() / 3600).toFixed(2);

    res.json({
        osType: os.type(),
        architecture: hostCpuArchitecture,
        totalRAM: systemMemoryTotal + " GB",
        freeRAM: systemMemoryFree + " GB",
        uptime: systemUptimeHours + " Hours"
    });
});

app.listen(port, () => {
    console.log('Production server operational on port ${port}');
});