import prismaApiGenerator from "../../src/lib/prismaApiGenerator";

export default async function handler(req, res) {
  return await prismaApiGenerator(req, res)
}