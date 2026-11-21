import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { doctorMatchesSpecialization } from "@/lib/specialization";

// GET /api/doctors?specialization=Cardiologist
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");

  const doctors = await prisma.doctor.findMany({
    where: { available: true },
  });
  const matchingDoctors = specialization
    ? doctors.filter((doctor) =>
        doctorMatchesSpecialization(doctor.specialization, specialization)
      )
    : doctors;

  return NextResponse.json({ success: true, doctors: matchingDoctors });
}
