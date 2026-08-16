import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { PortfolioData } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data.json");

async function getData(): Promise<PortfolioData> {
  const jsonData = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(jsonData) as PortfolioData;
}

async function saveData(data: PortfolioData) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await getData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, sections } = body;
    
    // In a real app, this would be an environment variable. 
    // Setting a simple default for demonstration.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentData = await getData();
    
    // Update only the sections visibility
    if (sections) {
      currentData.sections = sections;
    }
    
    // We can extend this to update other content as well
    if (body.profile) currentData.profile = body.profile;
    if (body.about) currentData.about = body.about;
    if (body.skills) currentData.skills = body.skills;
    if (body.experience) currentData.experience = body.experience;
    if (body.projects) currentData.projects = body.projects;
    if (body.education) currentData.education = body.education;

    await saveData(currentData);
    
    return NextResponse.json({ message: "Data updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

