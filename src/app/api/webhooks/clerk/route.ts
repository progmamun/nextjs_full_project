import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client
import type { WebhookEvent } from "@clerk/nextjs/server";

// Define a type for Clerk's public_metadata (since it’s optional and dynamic)
interface ClerkUserData {
  id: string;
  email_addresses: { email_address: string }[];
  created_at: number;
  updated_at: number;
  public_metadata?: {
    role?: string;
    [key: string]: unknown;
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new NextResponse("Error: CLERK_WEBHOOK_SECRET not set", { status: 500 });
  }

  // Extract Svix headers (headers() is already typed in Next.js)
  const headerPayload = await headers(); // No await needed, returns Headers object
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error: Missing Svix headers", { status: 400 });
  }

  // Parse and verify the webhook payload
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Error: Webhook verification failed", { status: 400 });
  }

  // Extract Clerk data with type safety
  const eventType = evt.type;
  const { id, email_addresses, created_at, updated_at, public_metadata } =
    evt.data as ClerkUserData; // Cast to our custom type
  const email = email_addresses[0]?.email_address; // Add optional chaining
  const isAdmin = public_metadata?.role === "admin"; // Safe access to role

  // Validate required fields
  if (!id || !email || !created_at || !updated_at) {
    console.error("Missing required Clerk data fields");
    return new NextResponse("Error: Invalid Clerk data", { status: 400 });
  }

  try {
    if (eventType === "user.created") {
      // Sync to User table (all users)
      await prisma.user.create({
        data: {
          id,
          email,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
        },
      });
      console.log(`User ${id} created in User table`);

      // Sync to Admin table (if admin)
      if (isAdmin) {
        await prisma.admin.create({
          data: {
            id,
            email,
            createdAt: new Date(created_at),
            updatedAt: new Date(updated_at),
          },
        });
        console.log(`User ${id} created in Admin table`);
      }
    } else if (eventType === "user.updated") {
      // Sync to User table (all users)
      await prisma.user.update({
        where: { id },
        data: {
          email,
          updatedAt: new Date(updated_at),
        },
      });
      console.log(`User ${id} updated in User table`);

      // Sync to Admin table (if admin)
      const adminExists = await prisma.admin.findUnique({ where: { id } });
      if (isAdmin) {
        if (adminExists) {
          // Update existing admin
          await prisma.admin.update({
            where: { id },
            data: {
              email,
              updatedAt: new Date(updated_at),
            },
          });
          console.log(`User ${id} updated in Admin table`);
        } else {
          // Create new admin if they weren’t an admin before
          await prisma.admin.create({
            data: {
              id,
              email,
              createdAt: new Date(created_at),
              updatedAt: new Date(updated_at),
            },
          });
          console.log(`User ${id} created in Admin table`);
        }
      } else if (adminExists) {
        // Remove from Admin table if no longer an admin
        await prisma.admin.delete({ where: { id } });
        console.log(`User ${id} removed from Admin table`);
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error("Database operation failed:", err);
    return new NextResponse("Error: Database operation failed", { status: 500 });
  }
}

// Ensure the route is dynamic (Next.js App Router requirement for POST)
export const dynamic = "force-dynamic";