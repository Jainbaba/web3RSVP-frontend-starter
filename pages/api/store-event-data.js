import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

export default async function handler(req, res) {
  if (req.method == "POST") {
    return await storeEventDate(req, res);
  } else {
    return res
      .status(400)
      .json({ message: "Method Not Allowed", success: false });
  }
}

async function storeEventDate(req, res) {
  const body = req.body;
  try {
    const file = await makeFileObject(body);
    const cid = await storeFile(file);
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Error creating event", success: false });
  }
}
async function makeFileObject(body) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
  const files = await getFilesFromPath(imageDirectory);
  files.push(new File([buffer], "data.json"));
  return files;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

async function storeFile(file) {
  const client = makeStorageClient();
  const cid = await client.put(file);
  return cid;
}
