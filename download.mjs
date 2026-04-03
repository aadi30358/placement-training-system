import fs from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

const url = "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.4.3&baseDir=backend&groupId=com.example&artifactId=pts-backend&name=pts-backend&description=DemoProject&packageName=com.example.pts&packaging=jar&javaVersion=21&dependencies=web,data-jpa,mysql,lombok,validation";

async function run() {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
    const dest = fs.createWriteStream('backend.zip');
    await pipeline(Readable.fromWeb(res.body), dest);
    console.log('Downloaded backend.zip');
}

run().catch(console.error);
